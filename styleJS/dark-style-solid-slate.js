(function () { // Start of IIFE

    const themeId = 'dynamic-styles-solid-slate';

    // Dynamic CSS Injection for Earthquake Tracker - Solid Slate Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Solid Slate)
    const slateDarkest = '#1A1D21'; // Very Dark Gray, almost black
    const slateDark = '#2C303A';    // Dark Slate Gray
    const panelDarkBg = 'rgba(35, 40, 50, 0.9)'; // Semi-transparent dark slate
    const borderDark = '#3E4451';     // Charcoal
    const borderMediumDark = '#525966';// Gunmetal
    const textLightPrimary = '#E1E8ED';   // Light Grayish Blue
    const textLightSecondary = '#BCCCDC'; // Pale Blue
    const textMutedDark = '#8290A0';       // Cadet Grey
    const accentPrimaryDark = '#4A90E2';    // Steel Blue - a bit brighter for accent
    const accentSecondaryDark = '#7CB5F9';   // Picton Blue - lighter for hover
    const tooltipSolidDarkBg = 'rgba(30, 33, 40, 0.96)';
    // Filter to make (assumed dark) icons appear as accentPrimaryDark (#4A90E2)
    const iconFilterSolidDark = 'brightness(0) saturate(100%) invert(55%) sepia(87%) saturate(1020%) hue-rotate(181deg) brightness(96%) contrast(90%)';

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
    background-color: ${slateDarkest};
    font-size: 12px;
    display: flex; /* For desktop: row layout */
    flex-direction: row;
    height: 100vh; /* Full viewport height for desktop */
    overflow: hidden; /* Prevent scrolling on body for desktop */
    color: ${textLightPrimary};
    font-weight: 400;
    line-height: 1.6;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 4px 15px;
    text-align: left;
    border-bottom: 1px solid ${borderDark};
}

th {
    background-color: ${slateDark};
    color: ${accentPrimaryDark};
    font-weight: 600;
    border-bottom-width: 2px;
    border-bottom-color: ${accentPrimaryDark};
}

.tableContainer h3.table-heading {
    color: ${slateDarkest};
    background-color: ${accentPrimaryDark};
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: none;
    border-bottom: 1px solid ${borderMediumDark};
    padding-bottom: 12px;
    letter-spacing: 1px;
}

td {
    color: ${textLightSecondary};
}

/* Map Container */
.map {
    width: 100%; /* Desktop width */
    height: 100%; /* Full height for desktop */
    position: relative;
    background: ${slateDark};
    border-radius: 0;
    z-index: 1; /* Behind overlay panels */
    border-right: none; /* Removed separator */
}

/* Right Content Panel (was .tableContainer for full-width map) */
.tableContainer { /* This will act as the right content panel on desktop */
    position: fixed; /* Fixed positioning for desktop */
    right: 0; /* Align to the right side */
    top: 0; /* Align to the top */
    width: 38%; /* Desktop width */
    height: 100%; /* Full height for desktop */
    overflow-y: auto; /* Scroll content within this panel */
    padding: 15px;
    background-color: ${panelDarkBg}; /* Use semi-transparent panel background */
    backdrop-filter: blur(5px); /* Add blur effect for dark themes */
    border-left: 1px solid ${borderDark}; /* Add left border */
    display: none; /* Hidden by default on desktop */
    z-index: 995; /* Above map, below sidebar */
}

.tableContainer.visible {
    display: block; /* Show when .visible class is added */
}

/* Card Component */
.card {
    background: ${panelDarkBg};
    backdrop-filter: blur(5px); /* Match desktop .tableContainer blur */
    border: 1px solid ${borderMediumDark};
    border-radius: 4px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: ${textLightPrimary};
}

.log,
.earthquakeInfo,
.weatherInfo {
     background-color: ${panelDarkBg}; /* Use semi-transparent panel background */
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textMutedDark};
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilterSolidDark};
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid ${accentPrimaryDark};
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textLightPrimary};
    background: transparent;
}

