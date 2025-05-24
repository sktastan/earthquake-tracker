// Keep track of the currently highlighted row and its timeout
let highlightedRowInfo = {
    rowElement: null,
    timeoutId: null
};

function logToDiv(message) {
    const logDiv = document.getElementById('log');
    if (logDiv) {
        const p = document.createElement('p');
        p.textContent = message;
        logDiv.appendChild(p);
    }
}

function clearLogToDiv() {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML = ''; // Clear previous content
}

function ConvertCelsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5 + 32).toFixed(2);
}

// ... weatherDataUI and earthquakesDataUI functions remain the same ...
function weatherDataUI(data) {
    const imgPath = `img/`; // Construct the image path
    const imgSize = 24; // Set the image size (adjust as needed)

    let wdDiv = document.getElementById("weatherInfo");
    if (!wdDiv) {
        console.error("Weather info div 'weatherInfo' not found.");
        return;
    }
    wdDiv.innerHTML = ''; // Clear previous content

    // Basic check if data structure is valid before accessing deeply nested properties
    if (!data || !data.properties || !data.properties.timeseries || data.properties.timeseries.length === 0 || !data.properties.timeseries[0].data?.instant?.details) {
        console.warn("Weather data is missing expected structure:", data);
        wdDiv.innerHTML = `<h3><img src="${imgPath}weather.svg" alt="svg-image" width="46" height="46"></img> Weather</h3><p>Weather data unavailable.</p>`;
        return;
    }

    const details = data.properties.timeseries[0].data.instant.details;
    const summary = data.properties.timeseries[0].data.next_1_hours?.summary; // Use optional chaining for summary

    // Use default values if specific details are missing
    const tempCelsius = details.air_temperature ?? 'N/A';
    const humidity = details.relative_humidity ?? 'N/A';
    const windSpeed = details.wind_speed ?? 'N/A';
    const pressure = details.air_pressure_at_sea_level ?? 'N/A';
    const cloudCover = details.cloud_area_fraction ?? 'N/A';
    const condition = summary?.symbol_code ?? 'N/A'; // Get condition if summary exists

    // Convert celsius to fahrenheit only if tempCelsius is a valid number
    let fahrenheit = 'N/A';
    if (typeof tempCelsius === 'number') {
        // Call ConvertCelsiusToFahrenheit directly.
        fahrenheit = ConvertCelsiusToFahrenheit(tempCelsius);
    }

    wdDiv.innerHTML = `
            <h3><img src="${imgPath}weather.svg" alt="svg-image" width="38" height="38"></img> Weather</h3>            
            <div class="eqdDivInfo"><p><img src="${imgPath}temperature.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Temperature: ${tempCelsius}°C / ${fahrenheit}°F</p>
            <p><img src="${imgPath}humidity.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Humidity: ${humidity}%</p>
            <p><img src="${imgPath}wind.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Wind Speed: ${windSpeed} m/s</p>
            <p><img src="${imgPath}pressure.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Air Pressure: ${pressure} hPa</p>
            <p><img src="${imgPath}cloud.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Cloud Cover: ${cloudCover}%</p>
            <p><img src="${imgPath}rain.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Condition: ${condition}</p></div>            
            `;
}

function earthquakesDataUI(eqd) {
    const imgPath = `img/`; // Construct the image path
    const imgSize = 24; // Set the image size (adjust as needed)

    let eqdDiv = document.getElementById('earthquakeInfo');
    if (!eqdDiv) {
        console.error("Earthquake info div 'earthquakeInfo' not found.");
        return;
    }
    eqdDiv.innerHTML = ''; // Clear previous content

    // Use default values ('N/A') if properties are missing
    const station = eqd?.station ?? 'N/A';
    const place = eqd?.place ?? 'N/A';
    const magnitude = eqd?.magnitude ?? 'N/A';
    const depth = eqd?.depth ?? 'N/A';
    const latitude = eqd?.latitude ?? 'N/A';
    const longitude = eqd?.longitude ?? 'N/A';
    const time = eqd?.time ?? 'N/A';


    eqdDiv.innerHTML = `
    <h3><img src="${imgPath}information.svg" alt="svg-image" width="36" height="36"></img> Recent Earthquake Information</h3>   
    <div class="eqdDivInfo"><p><img src="${imgPath}station.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Station: ${station}</p>
    <p><img src="${imgPath}location.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Place: ${place}</p>
    <p><img src="${imgPath}magnitude.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Magnitude: ${magnitude}</p>
    <p><img src="${imgPath}depth.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Depth: ${depth}</p>
    <p><img src="${imgPath}latitude.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Latitude: ${latitude}</p>
    <p><img src="${imgPath}longitude.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Longitude: ${longitude}</p>
    <p><img src="${imgPath}time.svg" alt="svg-image" width="${imgSize}" height="${imgSize}"></img> Time: ${time}</p></div>     
    `;
}

