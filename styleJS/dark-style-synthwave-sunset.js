(function() { // Start of IIFE

const themeId = 'dynamic-styles-synthwave-sunset';

// Dynamic CSS Injection for Earthquake Tracker - Synthwave Sunset Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Approximate Synthwave)
const darkBg = '#1A1A2E'; // Deep Indigo/Navy
const midBg = '#1F283E'; // Slightly Lighter Navy
const containerBg = '#27294D'; // Muted Purple/Blue
const border = '#4A4E69'; // Grayish Purple
const textLight = '#E0E0E0'; // Off-white/Light Gray
const textDim = '#A0A0C0'; // Lavender Gray
const accentPink = '#FF6AD5';
const accentOrange = '#FFAB76';
const accentCyan = '#89DDFF';
const accentYellow = '#FFDA63';
const accentPurple = '#B48EAD'; // Re-using from Nord for a softer purple if needed

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"); /* Modern & Clean */

/* Body Styles */
body {
    font-family: 'Poppins', sans-serif; /* Apply the font */
    background-color: ${darkBg}; /* Deep dark background */
    /* Optional: Subtle grid or scanlines */
    /* background-image: linear-gradient(rgba(255, 106, 213, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(137, 221, 255, 0.05) 1px, transparent 1px); */
    /* background-size: 40px 40px; */
    font-size: 12px;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textLight}; /* Light text */
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
    border-bottom: 1px solid ${border}; /* Muted border */
}

th {
    background-color: ${midBg}; /* Slightly lighter dark bg */
    color: ${accentPink}; /* Pink header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${accentPink}; /* Pink border */
    text-shadow: 0 0 3px rgba(255, 106, 213, 0.5);
}

td {
    color: ${textDim}; /* Dimmer text for data */
}

/* --- NEW: Style for Table Heading --- */
.tableContainer h3.table-heading {
     color: ${accentOrange};
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.4em;
    text-shadow: 0 0 5px ${accentOrange};
    border-bottom: 1px dashed ${border}; /* Use dashed for synthwave */
    padding-bottom: 10px; /* Consistent padding */
     background-color: ${midBg}; /* Slightly lighter dark bg */
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${midBg}; /* Dark background */
    border-right: 1px solid ${border}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${darkBg}; /* Main Background */
    border-left: 1px solid ${border}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Synthwave Sunset) */
.card {
    background: ${containerBg}; /* Muted Purple/Blue bg */
    border: 1px solid ${border};
    border-left: 4px solid ${accentPink}; /* Pink accent border */
    border-radius: 4px; /* Slightly rounded corners */
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Soft shadow */
    color: ${textLight};
}

/* Info Div Alignment (Keep existing flex alignment) */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.5;
    color: ${textDim}; /* Dimmer text */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    /* Cyan tint for icons */
    filter: invert(80%) sepia(100%) saturate(5000%) hue-rotate(180deg) brightness(1.2) contrast(90%);
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid ${accentOrange}; /* Orange underline */
    padding-bottom: 8px;
    font-weight: 700; /* Bold */
    color: ${accentCyan}; /* Cyan header text */
    text-shadow: 0 0 4px ${accentCyan};
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: invert(80%) sepia(100%) saturate(5000%) hue-rotate(180deg) brightness(1.2) contrast(90%);
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Muted Purple/Blue bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3); /* Soft shadow */
    border-right: 1px solid ${border};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textDim}; /* Dimmer text */
    display: block;
    transition: background-color 0.2s, color 0.2s, text-shadow 0.2s;
    font-weight: 600;
    border-radius: 4px;
    margin: 2px 10px;
}

.sidebar a:hover {
    color: ${darkBg}; /* Dark text on hover */
    background: linear-gradient(90deg, ${accentPink}, ${accentOrange}); /* Pink/Orange Gradient */
    text-shadow: none;
}

/* Close button inside sidebar */
.sidebar .closebtn {
    position: absolute;
    top: 5px;
    font-size: 30px; /* Match other themes */
    margin-left: 50px; /* Keep consistent */
    color: ${textDim}; /* Lavender Gray */
    text-decoration: none;
    transition: color 0.2s, text-shadow 0.2s;
}

