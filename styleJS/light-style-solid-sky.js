(function () { // Start of IIFE

    const themeId = 'dynamic-styles-solid-sky';

    // Dynamic CSS Injection for Earthquake Tracker - Solid Sky Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Solid Sky)
    const skyBg = '#F0F8FF'; // AliceBlue - very light
    const panelBg = 'rgba(230, 240, 255, 0.85)'; // Semi-transparent light sky blue
    const borderLight = '#D6E6F2';    // Light Periwinkle
    const borderMedium = '#B9CDE0';   // Powder Blue
    const textHeader = '#1E4E7C';   // Dark Cerulean
    const textBody = '#3A506B';     // Steel Blue
    const textMuted = '#607B8B';     // Slate Gray
    const accentPrimary = '#5DA9E9';  // Carolina Blue
    const accentSecondary = '#A2D2FF';// Baby Blue Eyes
    const tooltipSolidBg = 'rgba(235, 245, 255, 0.95)';
    // Filter to make (assumed dark) icons appear as accentPrimary (#5DA9E9)
    const iconFilterSolid = 'brightness(0) saturate(100%) invert(69%) sepia(54%) saturate(1406%) hue-rotate(171deg) brightness(95%) contrast(91%)';

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
    background-color: ${skyBg};
    font-size: 12px;
    display: flex; /* For desktop: row layout */
    flex-direction: row;
    height: 100vh; /* Full viewport height for desktop */
    overflow: hidden; /* Prevent scrolling on body for desktop */
    color: ${textBody};
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
    border-bottom: 1px solid ${borderLight};
}

th {
    background-color: rgba(220, 230, 245, 0.7); /* Lighter panelBg */
    color: ${accentPrimary};
    font-weight: 600;
    border-bottom-width: 2px;
    border-bottom-color: ${accentPrimary};
}

.tableContainer h3.table-heading {
    color: ${skyBg};
    background-color: ${accentPrimary};
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    text-shadow: none;
    border-bottom: 1px solid ${borderMedium};
    padding-bottom: 12px;
    letter-spacing: 0.5px;
}

td {
    color: ${textMuted};
}

/* Map Container */
.map {
    width: 100%; /* Desktop width */
    height: 100%; /* Full height for desktop */
    position: relative;
    background: ${skyBg};
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
    background-color: ${panelBg}; /* Use semi-transparent panel background */
    backdrop-filter: blur(6px); /* Add blur effect */
    border-left: 1px solid ${borderLight}; /* Add left border */
    display: none; /* Hidden by default on desktop */
    z-index: 995; /* Above map, below sidebar */
}

.tableContainer.visible {
    display: block; /* Show when .visible class is added */
}

/* Card Component */
.card {
    background: ${panelBg};
    backdrop-filter: blur(6px); /* Match desktop .tableContainer blur */
    border: 1px solid ${borderMedium};
    border-radius: 6px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
    color: ${textBody};
}

.log,
.earthquakeInfo,
.weatherInfo {
    background-color: ${panelBg};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textMuted};
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilterSolid};
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid ${accentPrimary};
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textHeader};
    background: transparent;
}

.tableContainer h3.table-heading img,
.tableContainer thead img,
#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilterSolid};
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${panelBg};
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.07);
    border-right: 1px solid ${borderMedium};
    border-radius: 0;
}

.sidebar-heading {
    font-size: 20px;
    color: ${textHeader}; /* Theme specific for light */
    border-radius: 4px;
    background-color: transparent;
    margin-top: 40px;
    padding: 0; /* User requested padding */
    margin-left: 24px; margin-right: 24px; /* Maintain some spacing */
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textMuted};
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${textHeader};
    background-color: rgba(93, 169, 233, 0.2); /* accentPrimary with alpha */
    border-left: 4px solid ${accentPrimary};
}

.sidebar .closebtn {
    color: ${textHeader};
    background: transparent;
}

/* Sidebar Section Button Styling */
.sidebar-section button {
    background-color: ${accentPrimary};
    color: ${skyBg};
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 8px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    text-shadow: none;
}

.sidebar-section button:hover {
    background-color: ${accentSecondary};
    color: ${textHeader};
    border-color: rgba(0, 0, 0, 0.08);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-1px);
}

/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background-color: ${accentPrimary};
    color: ${skyBg};
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
    text-shadow: none;
}