.tableContainer h3.table-heading img,
.tableContainer thead img,
#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilterSolidDark};
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${slateDark};
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 8px rgba(0, 0, 0, 0.25);
    border-right: 1px solid ${borderMediumDark};
    border-radius: 0;
}

.sidebar-heading {
    font-size: 20px;
    color: rgb(255, 255, 255); /* User requested white */
    border-radius: 4px;
    background-color: transparent;
    margin-top: 40px;
    padding: 0; /* User requested padding */
    margin-left: 24px; margin-right: 24px; /* Maintain some spacing */
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textMutedDark};
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${textLightPrimary};
    background-color: rgba(74, 144, 226, 0.15); /* accentPrimaryDark with alpha */
    border-left: 4px solid ${accentPrimaryDark};
}

.sidebar .closebtn {
    color: ${textLightPrimary};
    background: transparent;
}

/* Sidebar Section Button Styling */
.sidebar-section button {
    background-color: ${accentPrimaryDark};
    color: ${slateDarkest};
    border: 1px solid ${borderMediumDark};
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: none;
}

.sidebar-section button:hover {
    background-color: ${accentSecondaryDark};
    color: ${slateDarkest};
    border-color: ${accentPrimaryDark};
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
}

/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background-color: ${accentPrimaryDark};
    color: ${slateDarkest};
    padding: 10px 14px;
    border: 1px solid ${borderMediumDark};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    text-shadow: none;
}

.hamburger-btn:hover {
    background-color: ${accentSecondaryDark};
    color: ${slateDarkest};
    border-color: ${accentPrimaryDark};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipSolidDarkBg};
    border-radius: 4px;
    color: ${accentPrimaryDark};
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    border: 1px solid ${accentPrimaryDark};
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
    border-top-color: ${accentPrimaryDark};
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
    border-color: ${tooltipSolidDarkBg} transparent transparent transparent;
    z-index: 1;
}

/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: rgba(74, 144, 226, 0.8); /* accentPrimaryDark Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-solid-slate 1.4s infinite ease-out;
}

@keyframes pulse-signal-solid-slate {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 2px rgba(74, 144, 226, 0.6);
        opacity: 0.85;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 14px 20px rgba(74, 144, 226, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 2px rgba(74, 144, 226, 0);
        opacity: 0;
    }
}

/* Earthquake Magnitude Colors */
.low-magnitude {
    background-color: rgba(124, 181, 249, 0.1); /* Subtle accentSecondaryDark */
    border-left: 4px solid ${accentSecondaryDark};
    color: ${textMutedDark};
}

.moderate-magnitude {
    background-color: rgba(74, 144, 226, 0.1); /* Subtle accentPrimaryDark */
    border-left: 4px solid ${accentPrimaryDark};
    color: ${textMutedDark};
}

.high-magnitude {
    background-color: rgba(82, 89, 102, 0.12); /* Subtle borderMediumDark */
    border-left: 4px solid ${borderMediumDark};
    color: ${textLightSecondary};
}

.very-high-magnitude {
    background-color: rgba(62, 68, 81, 0.2); /* Subtle borderDark */
    border-left: 4px solid ${borderDark};
    color: ${textLightPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 29, 33, 0.92); /* slateDarkest transparent */
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${panelDarkBg};
    padding: 30px 40px;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 340px;
    color: ${textLightPrimary};
    border: 1px solid ${borderMediumDark};
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentPrimaryDark};
    font-weight: 500;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${slateDark};
    border-radius: 5px;
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderDark};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background-color: ${accentPrimaryDark};
    border-radius: 5px;
    transition: width 0.3s ease-out;
    box-shadow: none;
}

#progress-percentage {
    font-weight: 600;
    color: ${accentPrimaryDark};
}

.nav-button {
    background-color: transparent;
    color: ${textLightPrimary};
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
    filter: ${iconFilterSolidDark};
    flex-shrink: 0;
}

.nav-button span {
    font-size: 12px;
    line-height: 1;
}

.nav-button:hover {
    background-color: rgba(74, 144, 226, 0.15); /* accentPrimaryDark transparent */
}

.nav-button.active {
    background-color: rgba(124, 181, 249, 0.2); /* accentSecondaryDark transparent */
}