// --- Function to highlight the first row in the table ---
function tableRowHighlight() {
    console.log("tableRowHighlight called");
    const dataBody = document.getElementById('data-body');

    // --- Cleanup previous highlight ---
    // If a timeout was set for a previous row, clear it
    if (highlightedRowInfo.timeoutId) {
        clearTimeout(highlightedRowInfo.timeoutId);
        console.log("Cleared previous highlight timeout ID:", highlightedRowInfo.timeoutId);
    }
    // If a previous row element exists and still has the class, remove it immediately
    if (highlightedRowInfo.rowElement && highlightedRowInfo.rowElement.classList.contains('new-earthquake-row')) {
        console.log("Immediately removing highlight class from previous row:", highlightedRowInfo.rowElement);
        highlightedRowInfo.rowElement.classList.remove('new-earthquake-row');
    }
    // Reset the tracking object
    highlightedRowInfo.rowElement = null;
    highlightedRowInfo.timeoutId = null;
    // --- End Cleanup ---

    if (dataBody && dataBody.rows.length > 0) {
        const firstRow = dataBody.rows[0];
        console.log("Targeting first row for highlight:", firstRow);

        // Add the class to trigger the CSS animation (visual effect)
        firstRow.classList.add('new-earthquake-row');

        // Store reference to the newly highlighted row
        highlightedRowInfo.rowElement = firstRow;

        // Set a timeout to remove the class after exactly 15 seconds
        highlightedRowInfo.timeoutId = setTimeout(() => {
            // Check if the row we set the timeout for still exists and has the class
            if (firstRow && firstRow.classList.contains('new-earthquake-row')) {
                console.log("15s timeout finished, removing class 'new-earthquake-row' from:", firstRow);
                firstRow.classList.remove('new-earthquake-row');
            } else {
                console.log("15s timeout finished, but row no longer exists or class was already removed.");
            }
            // Clear the stored timeout ID now that it has executed
            if (highlightedRowInfo.rowElement === firstRow) {
                highlightedRowInfo.timeoutId = null;
                // Optionally clear rowElement too if needed, but might be useful for debugging
                // highlightedRowInfo.rowElement = null;
            }
        }, 15000); // 15000 milliseconds = 15 seconds

        console.log("Set new highlight timeout ID:", highlightedRowInfo.timeoutId, "for row:", firstRow);

    } else {
        console.log("tableRowHighlight: No rows found in data-body or data-body not found.");
    }
}