.hamburger-btn:hover {
    background-color: ${accentSecondary};
    color: ${textHeader};
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipSolidBg};
    border-radius: 4px;
    color: ${textBody};
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid ${borderMedium};
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
    border-top-color: ${borderMedium};
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
    border-color: ${tooltipSolidBg} transparent transparent transparent;
    z-index: 1;
}

/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: rgba(93, 169, 233, 0.7); /* accentPrimary Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(93, 169, 233, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-solid-sky 1.4s infinite ease-out;
}

@keyframes pulse-signal-solid-sky {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(93, 169, 233, 0.6);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 12px 20px rgba(93, 169, 233, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(93, 169, 233, 0);
        opacity: 0;
    }
}

/* Earthquake Magnitude Colors */
.low-magnitude {
    background-color: rgba(162, 210, 255, 0.15); /* Pale accentSecondary bg */
    border-left: 4px solid ${accentSecondary};
    color: ${textMuted};
}

.moderate-magnitude {
    background-color: rgba(93, 169, 233, 0.15); /* Pale accentPrimary bg */
    border-left: 4px solid ${accentPrimary};
    color: ${textMuted};
}

.high-magnitude {
    background-color: rgba(214, 230, 242, 0.2); /* Pale borderLight bg */
    border-left: 4px solid ${borderLight};
    color: ${textBody};
}

.very-high-magnitude {
    background-color: rgba(185, 205, 224, 0.2); /* Pale borderMedium bg for contrast */
    border-left: 4px solid ${borderMedium};
    color: ${textHeader};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(230, 240, 255, 0.9); /* panelBg transparent */
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${panelBg};
    padding: 30px 40px;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
    text-align: center;
    width: 340px;
    color: ${textHeader};
    border: 1px solid ${borderMedium};
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentPrimary};
    font-weight: 500;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${borderLight};
    border-radius: 5px;
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderMedium};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background-color: ${accentPrimary};
    border-radius: 5px;
    transition: width 0.3s ease-out;
    box-shadow: none;
}

#progress-percentage {
    font-weight: 600;
    color: ${accentPrimary};
}

.nav-button {
    background-color: transparent;
    color: ${textHeader};
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
    filter: ${iconFilterSolid};
    flex-shrink: 0;
}

.nav-button span {
    font-size: 12px;
    line-height: 1;
}

.nav-button:hover {
    background-color: rgba(93, 169, 233, 0.2); /* accentPrimary transparent */
}

.nav-button.active {
    background-color: rgba(162, 210, 255, 0.3); /* accentSecondary transparent */
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
    border-left: 4px solid ${accentPrimary}; /* Sky's accent */
}

.weatherInfo {
    top: 430px; /* Consistent with chromatic-glass, adjust if needed */
    border-left: 4px solid ${accentSecondary}; /* Sky's secondary accent */
}

.log {
    position: fixed;
    left: 80px; /* Adjusted to match chromatic-glass */
    bottom: 10px; /* Adjusted to match chromatic-glass */
    width: auto; max-width: 350px; max-height: 150px;
    background-color: rgba(235, 245, 255, 0.9);
    border: 1px solid ${borderLight};
    border-radius: 4px; /* Rounded for overlay */
    padding: 10px 15px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
    color: ${textMuted};
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
    animation: highlight-row-solid-sky 1s ease-in-out; /* Simpler, shorter animation */
}

@keyframes highlight-row-solid-sky {
    0%, 100% {
        background-color: transparent;
        transform: scale(1);
    }
    50% {
        background-color: rgba(93, 169, 233, 0.15); /* accentPrimary with alpha */
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
        background-color: ${panelBg}; /* Or panelBg for consistency */
        backdrop-filter: blur(6px);
    }
    .earthquakeInfo, .weatherInfo {
        background-color: ${panelBg};
        backdrop-filter: blur(6px); /* Synced with mobile .tableContainer */
        border-top: 4px solid transparent; /* Base for accent color */
    }
    .earthquakeInfo { border-top-color: ${accentPrimary}; }
    .weatherInfo { border-top-color: ${accentSecondary}; }

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
        background-color: rgba(230, 240, 255, 0.9); /* Slightly opaque for sticky header */
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
        border-top: 1px solid ${borderLight}; /* Top border for separation */
        padding: 10px;
        box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06); /* Shadow on top */
        z-index: 1000;
    }
}

`;

    styleSheet.textContent = cssStyles;
    document.head.appendChild(styleSheet);
    console.log("Solid Sky (Light) theme applied.");

})(); // End of IIFE
