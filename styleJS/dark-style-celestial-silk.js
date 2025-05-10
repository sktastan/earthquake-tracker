(function() { // Start of IIFE

const themeId = 'dynamic-styles-celestial-silk';

// Dynamic CSS Injection for Earthquake Tracker - Celestial Silk & Stardust Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Celestial Silk & Stardust)
const silkDark = '#101020';      // Deep Midnight Blue/Purple
const silkMid = '#202038';       // Muted Purple/Blue
const silkLight = '#303050';     // Lighter Muted Purple/Blue
const borderSubtle = '#404060';   // Grayish Purple Border
const textPrimary = '#F0F0F8';   // Pale Lavender/White
const textSecondary = '#C0C0D8'; // Light Gray/Lavender
const textDim = '#A0A0B8';       // Muted Lavender/Gray
const stardustSilver = '#E0E0E0'; // Pale Silver/Gray
const stardustGold = '#FFECB3';  // Pale Gold
const stardustPink = '#FFCDD2';  // Pale Pink
const stardustCyan = '#B2EBF2';  // Pale Cyan
const tooltipBg = 'rgba(32, 32, 56, 0.96)'; // silkMid transparent
const iconFilter = 'invert(95%) sepia(5%) saturate(100%) hue-rotate(220deg) brightness(105%) contrast(100%)'; // Light, slightly cool/purple tint

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap"); /* Soft, Rounded Sans-Serif */

/* Body Styles */
body {
    font-family: 'Quicksand', sans-serif; /* Apply the font */
    background-color: ${silkDark}; /* Dark background */
    /* Optional: Subtle gradient or texture */
    /* background-image: radial-gradient(circle at top left, rgba(48, 48, 80, 0.1), ${silkDark} 80%); */
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
    border-bottom: 1px solid ${borderSubtle}; /* Subtle border */
}

th {
    background-color: ${silkMid}; /* Slightly lighter dark bg */
    color: ${stardustCyan}; /* Pale Cyan header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${borderSubtle}; /* Muted border */
    text-shadow: 0 0 3px rgba(178, 235, 242, 0.3);
}

td {
    color: ${textSecondary}; /* Light gray/lavender text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${stardustCyan}, ${stardustPink});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(178, 235, 242, 0.2); /* Subtle cyan glow */
    border-bottom: 1px dashed ${borderSubtle};
    padding-bottom: 12px;
    letter-spacing: 1px;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${silkMid}; /* Dark background */
    border-right: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${silkDark}; /* Main Background */
    border-left: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Celestial Silk) */
.card {
    background: ${silkLight}; /* Lighter Muted Purple/Blue bg */
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 6px; /* Softly rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 0 8px rgba(16, 16, 32, 0.4); /* Shadow + Inner Dark */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textDim}; /* Muted lavender/gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Light, cool icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${stardustSilver}, ${stardustGold});
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textPrimary}; /* Light header text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Light, cool icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${silkMid}; /* Dark bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.3); /* Soft shadow */
    border-right: 1px solid ${borderSubtle};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textDim}; /* Muted lavender/gray */
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent; /* Placeholder */
}

.sidebar a:hover {
    color: ${textPrimary}; /* Light text on hover */
    background: linear-gradient(90deg, rgba(224, 224, 224, 0.08), rgba(255, 236, 179, 0.08)); /* Subtle gradient bg */
    border-left: 4px solid ${stardustSilver}; /* Silver accent line */
}