// Add isInitialLoad parameter, default to false
function populateTable(earthquakesData, isInitialLoad = false) {
    const dataBody = document.getElementById('data-body');
    const tableCountSpan = document.getElementById('table-count');

    if (!dataBody) {
        console.error("Table body with ID 'data-body' not found.");
        if (tableCountSpan) tableCountSpan.textContent = 'Error';
        return;
    }
    if (!tableCountSpan) {
        console.error("Table count span with ID 'table-count' not found.");
    }

    // --- Clear previous content ---
    // Clearing innerHTML automatically removes rows and their listeners.
    // We still need to handle our JS timeout tracking.
    if (highlightedRowInfo.timeoutId) {
        clearTimeout(highlightedRowInfo.timeoutId);
        console.log("Clearing table: Canceled pending highlight timeout ID:", highlightedRowInfo.timeoutId);
        highlightedRowInfo.timeoutId = null;
    }
    // No need to explicitly remove class here, as the row will be gone.
    highlightedRowInfo.rowElement = null; // Clear the reference
    dataBody.innerHTML = ''; // Clear previous table rows

    const count = earthquakesData ? earthquakesData.length : 0;
    if (tableCountSpan) {
        tableCountSpan.textContent = count;
    }

    // Helper function for adding cells
    const addCell = (targetRow, text, formatDecimalPlaces = null) => {
        const cell = document.createElement('td');
        let cellText = 'N/A'; // Default value

        if (text !== null && text !== undefined && String(text).trim() !== '' && text !== 'N/A') {
            if (formatDecimalPlaces !== null && typeof text === 'number' && !isNaN(text)) {
                try {
                    cellText = text.toFixed(formatDecimalPlaces);
                } catch (e) {
                    console.error(`Error formatting number: ${text}`, e);
                    cellText = 'Error';
                }
            } else {
                cellText = String(text);
            }
        }
        cell.textContent = cellText;
        targetRow.appendChild(cell);
    };

    // Helper function for getting color class
    const getColorClass = (magnitude) => {
        // Ensure magnitude is a number for comparison
        const magValue = parseFloat(magnitude);
        if (isNaN(magValue)) return ''; // No class if magnitude is not a number

        if (magValue < 3.0) {
            return 'low-magnitude';
        } else if (magValue < 5.0) { // Simplified else-if
            return 'moderate-magnitude';
        } else if (magValue < 7.0) { // Simplified else-if
            return 'high-magnitude';
        } else {
            return 'very-high-magnitude';
        }
    };

    // Handle case where there's no data
    if (count === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 8; // Correct colspan for 8 columns (#, Station, Place, Mag, Depth, Lat, Lon, Time)
        cell.textContent = 'No data found matching criteria.';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        dataBody.appendChild(row);
    } else {
        // Loop through data and populate rows
        earthquakesData.forEach((earthquake, index) => {
            const row = document.createElement('tr');
            const colorClass = getColorClass(earthquake.magnitude);

            try {
                // Add the row number cell
                addCell(row, index + 1);

                // Apply the color class to the first cell (row number cell) if a class is determined
                if (colorClass && row.childNodes[0]) {
                    row.childNodes[0].classList.add(colorClass);
                }

                // Add other cells
                addCell(row, earthquake.station);
                addCell(row, earthquake.place);
                addCell(row, earthquake.magnitude, 1);
                addCell(row, earthquake.depth, 2);
                addCell(row, earthquake.latitude, 4);
                addCell(row, earthquake.longitude, 4);
                addCell(row, earthquake.time);
                dataBody.appendChild(row);
            } catch (error) {
                console.error("Error creating table row for earthquake:", earthquake, error);
                const errorRow = document.createElement('tr');
                const errorCell = document.createElement('td');
                errorCell.colSpan = 8; // Correct colspan
                errorCell.textContent = `Error displaying row for earthquake: ${earthquake.id || 'Unknown ID'}`;
                errorCell.style.color = 'red';
                errorRow.appendChild(errorCell);
                dataBody.appendChild(errorRow);
            }
        });
    }

    // Highlight first row after populating, ONLY if data exists AND it's NOT the initial load
    if (count > 0 && !isInitialLoad) {
        // tableRowHighlight();
    }
}

