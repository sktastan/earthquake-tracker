(function () { // Start of IIFE

    const themeId = 'dynamic-styles-shadow-onyx';

    // Dynamic CSS Injection for Earthquake Tracker - Shadow Onyx Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Shadow Onyx)
    const onyxDarkBg = '#0C0C0F';      // Very dark, near black
    const onyxMidBg = '#18181C';       // Dark gray
    const onyxContainerBg = 'rgba(28, 28, 32, 0.9)'; // Semi-transparent dark gray
    const onyxBorder = '#2A2A30';     // Darker border
    const onyxBorderAccent = '#3D3D44';// Slightly lighter border for accents
    const textPrimary = '#E8E8EE';   // Off-white
    const textSecondary = '#B0B0B8'; // Light gray
    const textDim = '#808088';       // Muted gray
    const accentBlue = '#00BFFF';    // Deep Sky Blue
    const accentPurple = '#9B59B6';   // Amethyst Purple
    const accentError = '#E74C3C';     // Alizarin Crimson Red (for very high mag)
    const tooltipBg = 'rgba(20, 20, 24, 0.96)'; // Dark transparent tooltip
    // Filter to make (assumed dark) icons appear as accentBlue (#00BFFF)
    const iconFilter = 'brightness(0) saturate(100%) invert(66%) sepia(78%) saturate(4471%) hue-rotate(171deg) brightness(101%) contrast(101%)';

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&display=swap"); /* Geometric Sans-Serif */

/* Body Styles */
body {
    font-family: 'Exo 2', sans-serif;
    background-color: ${onyxDarkBg};
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
    border-bottom: 1px solid ${onyxBorder};
}

th {
    background-color: ${onyxMidBg};
    color: ${accentBlue};
    font-weight: 600;
    border-bottom-width: 2px;
    border-bottom-color: ${accentBlue};
    text-shadow: 0 0 4px ${accentBlue};
}

.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${accentBlue}, ${accentPurple});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: 0 0 8px rgba(0, 191, 255, 0.3); /* accentBlue glow */
    border-bottom: 1px solid ${onyxBorderAccent};
    padding-bottom: 12px;
    letter-spacing: 1px;
}

td {
    color: ${textSecondary};
}

/* Map Container */
.map {
    width: 100%; /* Adjusted for desktop two-column layout */
    height: 100%;
    position: relative;
    background: ${onyxMidBg};
    border-right: 1px solid ${onyxBorder};
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 38%; /* Desktop width */
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${onyxDarkBg};
    border-left: 1px solid ${onyxBorder};
    border-radius: 0;
}

/* Card Component */
.card {
    background: ${onyxContainerBg};
    border: 1px solid ${onyxBorderAccent};
    border-radius: 4px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 0 5px rgba(12, 12, 15, 0.4);
    color: ${textPrimary};
}

.log,
.earthquakeInfo,
.weatherInfo {
    background-color: ${onyxDarkBg};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textDim};
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
    border-image-source: linear-gradient(to right, ${accentBlue}, ${accentPurple});
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
    background-color: ${onyxMidBg};
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 8px rgba(0, 0, 0, 0.3);
    border-right: 1px solid ${onyxBorderAccent};
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
    color: ${textDim};
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${textPrimary};
    background: linear-gradient(90deg, rgba(0, 191, 255, 0.1), rgba(155, 89, 182, 0.1));
    border-left: 4px solid ${accentBlue};
}

.sidebar .closebtn {
    color: ${textPrimary};
    background: transparent;
}

/* Sidebar Section Button Styling */
.sidebar-section button {
    background: linear-gradient(145deg, ${accentBlue}, ${accentPurple});
    color: ${textPrimary};
    border: 1px solid ${onyxBorderAccent};
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 0 7px rgba(0, 191, 255, 0.3);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${accentPurple}, ${accentBlue});
    color: ${textPrimary};
    border-color: ${accentPurple};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25), 0 0 10px rgba(155, 89, 182, 0.5);
    transform: translateY(-1px);
}

