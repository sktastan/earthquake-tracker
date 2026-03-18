// ---------------------------------------------------------------------
//      Applies the "Crystal Clear" (Light) UI theme styles dynamically.
// ---------------------------------------------------------------------
(function () { // Start of IIFE

    const themeId = 'dynamic-styles-crystal-clear';

    // Dynamic CSS Injection for Earthquake Tracker - Crystal Clear Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Crystal Clear)
    const clearBg = '#FDFEFF'; // Very light, almost white
    const containerBg = 'rgba(240, 245, 255, 0.8)'; // Semi-transparent light blueish white
    const borderSubtle = '#E8EEF9';    // Very light cool gray
    const borderAccent = 'rgba(120, 130, 150, 0.2)'; // Subtle cool dark border
    const textPrimary = '#2A3B59';   // Dark grayish blue
    const textSecondary = '#5B6A89'; // Medium grayish blue
    const textDim = '#7E8CAC';       // Lighter grayish blue
    const accentBlue = '#89CFF0';      // Baby Blue
    const accentGreen = '#90EE90';     // Light Green
    const accentLavender = '#E6E6FA';    // Lavender (for subtle highlights)
    const tooltipBg = 'rgba(248, 250, 255, 0.9)'; // Semi-transparent very light tooltip
    // Filter to make (assumed dark) icons appear as accentBlue (#89CFF0)
    const iconFilter = 'brightness(0) saturate(100%) invert(82%) sepia(16%) saturate(1480%) hue-rotate(162deg) brightness(98%) contrast(90%)';

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"); /* Clean Sans-Serif */

/* Body Styles */
body {
    font-family: 'Inter', sans-serif;
    background-color: ${clearBg};
    font-size: 12px;
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary};
    font-weight: 400;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 4px 15px;
    text-align: left;
    border-bottom: 1px solid ${borderSubtle};
}

th {
    background-color: rgba(255, 255, 255, 0.5);
    color: ${accentBlue};
    font-weight: 600;
    border-bottom-width: 2px;
    border-bottom-color: ${accentBlue};
    text-shadow: 0 0 2px rgba(137, 207, 240, 0.3);
}

.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${accentBlue}, ${accentGreen}, ${accentLavender});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid ${borderSubtle};
    padding-bottom: 12px;
    letter-spacing: 0.5px;
}

td {
    color: ${textSecondary};
}

/* Map Container */
.map {
    width: 100%; /* Adjusted for desktop two-column layout */
    height: 100%;
    position: relative;
    background: ${clearBg};
    border-right: 1px solid ${borderSubtle};
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 38%; /* Desktop width */
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${clearBg};
    border-left: 1px solid ${borderSubtle};
    border-radius: 0;
}

/* Card Component */
.card {
    background: ${containerBg};
    backdrop-filter: blur(4px);
    border: 1px solid ${borderAccent};
    border-radius: 6px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    color: ${textPrimary};
}

.log,
.earthquakeInfo,
.weatherInfo {
    background-color: ${clearBg};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textSecondary};
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter};
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${accentBlue}, ${accentGreen});
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textPrimary};
    background: transparent;
}

.tableContainer h3.table-heading img,
.tableContainer thead img,
#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter};
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg};
    backdrop-filter: blur(6px);
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
    border-right: 1px solid ${borderAccent};
    border-radius: 0;
}

.sidebar-heading {
    font-size: 20px;
    color: ${textPrimary};
    border-radius: 4px;
    background-color: transparent;
    margin-top: 40px;
    padding: 0 24px; /* Add some horizontal padding */
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textSecondary};
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${textPrimary};
    background: linear-gradient(90deg, rgba(137, 207, 240, 0.2), rgba(144, 238, 144, 0.2));
    border-left: 4px solid ${accentBlue};
}

.sidebar .closebtn {
    color: ${textPrimary};
    background: transparent;
}

/* Sidebar Section Button Styling */
.sidebar-section button {
    background: linear-gradient(145deg, ${accentBlue}, ${accentGreen});
    color: ${textPrimary};
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 0 6px rgba(137, 207, 240, 0.2);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.7);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${accentGreen}, ${accentLavender});
    color: ${textPrimary};
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 0 10px rgba(144, 238, 144, 0.4);
    transform: translateY(-1px);
}

/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentBlue}, ${accentGreen});
    color: ${textPrimary};
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1), 0 0 8px rgba(137, 207, 240, 0.3);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.7);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentGreen}, ${accentLavender});
    color: ${textPrimary};
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 0 15px rgba(144, 238, 144, 0.5);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg};
    backdrop-filter: blur(3px);
    border-radius: 4px;
    color: ${textPrimary};
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid ${borderAccent};
    font-weight: 500;
}

.ol-tooltip::after {
    content: "";
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: transparent;
    border-top-color: ${borderAccent};
}

.ol-tooltip::before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 7px 0 7px;
    border-color: ${tooltipBg} transparent transparent transparent;
    z-index: 1;
}

/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: rgba(137, 207, 240, 0.7); /* accentBlue Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(137, 207, 240, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-crystal 1.4s infinite ease-out;
}

@keyframes pulse-signal-crystal {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(137, 207, 240, 0.6);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 12px 20px rgba(137, 207, 240, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(137, 207, 240, 0);
        opacity: 0;
    }
}

/* Earthquake Magnitude Colors */
.low-magnitude {
    background-color: rgba(144, 238, 144, 0.15); /* Pale Green bg */
    border-left: 4px solid ${accentGreen};
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(137, 207, 240, 0.15); /* Baby Blue bg */
    border-left: 4px solid ${accentBlue};
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(230, 230, 250, 0.2); /* Lavender bg */
    border-left: 4px solid ${accentLavender};
    color: ${textSecondary};
}

