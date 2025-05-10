(function() { // Start of IIFE

const themeId = 'dynamic-styles-liquid-metal';

// Dynamic CSS Injection for Earthquake Tracker - Liquid Metal & Iridescence Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Liquid Metal & Iridescence)
const metalDark = '#18181C';      // Dark Charcoal Base
const metalMid = '#282830';       // Mid Gray
const metalLight = '#3A3A44';     // Lighter Gray for containers
const borderDark = '#202024';     // Very Dark Border/Shadow Base
const borderLight = '#505058';    // Subtle Lighter Border
const textPrimary = '#EFEFF1';   // Off-White
const textSecondary = '#C0C0C8'; // Light Gray
const textDim = '#A0A0A8';       // Muted Gray
const iridescentBlue = '#4D8BFF'; // Metallic Blue
const iridescentPurple = '#A050FF';// Metallic Purple
const iridescentGreen = '#00FFAA'; // Metallic Green/Teal
const iridescentGold = '#FFD700';  // Metallic Gold
const tooltipBg = 'rgba(40, 40, 48, 0.96)'; // metalMid transparent
const iconFilter = 'invert(90%) sepia(10%) saturate(150%) hue-rotate(190deg) brightness(105%) contrast(95%)'; // Cool light tint

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
    font-family: 'Exo 2', sans-serif; /* Apply the font */
    background-color: ${metalDark}; /* Dark background */
    /* Optional: Subtle noise or texture */
    /* background-image: url('path/to/noise.png'); */
    font-size: 12px;
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Light text */
    font-weight: 400; /* Regular weight */
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 4px 15px; /* Generous padding */
    text-align: left;
    border-bottom: 1px solid ${borderLight}; /* Subtle border */
}

th {
    background-color: ${metalMid}; /* Slightly lighter dark bg */
    color: ${iridescentBlue}; /* Blue header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${iridescentBlue}; /* Blue border */
    text-shadow: 0 0 4px ${iridescentBlue};
}

td {
    color: ${textSecondary}; /* Light gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${iridescentBlue}, ${iridescentPurple}, ${iridescentGreen});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(77, 139, 255, 0.3); /* Subtle blue glow */
    border-bottom: 1px solid ${borderLight};
    padding-bottom: 12px;
    letter-spacing: 1px;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${metalMid}; /* Dark background */
    border-right: 1px solid ${borderLight}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${metalDark}; /* Main Background */
    border-left: 1px solid ${borderLight}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Liquid Metal) */
.card {
    background: ${metalLight}; /* Lighter Gray bg */
    border: 1px solid ${borderLight}; /* Subtle border */
    border-radius: 4px; /* Slightly rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25), inset 0 0 5px rgba(24, 24, 28, 0.5); /* Shadow + Inner Dark */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textDim}; /* Muted gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Cool light icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${iridescentBlue}, ${iridescentPurple});
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textPrimary}; /* Light header text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Cool light icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${metalMid}; /* Dark bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 9px rgba(0, 0, 0, 0.35); /* Soft shadow */
    border-right: 1px solid ${borderLight};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textDim}; /* Muted gray */
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent; /* Placeholder */
}

.sidebar a:hover {
    color: ${textPrimary}; /* Light text on hover */
    background: linear-gradient(90deg, rgba(77, 139, 255, 0.1), rgba(160, 80, 255, 0.1)); /* Subtle gradient bg */
    border-left: 4px solid ${iridescentBlue}; /* Blue accent line */
}