// ------------------------------------------------- //
// --- Sidebar Functionality ---
function initializeSidebar(getCurrentSettingsCallback, updateSettingsCallback, osmInstance) {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openSidebarBtn");
    const closeBtn = document.getElementById("closeSidebarBtn");
    const mainContent = document.getElementById("main-content"); // Assuming this exists

    // Existing Inputs
    const minMagInput = document.getElementById("sidebarMinMag");
    const maxMagInput = document.getElementById("sidebarMaxMag");
    const limitInput = document.getElementById("sidebarLimit");
    const startDateInput = document.getElementById("sidebarStartDate");
    const endDateInput = document.getElementById("sidebarEndDate");
    const updateBtn = document.getElementById("updateSettingsBtn");

    // --- NEW Inputs and Buttons ---
    const minLatInput = document.getElementById("sidebarMinLat");
    const maxLatInput = document.getElementById("sidebarMaxLat");
    const minLonInput = document.getElementById("sidebarMinLon");
    const maxLonInput = document.getElementById("sidebarMaxLon");
    const useMapAreaBtn = document.getElementById("useMapAreaBtn");
    const clearMapAreaBtn = document.getElementById("clearMapAreaBtn");
    const getMapBoundsBtn = document.getElementById("getMapBoundsBtn"); // NEW: Button to get map bounds
    // --- END NEW ---

    // --- Check ALL required elements ---
    if (!sidebar || !openBtn || !closeBtn || !minMagInput || !maxMagInput || !limitInput ||
        !startDateInput || !endDateInput || !updateBtn || !minLatInput || !maxLatInput ||
        !minLonInput || !maxLonInput || !useMapAreaBtn || !clearMapAreaBtn || !getMapBoundsBtn) { // Added getMapBoundsBtn
        console.error("One or more sidebar elements (buttons, inputs) not found. Sidebar functionality may be incomplete.");
        // Optionally disable buttons if elements are missing
        if (updateBtn) updateBtn.disabled = true;
        if (useMapAreaBtn) useMapAreaBtn.disabled = true;
        if (clearMapAreaBtn) clearMapAreaBtn.disabled = true;
        if (getMapBoundsBtn) getMapBoundsBtn.disabled = true; // Disable if missing
        return; // Stop initialization if critical elements are missing
    }
    if (typeof getCurrentSettingsCallback !== 'function') {
        console.error("Sidebar initialization requires a function to get current settings.");
        return;
    }
    // --- END Check ---

    const sidebarWidth = "280px"; // Or your desired width

    function populateInputs() {
        const currentSettings = getCurrentSettingsCallback(); // Fetch ALL current settings

        if (currentSettings) {
            // Populate existing fields
            minMagInput.value = currentSettings.minMagnitude ?? 1;
            maxMagInput.value = currentSettings.maxMagnitude ?? 8;
            limitInput.value = currentSettings.limit ?? 0;
            startDateInput.value = currentSettings.startDate ?? '';

            let formattedEndDate = currentSettings.endDate ?? '';
            if (formattedEndDate instanceof Date) {
                formattedEndDate = formattedEndDate.toISOString().split("T")[0];
            } else if (typeof formattedEndDate === 'string' && formattedEndDate.includes('T')) {
                formattedEndDate = formattedEndDate.split("T")[0];
            }
            endDateInput.value = formattedEndDate || new Date().toISOString().split("T")[0];

            // --- Populate Lat/Lon fields ---
            // Use empty string if null/undefined for input fields
            minLatInput.value = currentSettings.minLatitude ?? '';
            maxLatInput.value = currentSettings.maxLatitude ?? '';
            minLonInput.value = currentSettings.minLongitude ?? '';
            maxLonInput.value = currentSettings.maxLongitude ?? '';
        } else {
            console.warn("Could not retrieve current settings to populate sidebar inputs.");
            // Set defaults maybe?
            minMagInput.value = 1;
            maxMagInput.value = 8;
            limitInput.value = 0;
            startDateInput.value = '';
            endDateInput.value = new Date().toISOString().split("T")[0];
            // --- Default Lat/Lon ---
            minLatInput.value = '';
            maxLatInput.value = '';
            minLonInput.value = '';
            maxLonInput.value = '';
        }
    }

    function openNav() {
        populateInputs(); // Populate ALL fields when opening
        sidebar.style.width = sidebarWidth;
        if (mainContent) mainContent.style.marginLeft = sidebarWidth;
        openBtn.style.display = 'none';
    }

    function closeNav() {
        sidebar.style.width = "0";
        if (mainContent) mainContent.style.marginLeft = "0";
        openBtn.style.display = 'block';
    }

    function handleUpdateClick() {
        // Read existing values
        const newMinMag = parseFloat(minMagInput.value);
        const newMaxMag = parseFloat(maxMagInput.value);
        const newLimit = parseInt(limitInput.value, 10);
        const newStartDate = startDateInput.value;
        const newEndDate = endDateInput.value;

        // --- Read Lat/Lon values ---
        // Read as strings, validation happens in EarthquakeData setters
        const newMinLat = minLatInput.value.trim() === '' ? null : minLatInput.value;
        const newMaxLat = maxLatInput.value.trim() === '' ? null : maxLatInput.value;
        const newMinLon = minLonInput.value.trim() === '' ? null : minLonInput.value;
        const newMaxLon = maxLonInput.value.trim() === '' ? null : maxLonInput.value;

        // --- Basic Client-Side Validation (more robust validation in setters) ---
        if (isNaN(newMinMag) || newMinMag < 0) {
            alert("Please enter a valid non-negative Minimum Magnitude."); return;
        }
        if (isNaN(newMaxMag) || newMaxMag < 0) {
            alert("Please enter a valid non-negative Maximum Magnitude."); return;
        }
        if (newMaxMag < newMinMag) {
            alert("Maximum Magnitude must be greater than or equal to Minimum Magnitude."); return;
        }
        if (isNaN(newLimit) || newLimit < 0) {
            alert("Please enter a valid non-negative Limit (0 for no limit)."); return;
        }
        if (!newStartDate) {
            alert("Please select a Start Date."); return;
        }
        if (!newEndDate) {
            alert("Please select an End Date."); return;
        }
        if (new Date(newEndDate) < new Date(newStartDate)) {
            alert("End Date cannot be earlier than Start Date."); return;
        }

        // Optional: Basic lat/lon number checks here if desired, but setters handle range
        if ((newMinLat !== null && isNaN(parseFloat(newMinLat))) ||
            (newMaxLat !== null && isNaN(parseFloat(newMaxLat))) ||
            (newMinLon !== null && isNaN(parseFloat(newMinLon))) ||
            (newMaxLon !== null && isNaN(parseFloat(newMaxLon)))) {
            alert("Latitude/Longitude values must be numbers if provided."); return;
        }
        if (newMinLat !== null && newMaxLat !== null && parseFloat(newMaxLat) < parseFloat(newMinLat)) {
            alert("Maximum Latitude cannot be less than Minimum Latitude."); return;
        }
        // --- End Validation ---

        const newSettings = {
            minMagnitude: newMinMag,
            maxMagnitude: newMaxMag,
            limit: newLimit,
            startDate: newStartDate,
            endDate: newEndDate,
            minLatitude: newMinLat,
            maxLatitude: newMaxLat,
            minLongitude: newMinLon,
            maxLongitude: newMaxLon
        };

        console.log("Updating settings:", newSettings);

        if (typeof updateSettingsCallback === 'function') {
            updateSettingsCallback(newSettings); // Pass the complete settings object
        } else {
            console.error("Update callback function is not defined!");
        }

        closeNav(); // Close sidebar after update attempt
    }

    // --- NEW: Function to update sidebar inputs from map event ---
    function updateSidebarFromMap(bounds) {
        if (!bounds) return;
        minLatInput.value = bounds.minLat ?? '';
        maxLatInput.value = bounds.maxLat ?? '';
        minLonInput.value = bounds.minLon ?? '';
        maxLonInput.value = bounds.maxLon ?? '';
        console.log("Sidebar inputs updated from map area.");
    }
    window.updateSidebarFromMap = updateSidebarFromMap;

    function handleUseMapArea() {
        // We can just trigger the main update function here.
        console.log("'Use Map Area' clicked. Applying current sidebar values.");
        handleUpdateClick(); // Apply whatever is currently in the sidebar inputs
    }

    // --- Handler for "Clear Map Area" button ---
    function handleClearMapArea() {
        minLatInput.value = '';
        maxLatInput.value = '';
        minLonInput.value = '';
        maxLonInput.value = '';
        console.log("Map area filter cleared. Click 'Update Settings' to apply.");
    }

    // Event Listeners
    openBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    updateBtn.addEventListener('click', handleUpdateClick);
    useMapAreaBtn.addEventListener('click', handleUseMapArea);
    clearMapAreaBtn.addEventListener('click', handleClearMapArea);

    // --- NEW: Event Listener for Get Current Map Area button ---
    if (getMapBoundsBtn) { // Check if the button element exists
        if (osmInstance && typeof osmInstance.getCurrentMapViewBounds === 'function') {
            getMapBoundsBtn.addEventListener('click', () => {
                const bounds = osmInstance.getCurrentMapViewBounds();
                if (bounds) {
                    minLatInput.value = bounds.minLat;
                    maxLatInput.value = bounds.maxLat;
                    minLonInput.value = bounds.minLon;
                    maxLonInput.value = bounds.maxLon;
                    console.log("Sidebar Lat/Lon inputs updated with current map view bounds.");
                } else {
                    console.warn("Could not retrieve map view bounds to populate sidebar inputs.");
                    alert("Could not retrieve current map view bounds. Try adjusting the map view.");
                }
            });
        } else {
            // If osmInstance or the method is not available, disable the button and log a warning.
            console.warn("OpenStreetMap instance or 'getCurrentMapViewBounds' method not available. 'Get Current Map Area' button will be disabled.");
            getMapBoundsBtn.disabled = true;
        }
    }
    // --- END NEW ---
} // End of initializeSidebar