.very-high-magnitude {
    background-color: rgba(255, 182, 193, 0.2); /* Light Pink bg for contrast */
    border-left: 4px solid #FFB6C1; /* Light Pink */
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(240, 245, 255, 0.9); /* containerBg transparent */
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${containerBg};
    backdrop-filter: blur(6px);
    padding: 30px 40px;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08), 0 0 15px rgba(137, 207, 240, 0.15);
    text-align: center;
    width: 340px;
    color: ${textPrimary};
    border: 1px solid ${borderAccent};
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentBlue};
    font-weight: 500;
    text-shadow: 0 0 3px rgba(137, 207, 240, 0.4);
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${borderSubtle};
    border-radius: 5px;
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderAccent};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentBlue}, ${accentGreen});
    background-size: 200% 100%;
    border-radius: 5px;
    transition: width 0.3s ease-out;
    box-shadow: 0 0 6px ${accentGreen};
    animation: animate-gradient-crystal 4s linear infinite;
}

@keyframes animate-gradient-crystal {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${accentGreen};
    text-shadow: 0 0 4px ${accentGreen};
}

/* Fixed Info Divs Positioning & Styling */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 0px;
    z-index: 10;
    border: 1px solid ${borderAccent};
    border-radius: 6px;
    background-color: ${containerBg};
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    color: ${textPrimary};
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentBlue};
}

.weatherInfo {
    top: 430px;
    border-left: 4px solid ${accentGreen};
}

.log {
    position: fixed;
    left: 80px;
    width: auto;
    overflow-y: auto;
    background-color: rgba(248, 250, 255, 0.9); /* tooltipBg slightly more opaque */
    backdrop-filter: blur(3px);
    border: 1px solid ${borderSubtle};
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    color: ${textDim};
    line-height: 1.5;
}

.nav-button {
    background-color: transparent;
    color: ${containerBg};
    border: none;
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 42px;
    white-space: nowrap;
}

.nav-button img {
    filter: ${iconFilter};
    flex-shrink: 0;
}

.nav-button span {
    font-size: 12px;
    line-height: 1;
}

.nav-button:hover {
    background-color: #00BFFF /* accentBlue transparent */
}

.nav-button.active {
    background-color: rgba(144, 238, 144, 0.3); /* accentGreen transparent */
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-crystal 0.5s steps(1) infinite;
}

@keyframes highlight-row-crystal {
    0% {
        background: linear-gradient(90deg, rgba(137, 207, 240, 0.2), rgba(144, 238, 144, 0.2));
        background-size: 200% 100%;
        background-position: 100% 0;
        transform: scale(1.005);
        box-shadow: inset 0 0 6px rgba(137, 207, 240, 0.15);
    }
    50% {
        background-position: 0 0;
        transform: scale(1.005);
        box-shadow: inset 0 0 6px rgba(144, 238, 144, 0.2);
    }
    100% {
        background: transparent;
        background-position: -100% 0;
        transform: scale(1);
        box-shadow: none;
    }
}

/* --- Media Query for Mobile (max-width: 719px) --- */
@media (max-width: 719px) {
    body {
        flex-direction: column;
        overflow: auto;
        height: auto;
        padding-bottom: 60px; /* Space for bottom nav bar */
    }

    .map {
        width: 100%;
        height: 100vh; /* Base layer, will be covered by fixed panels */
        position: relative;
        z-index: 1;
        border-right: none;
    }

    .earthquakeInfo, .weatherInfo, .log {
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        max-width: none;
        border-radius: 0;
        box-sizing: border-box;
        margin: 0;
        border-left: none;
        border-right: none;
    }
    .tableContainer {
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        overflow-y: auto;
        z-index: 990;
        background-color: ${clearBg};
        backdrop-filter: blur(6px);
        border-radius: 0;
        padding: 0 15px 15px 15px;
        box-sizing: border-box;
        border-left: none;
    }

    .tableContainer.visible, .earthquakeInfo.visible, .weatherInfo.visible {
        top: 0;
        bottom: 60px; /* Space for bottom nav bar */
        height: auto;
        max-height: calc(100vh - 60px);
        z-index: 990;
        padding: 15px;
    }
    .earthquakeInfo.visible, .weatherInfo.visible {
        background-color: ${containerBg};
        backdrop-filter: blur(6px);
    }

    .tableContainer.visible h3.table-heading {
        position: sticky;
        width: auto;
        top: 0;
        z-index: 10;
        background-color: ${clearBg};
        padding-top: 15px;
        margin-left: -15px; margin-right: -15px;
        padding-left: 15px; padding-right: 15px;
        text-align: center;
    }

    .tableContainer.visible th {
        position: sticky;
        top: 58px; /* Approx height of h3.table-heading. Adjust if necessary. */
        z-index: 9;
        background-color: rgba(250, 252, 255, 0.85); /* Slightly opaque for sticky header */
    }

    .earthquakeInfo.visible h3, .weatherInfo.visible h3 {
        margin-top: 0;
    }

    .hamburger-btn {
        left: 15px; /* Adjusted from 35px to match other themes */
        z-index: 1006;
    }
    .log {
        bottom: 60px; /* Above nav bar */
        top: auto;
        z-index: 1000;
        background-color: rgba(248, 250, 255, 0.9);
        backdrop-filter: blur(3px);
        padding: 10px;
        border-top: 1px solid ${borderSubtle};
    }
}

`;

    styleSheet.textContent = cssStyles;
    document.head.appendChild(styleSheet);
    console.log("Crystal Clear (Light) theme applied.");

})(); // End of IIFE