/* --- Sidebar Section Button Styling (Liquid Metal) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${iridescentBlue}, ${iridescentPurple}); /* Blue to Purple Gradient */
    color: ${textPrimary}; /* Light text */
    border: 1px solid ${borderLight};
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25), 0 0 8px rgba(77, 139, 255, 0.4); /* Shadow + Blue Glow */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${iridescentGreen}, ${iridescentGold}); /* Green to Gold Gradient on Hover */
    color: ${metalDark}; /* Dark text */
    border-color: ${iridescentGreen};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 12px rgba(0, 255, 170, 0.6); /* Shadow + Green Glow */
    transform: translateY(-1px);
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${iridescentBlue}, ${iridescentPurple}); /* Blue to Purple Gradient */
    color: ${textPrimary}; /* Light Text */
    padding: 10px 14px;
    border: 1px solid ${borderLight};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 10px rgba(77, 139, 255, 0.5); /* Shadow + Blue Glow */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${iridescentGreen}, ${iridescentGold}); /* Green to Gold Gradient on Hover */
    color: ${metalDark}; /* Dark text */
    border-color: ${iridescentGreen};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 18px rgba(0, 255, 170, 0.7); /* Shadow + Green Glow */
    transform: translateY(-1px);
    text-shadow: none;
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark transparent bg */
    backdrop-filter: blur(3px); /* Blur effect */
    border-radius: 4px; /* Rounded corners */
    color: ${iridescentGreen}; /* Green text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    border: 1px solid ${iridescentGreen}; /* Green Border */
    font-weight: 500;
    text-shadow: 0 0 4px ${iridescentGreen};
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
    border-top-color: ${iridescentGreen}; /* Match border color */
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
    width: 28px;
    height: 28px;
    background-color: rgba(77, 139, 255, 0.85); /* Blue Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(77, 139, 255, 0.6);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-liquid-metal 1.4s infinite ease-out;
}

/* Separate keyframes for liquid metal pulse */
@keyframes pulse-signal-liquid-metal {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(77, 139, 255, 0.7);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 22px rgba(77, 139, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(77, 139, 255, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Liquid Metal) */
.low-magnitude {
    background-color: rgba(0, 255, 170, 0.08); /* Subtle green */
    border-left: 4px solid ${iridescentGreen}; /* Green */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(77, 139, 255, 0.08); /* Subtle blue */
    border-left: 4px solid ${iridescentBlue}; /* Blue */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(160, 80, 255, 0.1); /* Subtle purple */
    border-left: 4px solid ${iridescentPurple}; /* Purple */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 215, 0, 0.12); /* Subtle gold */
    border-left: 4px solid ${iridescentGold}; /* Gold */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(24, 24, 28, 0.94); /* metalDark transparent */
    backdrop-filter: blur(4px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${metalLight}; /* Lighter Gray bg */
    padding: 30px 40px;
    border-radius: 4px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 18px rgba(77, 139, 255, 0.3); /* Shadow + Blue Glow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Light Text */
    border: 1px solid ${borderLight}; /* Muted Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${iridescentBlue}; /* Blue message text */
    font-weight: 500;
    text-shadow: 0 0 4px ${iridescentBlue};
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slim bar */
    background-color: ${metalMid}; /* Darker Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderLight};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${iridescentBlue}, ${iridescentPurple}, ${iridescentGreen}, ${iridescentGold}); /* Full Iridescent Gradient */
    background-size: 300% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${iridescentPurple}; /* Purple glow */
    animation: animate-gradient 4s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${iridescentPurple}; /* Purple Text */
    text-shadow: 0 0 5px ${iridescentPurple};
}

/* Fixed Info Divs Positioning & Styling (Liquid Metal) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderLight}; /* Subtle Border */
    border-radius: 4px; /* Rounded corners */
    background-color: rgba(58, 58, 68, 0.95); /* metalLight transparent */
    backdrop-filter: blur(3px); /* Subtle blur */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    color: ${textPrimary}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${iridescentBlue};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 4px solid ${iridescentPurple};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto; /* Adjust width as needed */
    height: 120px;
    overflow-y: auto;
    background-color: rgba(24, 24, 28, 0.94); /* metalDark transparent */
    border: 1px solid ${borderLight}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    color: ${textDim}; /* Muted gray log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-liquid-metal 0.5s steps(1) infinite;
}

/* Separate keyframes for liquid metal highlight (shifting gradient border/glow) */
@keyframes highlight-row-liquid-metal {
    0% {
        outline: 2px solid ${iridescentBlue};
        outline-offset: -2px;
        box-shadow: inset 0 0 10px rgba(77, 139, 255, 0.3);
        transform: scale(1.005);
    }
    33% {
        outline-color: ${iridescentPurple};
        box-shadow: inset 0 0 10px rgba(160, 80, 255, 0.3);
        transform: scale(1.005);
    }
    66% {
        outline-color: ${iridescentGreen};
        box-shadow: inset 0 0 10px rgba(0, 255, 170, 0.3);
        transform: scale(1.005);
    }
    100% {
        outline: 2px solid transparent;
        outline-offset: 0px;
        box-shadow: none;
        transform: scale(1);
    }
}

`;

// --- Apply Styles and Cleanup ---

// Add styles to the style element (Cleanup is now handled by loadThemeScript)
styleSheet.textContent = cssStyles; // Modern way to add CSS text

// Append style element to head
document.head.appendChild(styleSheet);

console.log("Liquid Metal (Dark) theme applied."); // Confirmation message

})(); // End of IIFE