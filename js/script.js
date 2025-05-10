document.addEventListener("DOMContentLoaded", () => {
    const eqData = new EarthquakeData();
    const weatherData = new WeatherData(null, null); // ------------------------------------------------- //
    const openStreetMap = new OpenStreetMap();
    const map = openStreetMap.getMap();
    const mapElement = map.getTargetElement(); // Get the map container element

    const stations = [
        { url: "https://www.seismicportal.eu/fdsnws/event/1/query", name: "emsc" },
        { url: "https://earthquake.usgs.gov/fdsnws/event/1/query", name: "usgs" },
    ];

    let stationIndex = 0;
    let intervalId = null;

    // --- Function to Refetch Data and Update UI ---
    const refetchAndRefreshUI = async (source = 'manual update', isInitialLoad = false) => { 
        console.log(`Refetching data due to: ${source}${isInitialLoad ? ' (Initial Load)' : ''}`);
        logToDiv(`Updating data based on new settings...`);
        clearLogToDiv();

        openStreetMap.getMarkerSource().clear();
        openStreetMap.lastEarthquakeMarkerSource.clear();

        // ------------------------------------------------- //
        const eqdDiv = document.getElementById('earthquakeInfo');
        if (eqdDiv) eqdDiv.innerHTML = '<h3>Recent Earthquake Information</h3><p>Fetching updated data...</p>';
        const wdDiv = document.getElementById("weatherInfo");
        if (wdDiv) wdDiv.innerHTML = '<h3>Weather</h3><p>Fetching updated data...</p>';

        try {
            eqData.processedEarthquakeIds.clear();
            eqData.earthquakeData = [];
            eqData.lastFetchTimes = {};

            logToDiv("Fetching updated earthquake data from all sources...");
            
            // ------------------------------------------------- //
            if (typeof showProgressBar === 'function') {
                showProgressBar("Fetching earthquake data..."); // Show progress bar here
            }
            if (typeof updateProgress === 'function') updateProgress(30);

            for (const [index, station] of stations.entries()) {
                logToDiv(`Fetching from ${station.name.toUpperCase()}...`);
                if (typeof updateProgressMessage === 'function') {
                    updateProgressMessage(`Fetching from ${station.name.toUpperCase()}...`);
                    if (typeof updateProgress === 'function') {
                        const progressTarget = 30 + (70 * (index + 1) / stations.length);
                        updateProgress(progressTarget * 0.9);
                    }
                }

                eqData.setStation(station.url, station.name);
                await eqData.fetchData(); // Fetch data using current eqData settings (incl. bounds)
            }

            const allEarthquakes = eqData.getEarthquakes();

            // ------------------------------------------------- //
            if (typeof updateProgressMessage === 'function') {
                updateProgressMessage(`Found ${allEarthquakes.length} earthquakes. Finishing up...`);
                if (typeof updateProgress === 'function') updateProgress(95);
            }

            if (allEarthquakes && allEarthquakes.length > 0) {
                logToDiv(`Found ${allEarthquakes.length} earthquakes matching criteria.`);
                openStreetMap.populateMapMarkers(allEarthquakes);
                const newestEarthquake = allEarthquakes[0];
                earthquakesDataUI(newestEarthquake); // ------------------------------------------------- //

                const longitude = parseFloat(newestEarthquake.longitude);
                const latitude = parseFloat(newestEarthquake.latitude);
                if (!isNaN(longitude) && !isNaN(latitude)) {                  
                    weatherData.latitude = latitude;   // ------------------------------------------------- //
                    weatherData.longitude = longitude;
                    const currentWeatherData = await weatherData.getCurrentWeatherData();
                    if (currentWeatherData) {
                        weatherDataUI(currentWeatherData);
                    } else {
                        console.log("Weather data fetch failed or returned null. Skipping weather update.");
                        if (wdDiv) wdDiv.innerHTML = '<h3>Weather</h3><p>Could not retrieve weather data.</p>';
                    }

                    const coordinate = ol.proj.fromLonLat([longitude, latitude]);
                    map.getView().animate({ center: coordinate, zoom: map.getView().getZoom(), duration: 1000 });
                    logToDiv(`Refresh complete. Centered map on newest earthquake.`);
                } else {
                    logToDiv("Refresh complete, but newest earthquake has invalid coordinates for weather/centering.");
                    if (wdDiv) wdDiv.innerHTML = '<h3>Weather</h3><p>Cannot fetch weather without valid coordinates.</p>'; // ------------------------------------------------- //
                }

                populateTable(allEarthquakes);   // ------------------------------------------------- //

            } else {
                logToDiv("Refresh complete. No earthquakes found matching the specified criteria.");
                openStreetMap.getMarkerSource().clear();
                openStreetMap.lastEarthquakeMarkerSource.clear();
                const dataBody = document.getElementById('data-body'); // ------------------------------------------------- //
                if (dataBody) dataBody.innerHTML = '<tr><td colspan="8">No data found matching criteria.</td></tr>'; // ------------------------------------------------- //
                if (eqdDiv) eqdDiv.innerHTML = '<h3>Recent Earthquake Information</h3><p style="padding: 10px;">No data found.</p>'; // ------------------------------------------------- //
                if (wdDiv) wdDiv.innerHTML = '<h3>Weather</h3><p style="padding: 10px;">No earthquake data to fetch weather for.</p>'; // ------------------------------------------------- //
            }

        } catch (error) {
            console.error(`Error during data refetch (${source}):`, error);
            
            logToDiv(`An error occurred while refreshing data: ${error.message}`); // ------------------------------------------------- //
            if (typeof updateProgressMessage === 'function') {
                updateProgressMessage(`Error fetching data: ${error.message}`);
            }
        } finally {
            if (typeof updateProgress === 'function') { // ------------------------------------------------- //
                console.log("Refetch attempt finished, completing progress bar.");
                updateProgress(100, true);
            }
            
            logToDiv("Periodic checks will continue with the current settings.");
        }
    };

    // ------------------------------------------------- //
    // --- Callback Function for Sidebar Updates ---
    const handleSettingsUpdate = (newSettings) => {
        console.log("Received settings update from sidebar:", newSettings);
        let settingsChanged = false;

        if (typeof showProgressBar === 'function') {
            showProgressBar("Applying settings and fetching data...");
        }

        try {
            const currentSettings = getCurrentEqDataSettings(); // Get all current settings

            // Compare and update existing settings
            if (currentSettings.minMagnitude !== parseFloat(newSettings.minMagnitude)) {
                eqData.setMinMagnitude(parseFloat(newSettings.minMagnitude));
                settingsChanged = true;
            }
            if (currentSettings.maxMagnitude !== parseFloat(newSettings.maxMagnitude)) {
                eqData.setMaxMagnitude(parseFloat(newSettings.maxMagnitude));
                settingsChanged = true;
            }
            if (currentSettings.limit !== parseInt(newSettings.limit, 10)) {
                eqData.setLimit(parseInt(newSettings.limit, 10));
                settingsChanged = true;
            }
            if (currentSettings.startDate !== newSettings.startDate) {
                eqData.setStartDate(newSettings.startDate);
                settingsChanged = true;
            }
            if (currentSettings.endDate !== newSettings.endDate) {
                eqData.setEndDate(newSettings.endDate);
                settingsChanged = true;
            }

            // --- NEW: Compare and update Lat/Lon bounds ---
            // Compare carefully, allowing for null values
            if (currentSettings.minLatitude !== newSettings.minLatitude) {
                eqData.setMinLatitude(newSettings.minLatitude); // Setter handles parsing/null
                settingsChanged = true;
            }
            if (currentSettings.maxLatitude !== newSettings.maxLatitude) {
                eqData.setMaxLatitude(newSettings.maxLatitude);
                settingsChanged = true;
            }
            if (currentSettings.minLongitude !== newSettings.minLongitude) {
                eqData.setMinLongitude(newSettings.minLongitude);
                settingsChanged = true;
            }
            if (currentSettings.maxLongitude !== newSettings.maxLongitude) {
                eqData.setMaxLongitude(newSettings.maxLongitude);
                settingsChanged = true;
            }
            // --- END NEW ---

            if (settingsChanged) {
                logToDiv("Settings updated. Triggering data refresh...");
                refetchAndRefreshUI('sidebar settings change'); // refetch handles progress bar completion
            } else {
                logToDiv("Settings submitted, but no values were changed.");
                if (typeof updateProgress === 'function') {
                    updateProgressMessage("No settings changed.");
                    updateProgress(100, true);
                }
            }

        } catch (error) {
            console.error("Error applying settings:", error);
            logToDiv(`Error applying settings: ${error.message}`);
            alert(`Error applying settings: ${error.message}`);
            if (typeof updateProgress === 'function') {
                updateProgressMessage(`Error applying settings: ${error.message}`);
                updateProgress(100, true);
            }
        }
    };

    // --- Initial Data Fetch Function ---
    const initialFetchData = async () => {
        console.log("Starting initial data fetch...");
        try {
            // Pass true for isInitialLoad to prevent table flash
            await refetchAndRefreshUI('initial load');
            startIntervalFetching(); // Start interval AFTER initial load
        } catch (error) {
            console.error("Error during initial data fetch:", error);
            logToDiv("Error loading initial earthquake data. Please try refreshing.");
            // Progress completion handled in refetch's finally block
        }
    };

    // --- Interval Fetching (fetchDataForNextStation) ---
    const fetchDataForNextStation = async () => {
        const currentStation = stations[stationIndex];
        // console.log(`Interval fetch: Checking station ${currentStation.name}...`);
        logToDiv(`Checking for new data from ${currentStation.name}...`);

        eqData.setStation(currentStation.url, currentStation.name);

        try {
            const processedNewEarthquakes = await eqData.fetchData();
            const allEarthquakes = eqData.getEarthquakes(); // Get potentially filtered & sorted list

            openStreetMap.populateMapMarkers(allEarthquakes); // Update map

            if (allEarthquakes.length > 0) {   // ------------------------------------------------- //
                earthquakesDataUI(allEarthquakes[0]); // Update info box with newest overall
            }

            if (processedNewEarthquakes && processedNewEarthquakes.length > 0) {
                logToDiv(`New data received from ${currentStation.name}. Updating UI.`);

                // ------------------------------------------------- //
                populateTable(allEarthquakes); // Populate table with potentially filtered data
                tableRowHighlight(); // Highlight newest row

                const newestEarthquakeOverall = allEarthquakes[0];
                const longitude = parseFloat(newestEarthquakeOverall.longitude);
                const latitude = parseFloat(newestEarthquakeOverall.latitude);

                if (!isNaN(longitude) && !isNaN(latitude)) {
                    weatherData.latitude = latitude; // ------------------------------------------------- //
                    weatherData.longitude = longitude;
                    const currentWeatherData = await weatherData.getCurrentWeatherData();
                    if (currentWeatherData) {
                        weatherDataUI(currentWeatherData);
                    } else {
                        console.log("currentWeatherData is null during interval update. Skipping weather update.");
                        const wdDiv = document.getElementById("weatherInfo");
                        if (wdDiv) wdDiv.innerHTML = '<h3>Weather</h3><p>Could not retrieve weather data.</p>';
                    }

                    const coordinate = ol.proj.fromLonLat([longitude, latitude]);

                    // Map Signal Animation
                    if (openStreetMap.signalTimeoutId) clearTimeout(openStreetMap.signalTimeoutId);
                    openStreetMap.getSignalOverlay().setPosition(coordinate);
                    openStreetMap.getSignalElement().classList.add('active');
                    openStreetMap.signalTimeoutId = setTimeout(() => {
                        openStreetMap.getSignalElement().classList.remove('active');
                        openStreetMap.getSignalOverlay().setPosition(undefined);
                        openStreetMap.signalTimeoutId = null;
                    }, 15000);

                    // Center map (optional for interval)
                    map.getView().animate({ center: coordinate, duration: 1000 });
                } else {
                    logToDiv(`Newest earthquake from ${currentStation.name} has invalid coordinates. Cannot update weather or center map.`);
                }
            } else {
                // logToDiv(`No new earthquakes found from ${currentStation.name} during interval check.`);
            }
        } catch (error) {
            console.error(`Error processing interval data for ${currentStation.name}:`, error);
            logToDiv(`Error fetching update from ${currentStation.name}.`);
            // Clear signal animation on error
            if (openStreetMap.signalTimeoutId) clearTimeout(openStreetMap.signalTimeoutId);
            if (openStreetMap.getSignalElement()) openStreetMap.getSignalElement().classList.remove('active');
            if (openStreetMap.getSignalOverlay()) openStreetMap.getSignalOverlay().setPosition(undefined);
            openStreetMap.signalTimeoutId = null;
        } finally {
            stationIndex = (stationIndex + 1) % stations.length;
        }
    };

    // --- Function to Start Interval ---
    const startIntervalFetching = () => {
        if (intervalId) clearInterval(intervalId);
        console.log("Starting interval fetching...");
        logToDiv("Starting periodic checks for new earthquakes...");
        fetchDataForNextStation(); // Initial call
        intervalId = setInterval(fetchDataForNextStation, 15000); // Check every 15 seconds
    };

    // ------------------------------------------------- //
    // --- Function to get current settings from eqData ---
    const getCurrentEqDataSettings = () => {
        return {
            minMagnitude: eqData.minMagnitude,
            maxMagnitude: eqData.maxMagnitude,
            limit: eqData.limit,
            startDate: eqData.startDate,
            endDate: eqData.endDate,
            // --- NEW: Include bounds ---
            minLatitude: eqData.getMinLatitude(),
            maxLatitude: eqData.getMaxLatitude(),
            minLongitude: eqData.getMinLongitude(),
            maxLongitude: eqData.getMaxLongitude()
            // --- END NEW ---
        };
    };

    // --- NEW: Event Listener for Map Bounds Capture ---
    if (mapElement) { // ------------------------------------------------- //
        mapElement.addEventListener('bboxcaptured', async (e) => { // Make async
            console.log("Received bboxcaptured event in script.js", e.detail.bounds);
            const bounds = e.detail.bounds;

            if (bounds && typeof window.updateSidebarFromMap === 'function') {
                // 1. Update Sidebar Inputs (Visual Feedback)
                window.updateSidebarFromMap(bounds);

                // 2. Update EarthquakeData Instance (Internal State for Fetching)
                try {
                    // Use the setters for validation
                    eqData.setMinLatitude(bounds.minLat);
                    eqData.setMaxLatitude(bounds.maxLat);
                    eqData.setMinLongitude(bounds.minLon);
                    eqData.setMaxLongitude(bounds.maxLon);
                    logToDiv(`Map area filter applied via CTRL key: Lat (${bounds.minLat} to ${bounds.maxLat}), Lon (${bounds.minLon} to ${bounds.maxLon})`);

                    // 3. Trigger Data Refresh using the new bounds
                    // Show progress bar before starting the async operation
                    if (typeof showProgressBar === 'function') {
                        showProgressBar("Fetching data for selected map area...");
                    }
                    await refetchAndRefreshUI('map area change via CTRL key'); // Call the main refresh function

                } catch (error) {
                    console.error("Error applying map bounds from CTRL key:", error);
                    logToDiv(`Error applying map bounds: ${error.message}`);
                    alert(`Error applying map bounds: ${error.message}`);
                    if (typeof updateProgress === 'function') {
                        updateProgressMessage(`Error applying map bounds: ${error.message}`);
                        updateProgress(100, true); // Force hide progress bar on error
                    }
                }
            } else if (!window.updateSidebarFromMap) {
                console.error("updateSidebarFromMap function not found on window object.");
            }
        });
    } else {
        console.error("Map element not found, cannot add 'bboxcaptured' listener.");
    }

    // --- Initialization ---
    console.log("DOM loaded, initializing map and UI components...");

    // Initialize the sidebar, passing the getter and update callback
    initializeSidebar(getCurrentEqDataSettings, handleSettingsUpdate); // ------------------------------------------------- //
    initializeUI(openStreetMap); // Pass the openStreetMap instance

    // Start the initial data fetch process
    initialFetchData();

}); // End DOMContentLoaded