// --- Progress Bar Logic ---
// Define functions outside IIFE to make them accessible later
let updateProgress; // Declare variable to hold the function
let updateProgressMessage; // Declare variable for message updates
let showProgressBar; // Declare variable for showing the bar

(function () { // Use an IIFE to avoid polluting the global scope
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container'); // This is the overlay now
    const percentageText = document.getElementById('progress-percentage');
    const messageText = document.getElementById('progress-message'); // Get message element

    // Check if elements exist
    if (!progressBar || !progressContainer || !percentageText || !messageText) {
        console.error("Progress bar elements not found!");
        return;
    }

    let progress = 0;
    let intervalId = null;
    let isComplete = false; // Flag to prevent multiple completions/hiding actions

    // Assign the function definition to the outer variable
    updateProgress = function (targetPercentage, forceComplete = false) {
        // Only proceed if not already complete OR if we are forcing completion (hiding)
        if (isComplete && !forceComplete) return;

        // Clamp target between current progress and 100
        targetPercentage = Math.max(progress, Math.min(targetPercentage, 100));

        if (intervalId) clearInterval(intervalId); // Clear existing interval if any

        intervalId = setInterval(() => {
            let shouldClearInterval = false;

            if (progress < targetPercentage) {
                // Increase progress
                let increment = (targetPercentage - progress) * 0.1;
                increment = Math.max(0.5, increment);
                progress = Math.min(progress + increment, targetPercentage);
            }

            // Check for completion condition (reaching 100%)
            if (progress >= 100) {
                progress = 100; // Ensure it hits exactly 100
                shouldClearInterval = true;
                isComplete = true; // Mark as complete when 100% is reached

            } else if (progress >= targetPercentage) {
                // Reached target but not 100, clear interval for this target
                shouldClearInterval = true;
            }

            // Update visual elements
            progressBar.style.width = progress + '%';
            percentageText.textContent = Math.round(progress) + '%';

            if (shouldClearInterval) {
                clearInterval(intervalId);
                intervalId = null; // Reset intervalId

                // --- NEW: Hide immediately after interval clears if forceComplete is true ---
                if (forceComplete && isComplete && !progressContainer.classList.contains('hidden')) {
                    console.log("Progress complete and forceComplete=true, hiding container.");
                    progressContainer.classList.add('hidden');
                }
            }

        }, 50); // Update interval (milliseconds)
    }

    // Function to update the message text
    updateProgressMessage = function (newMessage) {
        if (messageText) {
            messageText.textContent = newMessage;
        }
    }

    // --- Function to show and reset the progress bar ---
    showProgressBar = function (initialMessage = "Processing...") {
        console.log("Showing progress bar.");
        isComplete = false; // Reset completion flag
        progress = 0; // Reset progress percentage
        if (intervalId) clearInterval(intervalId); // Clear any existing animation interval
        intervalId = null;

        updateProgressMessage(initialMessage);
        progressBar.style.width = '0%'; // Reset visual bar
        percentageText.textContent = '0%'; // Reset visual percentage
        progressContainer.classList.remove('hidden'); // Make overlay visible
        // Give it a small initial boost
        updateProgress(10);
    }

    // Start initial progress on page load
    updateProgress(25);
    updateProgressMessage("Loading page elements...");

    // Update progress significantly when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        updateProgress(60);
        updateProgressMessage("Loading resources...");
    });

    // Update progress when all resources are loaded
    window.addEventListener('load', () => {
        updateProgress(95);
        updateProgressMessage("Preparing data fetch...");
    });

    // Fallback timeout
    setTimeout(() => {
        if (!isComplete) {
            console.warn("Page load/fetch timeout reached, forcing progress bar completion.");
            updateProgressMessage("Timeout reached. Finishing up...");
            updateProgress(100, true); // Force completion
        }
    }, 30000);

})(); // End of Progress Bar IIFE

