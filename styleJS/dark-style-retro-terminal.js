(function() { // Start of IIFE

const themeId = 'dynamic-styles-retro-terminal';

// Dynamic CSS Injection for Earthquake Tracker - Retro Terminal Glitch Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Retro Terminal Glitch - Green)
const terminalBg = '#0A0F0A';      // Very dark green-black
const containerBg = '#101510';     // Slightly lighter dark green-black
const border = '#003300';          // Dark Green
const textPrimary = '#00FF00';     // Bright Green (Main Text)
const textDim = '#00A000';          // Muted Green (Secondary Text)
const accentError = '#FF003C';     // Glitch Red (Very High Magnitude, Errors)
const accentHighlight = '#00FFFF'; // Glitch Cyan (Highlights, Moderate Magnitude)
const accentAlt = '#FFFF00';       // Glitch Yellow (High Magnitude)
const scanlineColor = 'rgba(0, 255, 0, 0.04)'; // Scanline effect color
const tooltipBg = 'rgba(16, 21, 16, 0.95)'; // Semi-transparent dark bg for tooltip
const iconFilter = 'invert(100%) sepia(100%) saturate(10000%) hue-rotate(90deg) brightness(1.1) contrast(100%)'; // Green filter

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap"); /* Pixel/Terminal Font */

/* Body Styles */
body {
    font-family: 'VT323', monospace; /* Apply the font */
    background-color: ${terminalBg}; /* Dark background */
    /* Scanline Effect */
    background-image: linear-gradient(to bottom, ${scanlineColor} 1px, transparent 1px);
    background-size: 100% 3px; /* Adjust size/spacing of scanlines */
    font-size: 12px; /* VT323 needs to be larger */
    line-height: 1.4;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Bright Green text */
    font-weight: 400; /* VT323 usually has one weight */
    text-shadow: 0 0 2px ${textPrimary}; /* Subtle glow */
    image-rendering: pixelated; /* Keep pixels sharp */
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 4px 12px; /* Adjusted padding */
    text-align: left;
    border: 1px solid ${border}; /* Dark green border */
}

th {
    background-color: ${containerBg}; /* Darker bg */
    color: ${accentHighlight}; /* Cyan header text */
    border-bottom-width: 2px;
    border-bottom-color: ${accentHighlight}; /* Cyan border */
    text-shadow: 0 0 3px ${accentHighlight};
}

td {
    color: ${textDim}; /* Dimmer green text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${textPrimary};
    background-color: ${containerBg}; /* Darker bg */
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.5em; /* Larger for pixel font */
    text-shadow: 0 0 4px ${textPrimary};
    border-bottom: 1px dashed ${border};
    padding-bottom: 10px;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${containerBg}; /* Dark background */
    border-right: 2px solid ${border}; /* Dark green border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${terminalBg}; /* Main Background */
    border-left: 2px solid ${border}; /* Dark green border */
    border-radius: 0;
}

/* Card Component (Retro Terminal) */
.card {
    background: ${containerBg}; /* Dark bg */
    border: 1px solid ${border};
    border-radius: 0px; /* Sharp corners */
    padding: 12px;
    margin: 8px 0;
    box-shadow: 2px 2px 0px ${border}; /* Offset shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    line-height: 1.5;
    color: ${textDim}; /* Dimmer green */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 8px;
    flex-shrink: 0;
    filter: ${iconFilter};
    image-rendering: pixelated;
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    border-bottom: 2px solid ${textPrimary}; /* Green underline */
    padding-bottom: 6px;
    font-weight: 400;
    color: ${textPrimary}; /* Green header text */
    text-shadow: 0 0 3px ${textPrimary};
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 8px;
    flex-shrink: 0;
    filter: ${iconFilter};
    image-rendering: pixelated;
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Dark bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 50px;
    box-shadow: 2px 0 0px ${border}; /* Offset shadow */
    border-right: 1px solid ${border};
    border-radius: 0;
}

.sidebar a {
    padding: 10px 20px;
    text-decoration: none;
    color: ${textDim}; /* Dimmer green */
    display: block;
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;
    font-weight: 400;
    border-radius: 0;
    margin: 1px 5px;
}

.sidebar a:hover {
    color: ${terminalBg}; /* Dark text on hover */
    background-color: ${textPrimary}; /* Green background */
    text-shadow: none;
}

/* Close button inside sidebar */
.sidebar .closebtn { /* Assuming the close button has class="closebtn" */
    position: absolute;
    top: 5px;
    font-size: 28px; /* Larger for easier clicking */
    margin-left: 50px; /* Keep it from overlapping content */
    color: ${textDim}; /* Dimmer green */
    text-decoration: none;
    transition: color 0.1s, text-shadow 0.1s;
}

.sidebar .closebtn:hover {
    color: ${accentError}; /* Glitch Red on hover */
    text-shadow: 0 0 3px ${accentError};
}

/* --- Sidebar Section Button Styling (Retro Terminal) --- */
.sidebar-section button {
    background: ${containerBg}; /* Dark bg */
    color: ${textPrimary}; /* Green text */
    border: 1px solid ${textPrimary}; /* Green border */
    padding: 6px 10px;
    border-radius: 0px; /* Sharp corners */
    cursor: pointer;
    font-family: 'VT323', monospace;
    font-weight: 400;
    transition: all 0.1s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 1px 1px 0px ${border}; /* Offset shadow */
    text-shadow: 0 0 2px ${textPrimary};
}

.sidebar-section button:hover {
    background: ${textPrimary}; /* Green background */
    color: ${terminalBg}; /* Dark text */
    border-color: ${textPrimary};
    box-shadow: 1px 1px 0px ${border};
    transform: translate(1px, 1px); /* Button press effect */
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: ${containerBg}; /* Dark bg */
    color: ${textPrimary}; /* Green text */
    padding: 8px 10px;
    border: 1px solid ${textPrimary}; /* Green border */
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1002;
    border-radius: 0px; /* Sharp corners */
    transition: all 0.1s ease-in-out;
    box-shadow: 2px 2px 0px ${border};
    text-shadow: 0 0 2px ${textPrimary};
}

.hamburger-btn:hover {
    background: ${textPrimary}; /* Green background */
    color: ${terminalBg}; /* Dark text */
    border-color: ${textPrimary};
    box-shadow: 1px 1px 0px ${border};
    transform: translate(1px, 1px); /* Button press effect */
    text-shadow: none;
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark transparent bg */
    backdrop-filter: none; /* No blur for retro */
    border-radius: 0px; /* Sharp corners */
    color: ${textPrimary}; /* Green text */
    padding: 6px 10px;
    white-space: nowrap;
    box-shadow: 2px 2px 0px ${border}; /* Offset shadow */
    border: 1px solid ${textPrimary}; /* Green Border */
    font-weight: 400;
    text-shadow: 0 0 2px ${textPrimary};
    line-height: 1.3;
}

.ol-tooltip::after {
    content: "";
    position: absolute;
    bottom: -9px; /* Adjusted for border */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px; /* Triangle size */
    border-color: transparent;
    border-top-color: ${textPrimary}; /* Match border color */
}
/* Inner triangle */
.ol-tooltip::before {
    content: "";
    position: absolute;
    bottom: -8px; /* Inside the border */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 7px 0 7px; /* Slightly smaller */
    border-color: ${tooltipBg} transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: rgba(0, 255, 0, 0.8); /* Green Signal */
    border-radius: 0%; /* Square */
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.6);
    border: 1px solid ${terminalBg}; /* Dark border */
    image-rendering: pixelated;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-green-terminal 1.0s infinite steps(3, end); /* Stepped animation */
}

/* Separate keyframes for green pulse */
@keyframes pulse-signal-green-terminal {
    0% {
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 0 0px rgba(0, 255, 0, 0.6);
        opacity: 0.9;
    }
    66% {
        transform: translate(-50%, -50%) scale(1.6);
        box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 0 0px rgba(0, 255, 0, 0);
        opacity: 0.9;
    }
}


/* Earthquake Magnitude Colors (Retro Terminal) */
.low-magnitude {
    background-color: rgba(0, 255, 0, 0.05); /* Very subtle green */
    border-left: 3px solid ${textDim}; /* Muted green */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(0, 255, 255, 0.07); /* Subtle cyan */
    border-left: 3px solid ${accentHighlight}; /* Cyan */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(255, 255, 0, 0.08); /* Subtle yellow */
    border-left: 3px solid ${accentAlt}; /* Yellow */
    color: ${textPrimary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 0, 60, 0.1); /* Subtle red */
    border-left: 3px solid ${accentError}; /* Red */
    color: ${textPrimary}; /* Brighter text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 15, 10, 0.9); /* terminalBg transparent */
    backdrop-filter: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.2s;
}

.progress-content {
    background-color: ${containerBg}; /* Dark bg */
    padding: 25px 35px;
    border-radius: 0px; /* Sharp corners */
    box-shadow: 3px 3px 0px ${border}; /* Offset shadow */
    text-align: center;
    width: 320px;
    color: ${textPrimary}; /* Green Text */
    border: 1px solid ${border}; /* Dark Green Border */
}

#progress-message {
    margin-bottom: 15px;
    color: ${textPrimary}; /* Green message text */
    font-weight: 400;
    text-shadow: 0 0 3px ${textPrimary};
}