/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentBlue}, ${accentPurple});
    color: ${textPrimary};
    padding: 10px 14px;
    border: 1px solid ${onyxBorderAccent};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25), 0 0 9px rgba(0, 191, 255, 0.4);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentPurple}, ${accentBlue});
    color: ${textPrimary};
    border-color: ${accentPurple};
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 0 16px rgba(155, 89, 182, 0.6);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg};
    backdrop-filter: blur(2px);
    border-radius: 4px;
    color: ${accentBlue};
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    border: 1px solid ${accentBlue};
    font-weight: 500;
    text-shadow: 0 0 3px ${accentBlue};
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
    border-top-color: ${accentBlue};
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
    background-color: rgba(0, 191, 255, 0.8); /* accentBlue Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-onyx 1.4s infinite ease-out;
}

@keyframes pulse-signal-onyx {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 2px rgba(0, 191, 255, 0.6);
        opacity: 0.85;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 14px 20px rgba(0, 191, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 2px rgba(0, 191, 255, 0);
        opacity: 0;
    }
}

/* Earthquake Magnitude Colors */
.low-magnitude {
    background-color: rgba(155, 89, 182, 0.1); /* Subtle purple */
    border-left: 4px solid ${accentPurple};
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(0, 191, 255, 0.1); /* Subtle blue */
    border-left: 4px solid ${accentBlue};
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(231, 76, 60, 0.12); /* Subtle red */
    border-left: 4px solid ${accentError};
    color: ${textSecondary};
}

.very-high-magnitude {
    background-color: rgba(231, 76, 60, 0.2); /* Stronger red */
    border-left: 4px solid ${accentError};
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(12, 12, 15, 0.92); /* onyxDarkBg transparent */
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${onyxContainerBg};
    padding: 30px 40px;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 191, 255, 0.2);
    text-align: center;
    width: 340px;
    color: ${textPrimary};
    border: 1px solid ${onyxBorderAccent};
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentBlue};
    font-weight: 500;
    text-shadow: 0 0 4px ${accentBlue};
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${onyxMidBg};
    border-radius: 5px;
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${onyxBorder};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentBlue}, ${accentPurple});
    background-size: 200% 100%;
    border-radius: 5px;
    transition: width 0.3s ease-out;
    box-shadow: 0 0 7px ${accentPurple};
    animation: animate-gradient-onyx 4s linear infinite;
}

@keyframes animate-gradient-onyx {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${accentPurple};
    text-shadow: 0 0 5px ${accentPurple};
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
    border: 1px solid ${onyxBorderAccent};
    border-radius: 4px;
    background-color: ${onyxContainerBg};
    backdrop-filter: blur(3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    color: ${textPrimary};
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentBlue};
}

.weatherInfo {
    top: 430px;
    border-left: 4px solid ${accentPurple};
}

.log {
    position: fixed;
    left: 80px;
    width: auto;
    overflow-y: auto;
    background-color: rgba(12, 12, 15, 0.92); /* onyxDarkBg transparent */
    border: 1px solid ${onyxBorder};
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
    color: ${textDim};
    line-height: 1.5;
}

.nav-button {
    background-color: transparent;
    color: ${textPrimary};
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
    background-color: rgba(0, 191, 255, 0.15); /* accentBlue transparent */
}

.nav-button.active {
    background-color: rgba(155, 89, 182, 0.2); /* accentPurple transparent */
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-onyx 0.5s steps(1) infinite;
}

@keyframes highlight-row-onyx {
    0% {
        outline: 2px solid ${accentBlue};
        outline-offset: -2px;
        box-shadow: inset 0 0 8px rgba(0, 191, 255, 0.25);
        transform: scale(1.005);
    }
    50% {
        outline-color: ${accentPurple};
        box-shadow: inset 0 0 8px rgba(155, 89, 182, 0.25);
    }
    100% {
        outline: 2px solid transparent;
        outline-offset: 0px;
        box-shadow: none;
        transform: scale(1);
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
        background-color: ${onyxDarkBg};
        backdrop-filter: blur(5px);
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
        background-color: ${onyxContainerBg};
        backdrop-filter: blur(5px);
    }

    .tableContainer.visible h3.table-heading {
        position: sticky;
        width: auto;
        top: 0;
        z-index: 10;
        background-color: ${onyxDarkBg}; /* Match panel background for seamless scroll */
        padding-top: 15px;
        margin-left: -15px; margin-right: -15px;
        padding-left: 15px; padding-right: 15px;
        text-align: center;
    }

    .tableContainer.visible th {
        position: sticky;
        top: 58px; /* Approx height of h3.table-heading. Adjust if necessary. */
        z-index: 9;
        background-color: ${onyxMidBg}; /* Ensure sticky header has background */
    }

    .earthquakeInfo.visible h3, .weatherInfo.visible h3 {
        margin-top: 0;
    }

    .hamburger-btn {
        z-index: 1006;
    }
    .log {
        bottom: 60px; /* Above nav bar */
        top: auto;
        z-index: 1000;
        background-color: rgba(12, 12, 15, 0.92); /* onyxDarkBg transparent */
        backdrop-filter: blur(3px);
        padding: 10px;
        border-top: 1px solid ${onyxBorder};
    }
}

`;

    styleSheet.textContent = cssStyles;
    document.head.appendChild(styleSheet);
    console.log("Shadow Onyx (Dark) theme applied.");

})(); // End of IIFE