// --- Bottom Navigation Bar Functionality for Mobile ---
function initializeBottomNavBar() {
    const earthquakeInfoPanel = document.getElementById('earthquakeInfo');
    const weatherInfoPanel = document.getElementById('weatherInfo');
    const tableContainerPanel = document.getElementById('tableContainer');

    const toggleEarthquakeBtn = document.getElementById('toggleEarthquakeInfo');
    const toggleWeatherBtn = document.getElementById('toggleWeatherInfo');
    const toggleTableBtn = document.getElementById('toggleTableContainer');

    const allPanels = [earthquakeInfoPanel, weatherInfoPanel, tableContainerPanel];
    const allNavButtons = [toggleEarthquakeBtn, toggleWeatherBtn, toggleTableBtn];

    if (!earthquakeInfoPanel || !weatherInfoPanel || !tableContainerPanel || !toggleEarthquakeBtn || !toggleWeatherBtn || !toggleTableBtn) {
        console.warn("One or more bottom navigation bar elements or panels not found. Mobile toggle functionality may be incomplete.");
        return;
    }

    function setActivePanel(targetPanel, targetButton) {
        // Hide all panels and remove active class from all buttons
        allPanels.forEach(panel => panel.classList.remove('visible'));
        allNavButtons.forEach(button => button.classList.remove('active'));

        // If a targetPanel is provided and it's not already visible, show it and set button to active
        if (targetPanel) {
            targetPanel.classList.add('visible');
            if (targetButton) {
                targetButton.classList.add('active');
            }
        }
        // If no targetPanel (e.g., clicking an active button again), all panels remain hidden.
    }

    toggleEarthquakeBtn.addEventListener('click', () => {
        if (earthquakeInfoPanel.classList.contains('visible')) {
            setActivePanel(null, null); // Hide if already visible
        } else {
            setActivePanel(earthquakeInfoPanel, toggleEarthquakeBtn);
        }
    });

    toggleWeatherBtn.addEventListener('click', () => {
        if (weatherInfoPanel.classList.contains('visible')) {
            setActivePanel(null, null); // Hide if already visible
        } else {
            setActivePanel(weatherInfoPanel, toggleWeatherBtn);
        }
    });

    toggleTableBtn.addEventListener('click', () => {
        if (tableContainerPanel.classList.contains('visible')) {
            setActivePanel(null, null); // Hide if already visible
        } else {
            setActivePanel(tableContainerPanel, toggleTableBtn);
        }
    });

    // Initially, no panel is active on mobile unless explicitly set
    // setActivePanel(null, null); // Or set a default one if desired: setActivePanel(earthquakeInfoPanel, toggleEarthquakeBtn);
}