#progress-bar-visual-container {
    width: 100%;
    height: 14px; /* Adjust height */
    background-color: ${terminalBg}; /* Darkest Background */
    border-radius: 0px; /* Sharp */
    overflow: hidden;
    margin: 15px 0;
    border: 1px solid ${border};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${textPrimary}, ${accentHighlight}); /* Green to Cyan */
    border-radius: 0px; /* Sharp */
    transition: width 0.2s linear; /* Linear */
    box-shadow: 0 0 4px ${textPrimary};
}

#progress-percentage {
    font-weight: 400;
    color: ${textPrimary}; /* Green Text */
    text-shadow: 0 0 3px ${textPrimary};
}

/* Fixed Info Divs Positioning & Styling (Retro Terminal) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 70px;
    width: auto;
    max-width: 380px;
    height: auto;
    padding: 15px;
    z-index: 10;
    border: 1px solid ${border}; /* Dark Green Border */
    border-radius: 0px; /* Sharp corners */
    background-color: rgba(16, 21, 16, 0.92); /* containerBg transparent */
    backdrop-filter: none;
    box-shadow: 2px 2px 0px ${border}; /* Offset shadow */
    color: ${textPrimary}; /* Green text */
}

.earthquakeInfo {
    top: 70px;
    border-left: 3px solid ${textPrimary};
}

