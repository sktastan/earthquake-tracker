class EarthquakeData {
    constructor() {
        this.baseUrl = "https://www.seismicportal.eu/fdsnws/event/1/query";
        this.format = "json";
        this.minMagnitude = 2;
        this.maxMagnitude = 8;
        this.limit = 0;
        this.stationName = "usgs"; // Default station, will be set later if needed
        this.processedEarthquakeIds = new Set();
        this.lastFetchTimes = {};
        this.earthquakeData = []; // Array to store all processed earthquake data

        // --- Bounding Box ---
        this.minLatitude = null;
        this.maxLatitude = null;
        this.minLongitude = null;
        this.maxLongitude = null;
        // --- End Bounding Box ---

        // 1. Set the end date (today's date in YYYY-MM-DD format, representing UTC midnight)
        const todayString = new Date().toISOString().split("T")[0];
        this.endDate = todayString;

        // 2. Create a Date object from the endDate string
        const endDateObject = new Date(this.endDate);

        // 3. Create a new Date object for the start date based on the end date
        const startDateObject = new Date(endDateObject);

        // 4. Subtract 2 days using UTC date functions to avoid timezone issues
        startDateObject.setUTCDate(endDateObject.getUTCDate() - 2);

        // 5. Format the start date back into "YYYY-MM-DD" string format
        this.startDate = startDateObject.toISOString().split("T")[0];

        // Determine initial format based on default stationName
        this.format = this.stationName === "emsc" ? "json" : "geojson";
    }

    // --- Existing Setters ---
    setStartDate(startDate) {
        this.startDate = startDate;
    }

    setEndDate(endDate) {
        this.endDate = endDate;
    }

    setMaxMagnitude(maxMagnitude) {
        if (maxMagnitude < this.minMagnitude) {
            throw new Error("Maximum magnitude must be greater than or equal to minimum magnitude.");
        }
        this.maxMagnitude = maxMagnitude;
    }

    setMinMagnitude(minMagnitude) {
        if (minMagnitude < 0) {
            throw new Error("Minimum magnitude must be a non-negative number.");
        }
        this.minMagnitude = minMagnitude;
    }

    setLimit(limit) {
        if (limit < 0) {
            throw new Error("Limit must be a positive number.");
        }
        this.limit = limit;
    }

    setStation(stationUrl, stationName) {
        if (!stationUrl) {
            throw new Error("Station URL must be provided.");
        }
        if (stationName !== "usgs" && stationName !== "emsc") {
            throw new Error("Invalid station name. Use 'usgs' or 'emsc'.");
        }
        this.baseUrl = stationUrl;
        this.stationName = stationName;
        this.format = stationName === "emsc" ? "json" : "geojson";
    }

    // --- NEW Bounding Box Setters ---
    setMinLatitude(lat) {
        const numLat = parseFloat(lat);
        if (lat !== null && (isNaN(numLat) || numLat < -90 || numLat > 90)) {
            throw new Error("Invalid Minimum Latitude. Must be between -90 and 90.");
        }
        this.minLatitude = (lat === null || lat === '') ? null : numLat;
    }

    setMaxLatitude(lat) {
        const numLat = parseFloat(lat);
        if (lat !== null && (isNaN(numLat) || numLat < -90 || numLat > 90)) {
            throw new Error("Invalid Maximum Latitude. Must be between -90 and 90.");
        }
        if (lat !== null && this.minLatitude !== null && numLat < this.minLatitude) {
            throw new Error("Maximum Latitude cannot be less than Minimum Latitude.");
        }
        this.maxLatitude = (lat === null || lat === '') ? null : numLat;
    }

    setMinLongitude(lon) {
        const numLon = parseFloat(lon);
        if (lon !== null && (isNaN(numLon) || numLon < -180 || numLon > 180)) {
            throw new Error("Invalid Minimum Longitude. Must be between -180 and 180.");
        }
        this.minLongitude = (lon === null || lon === '') ? null : numLon;
    }

    setMaxLongitude(lon) {
        const numLon = parseFloat(lon);
        if (lon !== null && (isNaN(numLon) || numLon < -180 || numLon > 180)) {
            throw new Error("Invalid Maximum Longitude. Must be between -180 and 180.");
        }
        // Note: Max Longitude can be less than Min Longitude if crossing the date line
        this.maxLongitude = (lon === null || lon === '') ? null : numLon;
    }
    // --- End Bounding Box Setters ---

    // --- Bounding Box Getters ---
    getMinLatitude() { return this.minLatitude; }
    getMaxLatitude() { return this.maxLatitude; }
    getMinLongitude() { return this.minLongitude; }
    getMaxLongitude() { return this.maxLongitude; }
    // --- End Bounding Box Getters ---    

    async fetchData() {
        const formattedStartDate = `${this.startDate}T00:00:00Z`;
        const formattedEndDate = `${this.endDate}T23:59:59Z`;

        // --- Build Base URL ---
        let urlParams = new URLSearchParams({
            format: this.format,
            starttime: formattedStartDate,
            endtime: formattedEndDate,
            minmag: this.minMagnitude,
            maxmag: this.maxMagnitude
        });

        if (this.limit > 0) {
            urlParams.set('limit', this.limit);
        }

        // --- Add Bounding Box Parameters if they exist ---
        if (this.minLatitude !== null) urlParams.set('minlatitude', this.minLatitude);
        if (this.maxLatitude !== null) urlParams.set('maxlatitude', this.maxLatitude);
        if (this.minLongitude !== null) urlParams.set('minlongitude', this.minLongitude);
        if (this.maxLongitude !== null) urlParams.set('maxlongitude', this.maxLongitude);
        // --- End Bounding Box ---

        const apiUrl = `${this.baseUrl}?${urlParams.toString()}`;

        // Consider moving clearLogToDiv outside the loop in script.js if you only want one clear per refresh cycle
        // clearLogToDiv();
        logToDiv(`Fetching from URL: ${apiUrl}`);

        try {
            const response = await fetch(apiUrl);

            // --- MODIFICATION START ---

            // 1. Check specifically for 204 No Content
            if (response.status === 204) {
                console.log(`${this.stationName.toUpperCase()} returned 204 No Content.`);
                logToDiv(`${this.stationName.toUpperCase()} found no events matching criteria.`);
                // Return an empty structure that processData can handle
                return this.processData({ features: [] });
            }

            // 2. Handle non-OK responses (like 4xx, 5xx errors)
            if (!response.ok) {
                const errorText = await response.text(); // Try to get error details from body
                console.error(`API error! status: ${response.status}, URL: ${apiUrl}, Response: ${errorText}`);
                throw new Error(`API error! status: ${response.status}, URL: ${apiUrl}, Response: ${errorText}`);
            }

            // 3. If response.ok is true (and status is not 204), get body as text first for debugging
            const responseText = await response.text();
            // console.log(`${this.stationName.toUpperCase()} Raw Response Text:`, responseText); // Optional: Keep for debugging

            // 4. Try parsing the text as JSON
            try {
                // If responseText is empty, JSON.parse will throw an error
                if (!responseText) {
                    console.warn(`${this.stationName.toUpperCase()} returned an empty response body with status ${response.status}.`);
                    logToDiv(`${this.stationName.toUpperCase()} returned an empty response.`);
                    return this.processData({ features: [] }); // Treat as no data
                }
                const data = JSON.parse(responseText);
                // console.log(`${this.stationName.toUpperCase()} Parsed Data:`, data); // Log successful parse
                const processedNewEarthquakes = this.processData(data);
                return processedNewEarthquakes;
            } catch (parseError) {
                // Catch errors specifically from JSON.parse()
                console.error(`Error parsing JSON response from ${this.stationName}:`, parseError);
                console.error(`Response text that failed to parse:`, responseText); // Log the problematic text
                throw new Error(`Failed to parse JSON response from ${this.stationName}. Status: ${response.status}. Content: ${responseText.substring(0, 100)}...`); // Include status and snippet
            }
        } catch (error) {
            // Catch fetch errors (network issues) or errors thrown from the blocks above
            console.error(`Error fetching or processing ${this.stationName} earthquake data:`, error);
            // Log the specific API URL that failed
            logToDiv(`Error fetching data from ${this.stationName}. Error: ${error.message}`);
            throw error; // Re-throw so the error propagates to refetchAndRefreshUI
        }
    }

    // processData remains the same...
    processData(data) {
        // Use optional chaining for safer access
        const features = data?.features;
        const processedNewEarthquakes = []; // Array to store newly processed structured earthquakes

        if (features && features.length > 0) {
            let latestEarthquakeTime = this.lastFetchTimes[this.stationName] || 0; // Initialize if undefined

            features.forEach((earthquake) => {
                // Use optional chaining and nullish coalescing for safer property access
                const earthquakeId = earthquake?.id;
                const properties = earthquake?.properties;
                const geometry = earthquake?.geometry;
                const earthquakeTime = properties?.time; // The raw timestamp

                // Basic validation
                if (!earthquakeId || !properties || !geometry || earthquakeTime === undefined || earthquakeTime === null) {
                    console.warn("Skipping feature due to missing essential data (id, properties, geometry, or time):", earthquake);
                    return; // Skip this feature
                }

                // Check if we've already processed this ID
                if (!this.processedEarthquakeIds.has(earthquakeId)) {
                    // --- Create the structured object ---
                    const station = this.stationName.toUpperCase();
                    const place = this.stationName === "emsc" ? properties.flynn_region : properties.place;
                    const magnitude = properties.mag;
                    const depth = this.stationName === "emsc"
                        ? properties.depth // EMSC provides depth directly in properties
                        : (geometry.coordinates?.length > 2 ? geometry.coordinates[2] : 'N/A'); // USGS GeoJSON has depth as 3rd coordinate

                    const longitude = geometry.coordinates?.[0];
                    const latitude = geometry.coordinates?.[1];
                    const time = new Date(earthquakeTime).toLocaleString(); // User-friendly time
                    const rawTime = earthquakeTime; // Timestamp for sorting

                    // More validation before adding
                    if (longitude === undefined || latitude === undefined) {
                        console.warn("Skipping feature due to missing coordinates:", earthquake);
                        return; // Skip if coordinates are missing
                    }
                    // Ensure magnitude and depth are numbers or 'N/A'
                    const validatedMagnitude = (typeof magnitude === 'number' && !isNaN(magnitude)) ? magnitude : 'N/A';
                    const validatedDepth = (typeof depth === 'number' && !isNaN(depth)) ? depth : 'N/A';


                    const processedEarthquake = {
                        station,
                        place: place || 'N/A', // Handle potentially null/empty place
                        magnitude: validatedMagnitude,
                        longitude,
                        latitude,
                        depth: validatedDepth,
                        time,
                        rawTime // Keep the original timestamp for sorting
                    };

                    // --- Add structured object to the main array AND the new array ---
                    this.earthquakeData.push(processedEarthquake);
                    processedNewEarthquakes.push(processedEarthquake); // Add to the list of *new* ones

                    this.processedEarthquakeIds.add(earthquakeId);
                }

                // Update the latest time encountered in this batch
                // Ensure earthquakeTime is valid before comparing
                if (typeof earthquakeTime === 'number' && earthquakeTime > latestEarthquakeTime) {
                    latestEarthquakeTime = earthquakeTime;
                }
            });

            if (processedNewEarthquakes.length > 0) {
                clearLogToDiv();
                logToDiv(`Number of new earthquakes processed from ${this.stationName}: ${processedNewEarthquakes.length}`);

                // // Sort the earthquakeData array by time (newest first)
                this.earthquakeData.sort((a, b) => {
                    return new Date(b.rawTime) - new Date(a.rawTime);
                });

                // Update the last fetch time for this station only if we found a valid latest time
                if (latestEarthquakeTime > (this.lastFetchTimes[this.stationName] || 0)) {
                    this.lastFetchTimes[this.stationName] = latestEarthquakeTime;
                    console.log(`Updated lastFetchTime for ${this.stationName} to: ${new Date(latestEarthquakeTime).toISOString()}`);
                }

            } else {
                // console.log(`No new earthquake data found from ${this.stationName}.`);
                clearLogToDiv();
                logToDiv(`No new earthquake data found from ${this.stationName}.`);
            }

        } else {
            console.log(`No earthquake features found in data from ${this.stationName}.`);
            clearLogToDiv();
            logToDiv(`No new earthquake data found from ${this.stationName}.`);
        }

        // Return the array of newly processed earthquakes (will be empty if none were new)
        return processedNewEarthquakes;
    }

    getEarthquakes() {
        return this.earthquakeData;
    }
}