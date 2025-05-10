(function() { // Start of IIFE

const themeId = 'dynamic-styles-nordic-night';

// Dynamic CSS Injection for Earthquake Tracker - Nordic Night Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Nord Palette (Approximate)
const nord0 = '#2E3440'; // Polar Night - Darkest
const nord1 = '#3B4252'; // Polar Night
const nord2 = '#434C5E'; // Polar Night
const nord3 = '#4C566A'; // Polar Night - Lighter
const nord4 = '#D8DEE9'; // Snow Storm - Lightest Gray
const nord5 = '#E5E9F0'; // Snow Storm
const nord6 = '#ECEFF4'; // Snow Storm - White
const nord7 = '#8FBCBB'; // Frost - Cyan/Blue
const nord8 = '#88C0D0'; // Frost - Lighter Blue
const nord9 = '#81A1C1'; // Frost - Medium Blue
const nord10 = '#5E81AC'; // Frost - Darker Blue
const nord11 = '#BF616A'; // Aurora - Red
const nord12 = '#D08770'; // Aurora - Orange
const nord13 = '#EBCB8B'; // Aurora - Yellow
const nord14 = '#A3BE8C'; // Aurora - Green
const nord15 = '#B48EAD'; // Aurora - Purple

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"); /* Clean & Rounded */

/* Body Styles */
body {
    font-family: 'Nunito Sans', sans-serif; /* Apply the font */
    background-color: ${nord0}; /* Darkest background */
    font-size: 12px;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${nord4}; /* Lightest Gray Text */
    font-weight: 400; /* Regular weight */
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 4px 15px;
    text-align: left;
    border-bottom: 1px solid ${nord2}; /* Darker border */
}

th {
    background-color: ${nord1}; /* Slightly lighter dark bg */
    color: ${nord8}; /* Frost Blue header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${nord3}; /* Lighter dark border */
}

td {
    color: ${nord4}; /* Light text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${nord7}; /* Frost Cyan/Blue */
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.4em;
    font-weight: 700; /* Bold */
    border-bottom: 1px solid ${nord3}; /* Lighter dark border */
    padding-bottom: 10px;
    background-color: ${nord1}; /* Slightly lighter dark bg */
}
/* --- End Table Heading Style --- */

/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${nord1}; /* Dark background */
    border-right: 1px solid ${nord3}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${nord0}; /* Main Background */
    border-left: 1px solid ${nord2}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Nordic Night) */
.card {
    background: ${nord1}; /* Slightly lighter dark bg */
    border: 1px solid ${nord3}; /* Subtle border */
    border-radius: 5px; /* Softly rounded corners */
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* Subtle shadow */
    color: ${nord4};
}

/* Info Div Alignment (Keep existing flex alignment) */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.5;
    color: ${nord4}; /* Light text */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    /* Adjust icon color for dark theme - make them lighter */
    filter: invert(90%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(100%) contrast(90%);
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid ${nord8}; /* Frost Blue underline */
    padding-bottom: 8px;
    font-weight: 700; /* Bold */
    color: ${nord7}; /* Frost Cyan/Blue header text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: invert(90%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(100%) contrast(90%);
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${nord1}; /* Dark background */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2); /* Soft shadow */
    border-right: 1px solid ${nord3};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${nord4}; /* Light text */
    display: block;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 600;
    border-radius: 4px;
    margin: 2px 10px;
}

.sidebar a:hover {
    color: ${nord0}; /* Dark text on hover */
    background-color: ${nord8}; /* Frost Blue Background on Hover */
}

/* --- Sidebar Section Button Styling (Nordic Night) --- */
.sidebar-section button {
    background-color: ${nord10}; /* Frost Darker Blue */
    color: ${nord6}; /* White text */
    border: none;
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-shadow: none;
}