.weatherInfo {
    top: 380px; /* Adjust spacing */
    border-left: 3px solid ${accentHighlight};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 70px;
    width: auto; /* Adjust width as needed */
    height: 110px;
    overflow-y: auto;
    background-color: rgba(10, 15, 10, 0.9); /* terminalBg transparent */
    border: 1px solid ${border}; /* Subtle border */
    border-radius: 0px;
    padding: 8px 12px;
    box-shadow: 1px 1px 0px ${border};
    color: ${textDim}; /* Dimmer log text */
    line-height: 1.4;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-terminal-glitch 0.5s steps(1) infinite; /* Flicker twice */
}

/* Separate keyframes for terminal glitch highlight */
@keyframes highlight-row-terminal-glitch {
    0%, 100% {
        background-color: rgba(0, 255, 255, 0.1); /* Cyan bg */
        color: ${accentHighlight}; /* Cyan text */
        /* text-shadow: 0 0 5px ${accentHighlight}; */
        transform: translateX(0);
    }
    33% {
        background-color: transparent;
        color: inherit;
        /* text-shadow: none; */
        transform: translateX(-2px); /* Glitch left */
    }
    66% {
        background-color: rgba(0, 255, 255, 0.05);
        color: inherit;
        /* text-shadow: none; */
        transform: translateX(2px); /* Glitch right */
    }
}

/* --- Remove Old Table Row Animation Styles --- */
/* @keyframes highlight-new-row { ... } */
/* .new-earthquake-row { animation: highlight-new-row ...; } */

`;

// --- Apply Styles and Cleanup ---

// Add styles to the style element (Cleanup is now handled by loadThemeScript)
styleSheet.textContent = cssStyles; // Modern way to add CSS text

// Append style element to head
document.head.appendChild(styleSheet);

console.log("Retro Terminal (Dark) theme applied."); // Confirmation message

})(); // End of IIFE