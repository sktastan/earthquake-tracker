(function() { // Start of IIFE

const themeId = 'dynamic-styles-dark-midnight';

// Dynamic CSS Injection for Earthquake Tracker - Midnight Bloom Theme
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"); /* Clean sans-serif */

/* Body Styles */
body {
    font-family: 'Inter', sans-serif; /* Apply the font */
    background-color: #1E1D2F; /* Deep Dark Blue/Purple */
    font-size: 12px;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: #D9E0EE; /* Light Gray/Lavender Text */
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
    border-bottom: 1px solid #302D41; /* Slightly Lighter Border */
}

th {
    background-color: #27293D; /* Darker Element Background */
    color: #89DDFF; /* Soft Teal Accent */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: #4A4F69; /* Muted Purple/Gray Border */
}

td {
    color: #C3BAC6; /* Lighter text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: #ABE9B3; /* Soft Green */
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.4em;
    font-weight: 600; /* Semi-bold */
    border-bottom: 1px solid #4A4F69; /* Muted Purple/Gray Border */
    padding-bottom: 10px;
     background-color: #27293D; /* Darker Element Background */
}
/* --- End Table Heading Style --- */

/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: #232136; /* Slightly different dark shade */
    border-right: 1px solid #4A4F69; /* Muted Purple/Gray Border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: #1E1D2F; /* Main Background */
    border-left: 1px solid #302D41; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Midnight Bloom Dark) */
.card {
    background: #27293D; /* Darker Element Background */
    border: 1px solid #4A4F69; /* Muted Purple/Gray Border */
    border-radius: 6px; /* Slightly rounded corners */
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    color: #D9E0EE;
}

/* Info Div Alignment (Keep existing flex alignment) */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.5;
    color: #B8C0E0; /* Slightly dimmer text */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    /* Adjust icon color for dark theme */
    filter: invert(90%) sepia(10%) saturate(150%) hue-rotate(180deg) brightness(100%) contrast(90%);
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid #89DDFF; /* Soft Teal underline */
    padding-bottom: 8px;
    font-weight: 600;
    color: #ABE9B3; /* Soft Green Header Text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: invert(90%) sepia(10%) saturate(150%) hue-rotate(180deg) brightness(100%) contrast(90%);
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: #27293D; /* Darker Element Background */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3); /* Slightly stronger shadow */
    border-right: 1px solid #4A4F69;
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: #B8C0E0; /* Dimmer Text */
    display: block;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 500;
    border-radius: 4px; /* Rounded hover effect */
    margin: 2px 10px; /* Add margin for spacing */
}

.sidebar a:hover {
    color: #1E1D2F; /* Dark text on hover */
    background-color: #89DDFF; /* Soft Teal Background on Hover */
}

/* --- Sidebar Section Button Styling (Midnight Bloom Dark) --- */
.sidebar-section button {
    background: linear-gradient(145deg, #89DDFF, #6AB5FF); /* Teal to Blue Gradient */
    color: #1E1D2F; /* Dark Text */
    border: none;
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Inter', sans-serif; /* Ensure button uses the theme font */
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    text-shadow: none;
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, #FCA7EA, #E897D8); /* Magenta/Pink Gradient on Hover */
    color: #1E1D2F;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, #89DDFF, #6AB5FF); /* Teal to Blue Gradient */
    color: #1E1D2F; /* Dark Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 15px;
    left: 20px;
    z-index: 1002;
    border-radius: 6px; /* Slightly rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, #FCA7EA, #E897D8); /* Magenta/Pink Gradient on Hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: rgba(39, 41, 61, 0.95); /* Dark Background */
    backdrop-filter: blur(2px);
    border-radius: 4px; /* Rounded corners */
    color: #D9E0EE; /* Light Text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid #4A4F69; /* Muted Border */
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
    border-color: transparent;
    border-top-color: #4A4F69; /* Match border color */
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
    border-color: rgba(39, 41, 61, 0.95) transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 26px;
    height: 26px;
    background-color: rgba(171, 233, 179, 0.8); /* Soft Green Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(171, 233, 179, 0.6);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-green-midnight 1.3s infinite ease-out;
}

/* Separate keyframes for green pulse */
@keyframes pulse-signal-green-midnight {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(171, 233, 179, 0.6);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.7);
        box-shadow: 0 0 0 18px rgba(171, 233, 179, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(171, 233, 179, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Midnight Bloom Theme) */
.low-magnitude {
    background-color: rgba(171, 233, 179, 0.1); /* Soft Green */
    border-left: 4px solid #ABE9B3;
    color: #D4F0D8;
}

.moderate-magnitude {
    background-color: rgba(250, 227, 176, 0.1); /* Soft Yellow */
    border-left: 4px solid #FAE3B0;
    color: #FBF0D8;
}

.high-magnitude {
    background-color: rgba(252, 167, 234, 0.1); /* Soft Magenta */
    border-left: 4px solid #FCA7EA;
    color: #FDE0F6;
}

.very-high-magnitude {
    background-color: rgba(243, 139, 168, 0.15); /* Soft Red/Coral */
    border-left: 4px solid #F38BA8;
    color: #FADAE1;
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 29, 47, 0.9); /* Semi-transparent Dark Background */
    backdrop-filter: blur(3px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: #27293D; /* Dark Element Background */
    padding: 30px 40px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 320px;
    color: #D9E0EE; /* Light Text */
    border: 1px solid #4A4F69; /* Muted Border */
}

#progress-message {
    margin-bottom: 20px;
    color: #ABE9B3; /* Soft Green message text */
    font-weight: 500;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slightly thicker bar */
    background-color: #4A4F69; /* Muted Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 20px 0;
    border: none;
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #89DDFF, #FCA7EA); /* Teal to Magenta Gradient */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: none;
}

#progress-percentage {
    font-weight: 700;
    color: #89DDFF; /* Soft Teal Text */
}

/* Fixed Info Divs Positioning & Styling (Midnight Bloom Dark) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 20px;
    z-index: 10;
    border: 1px solid #4A4F69; /* Muted Border */
    border-radius: 6px; /* Rounded corners */
    background-color: rgba(39, 41, 61, 0.9); /* Dark Background */
    backdrop-filter: blur(2px); /* Subtle blur */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: #D9E0EE; /* Light text */
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
    background-color: rgba(30, 29, 47, 0.9); /* Darker background for log */
    border: 1px solid #302D41; /* Subtle border */
    border-radius: 6px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: #8F98B8; /* Dimmer log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-midnight 0.5s steps(1) infinite;
}

/* Separate keyframes for midnight highlight */
@keyframes highlight-row-midnight {
    0% {
        background-color: rgba(137, 221, 255, 0.15); /* Soft Teal highlight */
        transform: scale(1.01);
    }
    70% {
        background-color: rgba(137, 221, 255, 0.15); /* Hold highlight */
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

console.log("Dark Midnight theme applied."); // Confirmation message

})(); // End of IIFE