.sidebar-section button:hover {
    background-color: ${nord9}; /* Frost Medium Blue on Hover */
    color: ${nord6};
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background-color: ${nord10}; /* Frost Darker Blue */
    color: ${nord6}; /* White Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 15px;
    left: 20px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
}

.hamburger-btn:hover {
    background-color: ${nord9}; /* Frost Medium Blue on Hover */
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.35);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${nord2}; /* Dark Background */
    border-radius: 4px; /* Rounded corners */
    color: ${nord5}; /* Light text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    border: 1px solid ${nord3}; /* Muted Border */
    font-weight: 600;
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
    border-width: 9px 9px 0 9px;
    border-color: transparent;
    border-top-color: ${nord3}; /* Match border color */
}
/* Inner triangle */
.ol-tooltip::before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: ${nord2} transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 26px;
    height: 26px;
    background-color: rgba(163, 190, 140, 0.8); /* Aurora Green Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(163, 190, 140, 0.6);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-green-nordic 1.4s infinite ease-out;
}

/* Separate keyframes for green pulse */
@keyframes pulse-signal-green-nordic {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(163, 190, 140, 0.6);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.8);
        box-shadow: 0 0 0 18px rgba(163, 190, 140, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(163, 190, 140, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Nord Aurora/Frost) */
.low-magnitude {
    background-color: rgba(163, 190, 140, 0.1); /* Aurora Green bg */
    border-left: 4px solid ${nord14};
    color: ${nord4};
}

.moderate-magnitude {
    background-color: rgba(235, 203, 139, 0.1); /* Aurora Yellow bg */
    border-left: 4px solid ${nord13};
    color: ${nord4};
}

.high-magnitude {
    background-color: rgba(208, 135, 112, 0.15); /* Aurora Orange bg */
    border-left: 4px solid ${nord12};
    color: ${nord4};
}

.very-high-magnitude {
    background-color: rgba(191, 97, 106, 0.15); /* Aurora Red bg */
    border-left: 4px solid ${nord11};
    color: ${nord4};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(46, 52, 64, 0.9); /* nord0 transparent */
    backdrop-filter: blur(2px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${nord1}; /* Dark Element Background */
    padding: 30px 40px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 320px;
    color: ${nord4}; /* Light Text */
    border: 1px solid ${nord3}; /* Muted Border */
}

#progress-message {
    margin-bottom: 20px;
    color: ${nord8}; /* Frost Blue message text */
    font-weight: 600;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${nord3}; /* Muted Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 20px 0;
    border: none;
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${nord8}, ${nord15}); /* Frost Blue to Aurora Purple */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: none;
}

#progress-percentage {
    font-weight: 700;
    color: ${nord8}; /* Frost Blue Text */
}

/* Fixed Info Divs Positioning & Styling (Nordic Night) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 20px;
    z-index: 10;
    border: 1px solid ${nord3}; /* Muted Border */
    border-radius: 5px; /* Rounded corners */
    background-color: rgba(59, 66, 82, 0.9); /* nord1 transparent */
    backdrop-filter: blur(2px); /* Subtle blur */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    color: ${nord4}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
}

.weatherInfo {
    top: 400px; /* Adjust spacing */
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 120px;
    overflow-y: auto;
    background-color: rgba(46, 52, 64, 0.9); /* nord0 transparent */
    border: 1px solid ${nord2}; /* Subtle border */
    border-radius: 5px;
    padding: 10px 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    color: ${nord4}; /* Dimmer log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-nordic 0.5s steps(1) infinite;
}

/* Separate keyframes for nordic highlight */
@keyframes highlight-row-nordic {
    0% {
        background-color: rgba(143, 188, 187, 0.15); /* Frost Cyan/Blue highlight */
        transform: scale(1.01);
    }
    70% {
        background-color: rgba(143, 188, 187, 0.15); /* Hold highlight */
        transform: scale(1.01);
    }
    100% {
        background-color: transparent; /* Fade back */
        transform: scale(1);
    }
}

`;

// --- Apply Styles and Cleanup ---

// Add styles to the style element (Cleanup is now handled by loadThemeScript)
styleSheet.textContent = cssStyles; // Modern way to add CSS text

// Append style element to head
document.head.appendChild(styleSheet);

console.log("Nordic Night (Dark) theme applied."); // Confirmation message

})(); // End of IIFE