/* --- Sidebar Section Button Styling (Celestial Silk) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${stardustSilver}, ${stardustGold}); /* Silver to Gold Gradient */
    color: ${silkDark}; /* Dark text */
    border: 1px solid ${borderSubtle};
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 0 8px rgba(224, 224, 224, 0.3); /* Shadow + Silver Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${stardustPink}, ${stardustCyan}); /* Pink to Cyan Gradient on Hover */
    color: ${silkDark};
    border-color: ${stardustPink};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25), 0 0 12px rgba(255, 205, 210, 0.5); /* Shadow + Pink Glow */
    transform: translateY(-1px);
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${stardustSilver}, ${stardustGold}); /* Silver to Gold Gradient */
    color: ${silkDark}; /* Dark Text */
    padding: 10px 14px;
    border: 1px solid ${borderSubtle};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25), 0 0 10px rgba(224, 224, 224, 0.4); /* Shadow + Silver Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${stardustPink}, ${stardustCyan}); /* Pink to Cyan Gradient on Hover */
    color: ${silkDark};
    border-color: ${stardustPink};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3), 0 0 18px rgba(255, 205, 210, 0.6); /* Shadow + Pink Glow */
    transform: translateY(-1px);
    text-shadow: none;
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark transparent bg */
    backdrop-filter: blur(4px); /* Blur effect */
    border-radius: 5px; /* Rounded corners */
    color: ${stardustGold}; /* Pale Gold text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid ${stardustGold}; /* Pale Gold Border */
    font-weight: 500;
    text-shadow: 0 0 4px rgba(255, 236, 179, 0.5);
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
    border-top-color: ${stardustGold}; /* Match border color */
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
    background-color: rgba(224, 224, 224, 0.8); /* Silver Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(224, 224, 224, 0.5);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-celestial-silk 1.5s infinite ease-out;
}

/* Separate keyframes for celestial silk pulse */
@keyframes pulse-signal-celestial-silk {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 6px 4px rgba(224, 224, 224, 0.6);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(2.0);
        box-shadow: 0 0 18px 25px rgba(224, 224, 224, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 6px 4px rgba(224, 224, 224, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Celestial Silk) */
.low-magnitude {
    background-color: rgba(178, 235, 242, 0.08); /* Subtle cyan */
    border-left: 4px solid ${stardustCyan}; /* Cyan */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(255, 236, 179, 0.1); /* Subtle gold */
    border-left: 4px solid ${stardustGold}; /* Gold */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(224, 224, 224, 0.12); /* Subtle silver */
    border-left: 4px solid ${stardustSilver}; /* Silver */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 205, 210, 0.15); /* Subtle pink */
    border-left: 4px solid ${stardustPink}; /* Pink */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(16, 16, 32, 0.94); /* silkDark transparent */
    backdrop-filter: blur(5px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${silkLight}; /* Lighter Muted Purple/Blue bg */
    padding: 30px 40px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3), 0 0 18px rgba(224, 224, 224, 0.2); /* Shadow + Silver Glow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Light Text */
    border: 1px solid ${borderSubtle}; /* Muted Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${stardustSilver}; /* Silver message text */
    font-weight: 500;
    text-shadow: 0 0 4px rgba(224, 224, 224, 0.4);
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slim bar */
    background-color: ${silkMid}; /* Darker Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderSubtle};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${stardustSilver}, ${stardustGold}, ${stardustPink}, ${stardustCyan}); /* Full Stardust Gradient */
    background-size: 300% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${stardustGold}; /* Gold glow */
    animation: animate-gradient-stardust 6s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient-stardust {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${stardustGold}; /* Gold Text */
    text-shadow: 0 0 5px rgba(255, 236, 179, 0.6);
}

/* Fixed Info Divs Positioning & Styling (Celestial Silk) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderSubtle}; /* Subtle Border */
    border-radius: 6px; /* Rounded corners */
    background-color: rgba(48, 48, 80, 0.95); /* silkLight transparent */
    backdrop-filter: blur(4px); /* Subtle blur */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    color: ${textPrimary}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${stardustSilver};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 4px solid ${stardustGold};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto; /* Adjust width as needed */
    height: 120px;
    overflow-y: auto;
    background-color: rgba(16, 16, 32, 0.94); /* silkDark transparent */
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: ${textDim}; /* Muted lavender/gray log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-celestial-silk 3.0s ease-out forwards;
}

/* Separate keyframes for celestial silk highlight (soft shimmer/fade) */
@keyframes highlight-row-celestial-silk {
    0% {
        background-color: rgba(224, 224, 224, 0.1); /* Silver start */
        box-shadow: inset 0 0 10px rgba(224, 224, 224, 0.2);
        transform: scale(1.005);
    }
    50% {
        background-color: rgba(255, 236, 179, 0.1); /* Gold mid */
        box-shadow: inset 0 0 10px rgba(255, 236, 179, 0.3);
        transform: scale(1.005);
    }
    100% {
        background-color: transparent; /* Fade back */
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

console.log("Celestial Silk & Stardust (Dark) theme applied."); // Confirmation message

})(); // End of IIFE