/* Desktop: .earthquakeInfo and .weatherInfo fixed positioning */
.earthquakeInfo, .weatherInfo {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    z-index: 10;
    /* Styling from .card class will apply for background, padding, border, etc. */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentPrimaryDark}; /* Slate's accent */
}

.weatherInfo {
    top: 430px; /* Consistent with chromatic-glass, adjust if needed */
    border-left: 4px solid ${accentSecondaryDark}; /* Slate's secondary accent */
}

.log {
    position: fixed;
    left: 80px; /* Adjusted to match chromatic-glass */
    bottom: 10px; /* Adjusted to match chromatic-glass */
    width: auto; max-width: 350px; max-height: 150px;
    background-color: rgba(26, 29, 33, 0.92);
    border: 1px solid ${borderDark};
    border-radius: 4px; /* Rounded for overlay */
    padding: 10px 15px;
    box-shadow: 0 -2px 7px rgba(0, 0, 0, 0.2);
    color: ${textMutedDark};
    line-height: 1.5;
    z-index: 1000;
    box-sizing: border-box;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-solid-slate 1s ease-in-out; /* Simpler, shorter animation */
}

@keyframes highlight-row-solid-slate {
    0%, 100% {
        background-color: transparent;
        transform: scale(1);
    }
    50% {
        background-color: rgba(74, 144, 226, 0.1); /* accentPrimaryDark with less alpha */
        transform: scale(1.005);
    }
}

/* --- Media Query for Mobile (max-width: 719px) --- */
@media (max-width: 719px) {
    body {
        flex-direction: column;
        height: auto;
        overflow: auto;
        padding-bottom: 60px; /* Space for bottom nav bar */
    }
    .map {
        width: 100%;
        height: calc(100vh - 60px);
        border-right: none;
    }

    /* --- Mobile Overlay Panel Styles --- */
    .tableContainer, .earthquakeInfo, .weatherInfo {
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
        top: 0;
        bottom: 60px; /* Space for bottom nav bar */
        height: auto;
        max-height: calc(100vh - 60px);
        overflow-y: auto;
        z-index: 990;
        padding: 15px;
        display: none; /* Hidden by default, shown by .visible class */
    }
    .tableContainer {
        background-color: ${panelDarkBg}; /* Or panelDarkBg for consistency */
        backdrop-filter: blur(5px);
    }
    .earthquakeInfo, .weatherInfo {
        background-color: ${panelDarkBg};
        backdrop-filter: blur(5px); /* Synced with mobile .tableContainer */
        border-top: 4px solid transparent; /* Base for accent color */
    }
    .earthquakeInfo { border-top-color: ${accentPrimaryDark}; }
    .weatherInfo { border-top-color: ${accentSecondaryDark}; }

    .tableContainer.visible, .earthquakeInfo.visible, .weatherInfo.visible {
        display: block;
    }
    .tableContainer.visible h3.table-heading {
        padding-top: 10px;
        margin-left: -10px; margin-right: -10px;
        padding-left: 10px; padding-right: 10px;
    }

    .tableContainer.visible th {
        top: 58px; /* Approx height of h3.table-heading. Adjust if necessary. */
        background-color: ${slateDark};
    }

    .earthquakeInfo.visible h3, .weatherInfo.visible h3 {
        margin-top: 0;
    }

    .hamburger-btn {
        z-index: 1006;
    }
    .log {
        left: 0; right: 0; width: 100%; /* Full width overlay */
        bottom: 60px; /* Above nav bar */
        top: auto;
        max-height: 150px; /* Example max height */
        border-radius: 0;
        border-left:none; border-right:none; border-bottom:none;
        border-top: 1px solid ${borderDark}; /* Top border for separation */
        padding: 10px;
        box-shadow: 0 -2px 7px rgba(0, 0, 0, 0.2); /* Shadow on top */
        z-index: 1000;
    }
}

`;

    styleSheet.textContent = cssStyles;
    document.head.appendChild(styleSheet);
    console.log("Solid Slate (Dark) theme applied.");

})(); // End of IIFE
