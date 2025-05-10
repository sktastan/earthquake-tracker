(function() { // Start of IIFE

const themeId = 'dynamic-styles-dark-blue';

// Dynamic CSS Injection for Earthquake Tracker - Dark Blue/Cyan Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700"); /* Roboto for a clean look */

/* Body Styles */
body {
    font-family: 'Roboto', sans-serif;
    background-color: #1A232A; /* Very Dark Blue/Gray Background */
    font-size: 12px;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: #E0E0E0; /* Light Gray Text */
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
    border-bottom: 1px solid #37474F; /* Blue Gray Border */
}

th {
    background-color: #263238; /* Darker Blue Gray Header Background */
    color: #00BCD4; /* Cyan Header Text */
    font-weight: 500; /* Medium weight */
    border-bottom-width: 2px; /* Slightly thicker header border */
    border-bottom-color: #455A64; /* Darker Blue-Gray */
}

td {
    color: #B0BEC5; /* Lighter Blue-Gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: #00BCD4; /* Cyan */
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.4em;
    font-weight: 500; /* Medium weight */
    border-bottom: 1px solid #455A64; /* Darker Blue-Gray */
    padding-bottom: 10px;
    text-shadow: 0 0 3px rgba(0, 188, 212, 0.4);
     background-color: #263238; /* Dark Blue Gray */
}
/* --- End Table Heading Style --- */

/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: #263238; /* Dark Blue Gray map background */
    border-right: 1px solid #455A64; /* Subtle border */
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: #1F2C34; /* Slightly Lighter Dark Blue */
    border-left: 1px solid #37474F; /* Subtle border */
}

/* Card Component (Flat Dark) */
.card {
    background: #263238; /* Dark Blue Gray card */
    border: 1px solid #37474F; /* Light border */
    border-radius: 4px; /* Slightly rounded corners */
    padding: 15px;
    margin: 10px 0;
    box-shadow: none; /* No shadow for flat */
    color: #E0E0E0; /* Ensure text inside card is light */
}

/* Info Div Alignment (Keep existing flex alignment) */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.4; /* Slightly more line height */
    color: #B0BEC5; /* Lighter text for info */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px; /* Consistent spacing */
    flex-shrink: 0;
    filter: invert(90%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(100%) contrast(90%); /* Adjust icons for dark bg */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid #00BCD4; /* Cyan underline for header */
    padding-bottom: 8px;
    font-weight: 500;
    color: #80DEEA; /* Lighter Cyan */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: invert(90%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(100%) contrast(90%); /* Adjust icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: #1F2C34; /* Dark Sidebar */
    overflow-x: hidden;
    transition: 0.3s; /* Faster transition */
    padding-top: 60px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3); /* Subtle shadow */
    border-right: 1px solid #37474F;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: #B0BEC5; /* Light Gray Text */
    display: block;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 500;
}

.sidebar a:hover {
    color: #FFFFFF; /* White text on hover */
    background-color: #0097A7; /* Darker Cyan Background on Hover */
}

/* Close button inside sidebar */
.sidebar .closebtn { /* Assuming the close button has class="closebtn" */
    position: absolute;
    top: 5px;
    font-size: 30px;
    margin-left: 50px;
    color: #B0BEC5; /* Light Gray Text */
    text-decoration: none;
    transition: color 0.2s;
}

.sidebar .closebtn:hover {
    color: #EF5350; /* Red on hover for close action */
}


/* --- Sidebar Section Button Styling (Flat Dark) --- */
.sidebar-section button {
    background-color: #00BCD4; /* Cyan Background */
    color: #1A232A; /* Dark Text for contrast */
    border: none; /* No border */
    padding: 8px 12px; /* Adjust padding as needed */
    border-radius: 4px; /* Slightly rounded corners */
    cursor: pointer;
    font-weight: 500; /* Medium weight */
    transition: background-color 0.2s; /* Smooth transition */
    margin-top: 5px; /* Add some space */
    display: inline-block; /* Align properly */
    box-shadow: none; /* No shadow */
    text-shadow: none; /* No text shadow */
    background: #00BCD4; /* Ensure no gradient */
}

.sidebar-section button:hover {
    background-color: #0097A7; /* Darker Cyan on Hover */
    color: #FFFFFF; /* White text on hover */
    box-shadow: none; /* Ensure no shadow on hover */
    transform: none; /* Ensure no scale effect on hover */
    filter: none; /* Ensure no brightness change */
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background-color: #00BCD4; /* Cyan Button */
    color: #1A232A; /* Dark Text */
    padding: 10px 14px;
    border: none; /* No border */
    position: fixed;
    top: 15px;
    left: 20px;
    z-index: 1002;
    border-radius: 4px; /* Slightly rounded */
    transition: background-color 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Slightly stronger shadow */
}