// /**
//  * Loads a theme script dynamically.
//  * @param {string} themeName - The name of the theme file (without .js extension).
//  */
function loadThemeScript(themeName) {
    const themeStyleClass = 'dynamic-theme-style-sheet'; // Class to identify theme style tags

    // Remove any existing theme <style> tags
    console.log(`[loadThemeScript] Searching for style tags with class: ${themeStyleClass}`);
    const existingStyleSheets = document.querySelectorAll(`style.${themeStyleClass}`);
    console.log(`[loadThemeScript] Found ${existingStyleSheets.length} existing theme stylesheets.`);
    existingStyleSheets.forEach(sheet => {
        console.log(`[loadThemeScript] Removing existing theme stylesheet: ID='${sheet.id}', Class='${sheet.className}'`);
        sheet.remove();
    });

    // Remove the existing theme <script> tag
    const existingScript = document.getElementById('dynamic-theme-script');
    if (existingScript) {
        existingScript.remove();
        console.log(`Removed existing theme script: ${existingScript.src}`);
    } else {
    }

    // Create a new script tag
    const script = document.createElement('script');
    script.id = 'dynamic-theme-script'; // Assign the ID for future removal
    script.src = `styleJS/${themeName}.js`;
    script.defer = true; // Optional: Load script after HTML parsing

    // Append the new script tag to the head
    document.head.appendChild(script); // Appending to head is common
    console.log(`Loading new theme script: ${script.src}`);

    script.onload = () => {
        console.log(`Theme script ${themeName}.js loaded successfully.`);
    };

    script.onerror = () => {
        console.error(`Error loading theme script: ${script.src}`);
        // Handle loading errors, maybe revert to a default theme
    };
}