.sidebar .closebtn:hover {
    color: ${accentPink}; /* Pink on hover */
    text-shadow: 0 0 5px ${accentPink}; /* Pink glow */
}
/* --- Sidebar Section Button Styling (Synthwave Sunset) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${accentPink}, ${accentPurple}); /* Pink to Purple Gradient */
    color: ${textLight};
    border: none;
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 0 5px rgba(255, 106, 213, 0.3); /* Shadow + Subtle Glow */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${accentOrange}, ${accentYellow}); /* Orange to Yellow Gradient on Hover */
    color: ${darkBg};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 171, 118, 0.5);
    transform: translateY(-1px);
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentPink}, ${accentOrange}); /* Pink to Orange Gradient */
    color: ${darkBg}; /* Dark Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 15px;
    left: 20px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 106, 213, 0.4);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentCyan}, ${accentPink}); /* Cyan to Pink Gradient on Hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 15px rgba(137, 221, 255, 0.6);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: rgba(31, 40, 62, 0.9); /* midBg transparent */
    backdrop-filter: blur(2px);
    border-radius: 4px; /* Rounded corners */
    color: ${accentCyan}; /* Cyan text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid ${accentCyan}; /* Cyan Border */
    font-weight: 600;
    text-shadow: 0 0 3px ${accentCyan};
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
    border-top-color: ${accentCyan}; /* Match border color */
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
    border-color: rgba(31, 40, 62, 0.9) transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 26px;
    height: 26px;
    background-color: rgba(255, 171, 118, 0.8); /* Orange Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 171, 118, 0.6);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-orange-synth 1.3s infinite ease-out;
}

/* Separate keyframes for orange pulse */
@keyframes pulse-signal-orange-synth {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 3px 1px rgba(255, 171, 118, 0.7);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.8);
        box-shadow: 0 0 10px 18px rgba(255, 171, 118, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 3px 1px rgba(255, 171, 118, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Synthwave Sunset) */
.low-magnitude {
    background-color: rgba(137, 221, 255, 0.1); /* Cyan bg */
    border-left: 4px solid ${accentCyan};
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(255, 218, 99, 0.1); /* Yellow bg */
    border-left: 4px solid ${accentYellow};
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(255, 171, 118, 0.15); /* Orange bg */
    border-left: 4px solid ${accentOrange};
    color: ${textLight};
}

.very-high-magnitude {
    background-color: rgba(255, 106, 213, 0.15); /* Pink bg */
    border-left: 4px solid ${accentPink};
    color: ${textLight};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 46, 0.9); /* darkBg transparent */
    backdrop-filter: blur(3px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${containerBg}; /* Muted Purple/Blue bg */
    padding: 30px 40px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 106, 213, 0.2);
    text-align: center;
    width: 320px;
    color: ${textLight}; /* Light Text */
    border: 1px solid ${border}; /* Muted Border */
}

#progress-message {
    margin-bottom: 20px;
    color: ${accentOrange}; /* Orange message text */
    font-weight: 600;
    text-shadow: 0 0 3px ${accentOrange};
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px;
    background-color: ${midBg}; /* Muted Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 20px 0;
    border: 1px solid ${border};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentPink}, ${accentOrange}); /* Pink to Orange Gradient */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 5px ${accentPink};
}

#progress-percentage {
    font-weight: 700;
    color: ${accentPink}; /* Pink Text */
    text-shadow: 0 0 4px ${accentPink};
}

/* Fixed Info Divs Positioning & Styling (Synthwave Sunset) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 20px;
    z-index: 10;
    border: 1px solid ${border}; /* Muted Border */
    border-radius: 4px; /* Rounded corners */
    background-color: rgba(39, 41, 77, 0.9); /* containerBg transparent */
    backdrop-filter: blur(2px); /* Subtle blur */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: ${textLight}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentCyan};
}

.weatherInfo {
    top: 400px; /* Adjust spacing */
    border-left: 4px solid ${accentOrange};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 120px;
    overflow-y: auto;
    background-color: rgba(26, 26, 46, 0.9); /* darkBg transparent */
    border: 1px solid ${border}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: ${textDim}; /* Dimmer log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-synthwave 0.5s steps(1) infinite;
}

/* Separate keyframes for synthwave highlight */
@keyframes highlight-row-synthwave {
    0% {
        background: linear-gradient(90deg, rgba(255, 106, 213, 0.1), rgba(255, 171, 118, 0.1));
        transform: scale(1.01);
        box-shadow: inset 0 0 8px rgba(255, 106, 213, 0.3);
    }
    70% {
        background: linear-gradient(90deg, rgba(255, 106, 213, 0.1), rgba(255, 171, 118, 0.7));
        transform: scale(1.01);
        box-shadow: inset 0 0 8px rgba(255, 106, 213, 0.3);
    }
    100% {
        background-color: transparent; /* Fade back */
        transform: scale(1);
        box-shadow: none;
    }
}

`;

// --- Apply Styles and Cleanup ---

// Add styles to the style element (Cleanup is now handled by loadThemeScript)
styleSheet.textContent = cssStyles; // Modern way to add CSS text

// Append style element to head
document.head.appendChild(styleSheet);

console.log("Synthwave Sunset (Dark) theme applied."); // Confirmation message

})(); // End of IIFE