.hamburger-btn:hover {
    background-color: #0097A7; /* Darker Cyan on Hover */
    color: #FFFFFF; /* White text */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: #263238; /* Dark Blue Gray Background */
    border-radius: 4px; /* Rounded corners */
    color: #E0E0E0; /* Light Text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Subtle shadow */
    border: 1px solid #455A64; /* Subtle border */
    font-weight: 500;
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
    border-color: #263238 transparent transparent transparent; /* Match background */
    /* Add border mimic */
    border-top-color: #455A64; /* Match border color */

}
/* Inner triangle to cover the border */
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
    border-color: #263238 transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 24px; /* Slightly smaller */
    height: 24px;
    background-color: rgba(255, 64, 129, 0.8); /* Pink Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 64, 129, 0.7);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-pink-dark 1.2s infinite ease-out; /* Use a different animation name */
}

/* Separate keyframes for pink pulse */
@keyframes pulse-signal-pink-dark {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 64, 129, 0.7);
        opacity: 0.7;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.8);
        box-shadow: 0 0 0 15px rgba(255, 64, 129, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 64, 129, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Adjusted for Dark Theme) */
.low-magnitude {
    background-color: rgba(76, 175, 80, 0.15); /* Subtle Green */
    border-left: 4px solid #66BB6A; /* Lighter Green */
    color: #A5D6A7; /* Light Green Text */
}

.moderate-magnitude {
    background-color: rgba(255, 235, 59, 0.15); /* Subtle Yellow */
    border-left: 4px solid #FFEE58; /* Lighter Yellow */
    color: #FFF59D; /* Light Yellow Text */
}

.high-magnitude {
    background-color: rgba(255, 152, 0, 0.2); /* Subtle Orange */
    border-left: 4px solid #FFB74D; /* Lighter Orange */
    color: #FFCC80; /* Light Orange Text */
}

.very-high-magnitude {
    background-color: rgba(244, 67, 54, 0.2); /* Subtle Red */
    border-left: 4px solid #EF5350; /* Lighter Red */
    color: #EF9A9A; /* Light Red Text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 35, 42, 0.9); /* Semi-transparent Dark Blue Overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: #1F2C34; /* Dark Box */
    padding: 30px 40px;
    border-radius: 4px; /* Rounded corners */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow */
    text-align: center;
    width: 320px;
    color: #E0E0E0; /* Light Text */
    border: 1px solid #37474F; /* Light border */
}

#progress-message {
    margin-bottom: 20px;
    color: #80DEEA; /* Light Cyan message text */
    font-weight: 500;
}

#progress-bar-visual-container {
    width: 100%;
    height: 8px; /* Thinner bar */
    background-color: #37474F; /* Blue Gray Background */
    border-radius: 4px; /* Rounded */
    overflow: hidden;
    margin: 20px 0;
    border: none; /* No border */
}

#progress-bar {
    height: 100%;
    width: 0%;
    background-color: #00BCD4; /* Cyan Progress */
    border-radius: 4px; /* Rounded */
    transition: width 0.3s ease-out;
}

#progress-percentage {
    font-weight: 700;
    color: #00BCD4; /* Cyan Text */
}

/* Fixed Info Divs Positioning & Styling (Flat Dark) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px; /* Slightly narrower */
    height: auto;
    padding: 20px;
    z-index: 10;
    border: 1px solid #37474F; /* Blue Gray border */
    border-radius: 4px; /* Rounded corners */
    background-color: #263238; /* Dark Blue Gray background */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    color: #E0E0E0; /* Light text */
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
    left: 80px; /* Align closer to left edge */
    width: auto; /* Let left/right define width */
    height: 120px; /* Shorter log */
    overflow-y: auto;
    background-color: #1A232A; /* Darker background for log */
    border: 1px solid #37474F;
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #90A4AE; /* Muted Blue-Gray log text */
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-dark-blue 0.5s steps(1) infinite; /* Apply animation */
}

/* Separate keyframes for dark blue highlight */
@keyframes highlight-row-dark-blue {
    0% {
        background-color: rgba(0, 188, 212, 0.2); /* Light Cyan highlight start */
        transform: scale(1.01); /* Slight scale up */
    }
    70% {
        background-color: rgba(0, 188, 212, 0.2); /* Hold highlight */
        transform: scale(1.01);
    }
    100% {
        background-color: transparent; /* Fade back to original/magnitude color */
        transform: scale(1); /* Scale back down */
    }
}

`;

// --- Apply Styles and Cleanup ---

// Add styles to the style element (Cleanup is now handled by loadThemeScript)
styleSheet.textContent = cssStyles; // Modern way to add CSS text

// Append style element to head
document.head.appendChild(styleSheet);

console.log("Dark Blue theme applied."); // Confirmation message

})(); // End of IIFE