// /**
//  * Initializes UI elements and event listeners.
//  * Call this function when the DOM is ready.
//  */
function initializeUI(osmInstance) { // Accept the OpenStreetMap instance
    if (!osmInstance) {
        console.error("InitializeUI requires an OpenStreetMap instance.");
        return;
    }

    const themeDropdown = document.getElementById('sidebarThemeStyle');
    const mapStyleDropdown = document.getElementById('sidebarMapStyle'); // Get map style dropdown

    // Mapping from UI Theme to Map Style
    const themeToMapStyle = {
        'OSM-Default': 'Default',
        'OSM-Default-DarkMap': 'World_Dark_Gray_Base',
        'light-style-chromatic-glass': 'EsriWorldGrayCanvas',
        'light-style-sketchbook': 'EsriWorldGrayCanvas',
        'light-style-ink-wash': 'EsriWorldGrayCanvas',
        'dark-style-synthwave-sunset': 'GeoportailFrance',
        'dark-style-retro-terminal': 'World_Dark_Gray_Base',
        'dark-style-liquid-metal': 'World_Dark_Gray_Base',
        'dark-style-deep-ocean': 'GeoportailFrance',
        'dark-style-nordic-night': 'TopPlusOpenGrey',
        'dark-style-dark-blue': 'EsriWorldImagery',
        'dark-style-dark-midnight': 'TopPlusOpenGrey',
        'dark-style-solar-flare': 'World_Dark_Gray_Base', // Added Solar Flare
        'dark-style-bio-luminescent': 'World_Dark_Gray_Base', // Added Bio-Luminescent (Example map style)
        'dark-style-celestial-silk': 'TopPlusOpenGrey' // Added Celestial Silk (Example map style)        
        // Add other themes here as needed
    };

    if (themeDropdown) {
        themeDropdown.addEventListener('change', (event) => {
            const selectedTheme = event.target.value;
            if (selectedTheme) {
                // 1. Load the UI Theme Script
                loadThemeScript(selectedTheme);

                // 2. Determine and Apply Corresponding Map Style
                const correspondingMapStyle = themeToMapStyle[selectedTheme];
                if (correspondingMapStyle && typeof osmInstance.changeMapStyle === 'function') {
                    console.log(`Theme changed to ${selectedTheme}, setting map style to ${correspondingMapStyle}`);
                    osmInstance.changeMapStyle(correspondingMapStyle);
                    // 3. Update the Map Style Dropdown visually
                    if (mapStyleDropdown) {
                        mapStyleDropdown.value = correspondingMapStyle;
                    }
                } else {
                    console.warn(`No corresponding map style found for theme '${selectedTheme}' or changeMapStyle method missing.`);
                }
            }
        });
    } else {
        console.error("Theme dropdown element (#sidebarThemeStyle) not found.");
    }

    // ... (rest of your UI initializations)
}
// --- End of code to add to js/ui.js ---