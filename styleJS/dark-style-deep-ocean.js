(function() { // Start of IIFE

const themeId = 'dynamic-styles-deep-ocean';

// Dynamic CSS Injection for Earthquake Tracker - Deep Ocean Bioluminescence Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Deep Ocean Bioluminescence)
const deepOceanBg = '#02081a';    // Very dark blue/black
const midOceanBg = '#0a1931';     // Slightly lighter dark blue
const containerBg = '#182a45';    // Muted deep blue/gray
const border = '#2a3b59';        // Darker, subtle blue/gray
const textLight = '#e0f2f7';     // Very light, almost white with a hint of blue
const textDim = '#88a0b8';        // Muted cyan/gray
const glowCyan = '#00f7ff';       // Bright, electric cyan
const glowGreen = '#39ff14';      // Bioluminescent green
const glowPurple = '#9d72ff';     // Deep purple accent
const glowPink = '#f72585';       // Subtle pink/magenta accent (used sparingly)

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap"); /* Tech/Futuristic Font */

/* Body Styles */
body {
    font-family: 'Orbitron', sans-serif; /* Apply the font */
    background-color: ${deepOceanBg}; /* Deep dark background */
    /* Optional: Subtle underwater particles or depth effect */
    /* background-image: radial-gradient(circle at center, rgba(136, 160, 184, 0.03) 0%, transparent 70%); */
    font-size: 12px; /* Orbitron can be small */
    line-height: 1.5;
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
    padding: 4px 14px; /* Slightly adjusted padding */
    text-align: left;
    border-bottom: 1px solid ${border}; /* Subtle border */
}

th {
    background-color: ${midOceanBg}; /* Slightly lighter dark bg */
    color: ${glowCyan}; /* Cyan header text */
    font-weight: 500; /* Medium weight */
    border-bottom-width: 2px;
    border-bottom-color: ${glowCyan}; /* Cyan border */
    text-shadow: 0 0 4px ${glowCyan};
}

td {
    color: ${textDim}; /* Dimmer text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${glowGreen};
    text-align: center;
    margin-bottom: 15px;
    font-size: 1.3em; /* Adjusted size */
    text-shadow: 0 0 6px ${glowGreen};
    border-bottom: 1px dashed ${border};
    padding-bottom: 10px;
    background-color: ${midOceanBg}; /* Slightly lighter dark bg */
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${midOceanBg}; /* Dark background */
    border-right: 1px solid ${border}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${deepOceanBg}; /* Main Background */
    border-left: 1px solid ${border}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Deep Ocean) */
.card {
    background: ${containerBg}; /* Muted deep blue bg */
    border: 1px solid ${border};
    border-left: 4px solid ${glowGreen}; /* Green accent border */
    border-radius: 3px; /* Sharper corners */
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(10, 25, 49, 0.5); /* Inner shadow */
    color: ${textLight};
}

/* Info Div Alignment (Keep existing flex alignment) */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.6;
    color: ${textDim}; /* Dimmer text */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    /* Cyan tint for icons */
    filter: invert(90%) sepia(100%) saturate(6000%) hue-rotate(180deg) brightness(1.3) contrast(95%);
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid ${glowGreen}; /* Green underline */
    padding-bottom: 8px;
    font-weight: 500; /* Medium */
    color: ${glowCyan}; /* Cyan header text */
    text-shadow: 0 0 5px ${glowCyan};
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: invert(90%) sepia(100%) saturate(6000%) hue-rotate(180deg) brightness(1.3) contrast(95%);
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Muted deep blue bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.4); /* Stronger shadow */
    border-right: 1px solid ${border};
    border-radius: 0;
}

.sidebar a {
    padding: 11px 22px;
    text-decoration: none;
    color: ${textDim}; /* Dimmer text */
    display: block;
    transition: background-color 0.2s, color 0.2s, text-shadow 0.2s;
    font-weight: 500;
    border-radius: 3px;
    margin: 2px 10px;
}

.sidebar a:hover {
    color: ${deepOceanBg}; /* Dark text on hover */
    background: linear-gradient(90deg, ${glowCyan}, ${glowGreen}); /* Cyan/Green Gradient */
    text-shadow: none;
}

/* --- Sidebar Section Button Styling (Deep Ocean) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${glowCyan}, ${glowPurple}); /* Cyan to Purple Gradient */
    color: ${deepOceanBg};
    border: 1px solid ${glowCyan};
    padding: 7px 12px;
    border-radius: 3px; /* Sharper corners */
    cursor: pointer;
    font-family: 'Orbitron', sans-serif;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 247, 255, 0.4); /* Shadow + Cyan Glow */
    text-shadow: none;
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${glowGreen}, ${glowCyan}); /* Green to Cyan Gradient on Hover */
    color: ${deepOceanBg};
    border-color: ${glowGreen};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4), 0 0 12px rgba(57, 255, 20, 0.6); /* Shadow + Green Glow */
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${glowCyan}, ${glowGreen}); /* Cyan to Green Gradient */
    color: ${deepOceanBg}; /* Dark Text */
    padding: 9px 13px;
    border: 1px solid ${glowCyan};
    position: fixed;
    top: 15px;
    left: 20px;
    z-index: 1002;
    border-radius: 4px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 247, 255, 0.5);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${glowPurple}, ${glowPink}); /* Purple to Pink Gradient on Hover */
    border-color: ${glowPurple};
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5), 0 0 18px rgba(157, 114, 255, 0.7);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: rgba(10, 25, 49, 0.92); /* midOceanBg transparent */
    backdrop-filter: blur(3px);
    border-radius: 3px; /* Sharper corners */
    color: ${glowGreen}; /* Green text */
    padding: 7px 11px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    border: 1px solid ${glowGreen}; /* Green Border */
    font-weight: 500;
    text-shadow: 0 0 4px ${glowGreen};
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
    border-top-color: ${glowGreen}; /* Match border color */
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
    border-color: rgba(10, 25, 49, 0.92) transparent transparent transparent; /* Match background */
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: rgba(0, 247, 255, 0.85); /* Cyan Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(0, 247, 255, 0.6);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-cyan-deep 1.4s infinite ease-out;
}

/* Separate keyframes for cyan pulse */
@keyframes pulse-signal-cyan-deep {
    0% {
        transform: translate(-50%, -50%) scale(0.85);
        box-shadow: 0 0 4px 2px rgba(0, 247, 255, 0.7);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 12px 20px rgba(0, 247, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.85);
        box-shadow: 0 0 4px 2px rgba(0, 247, 255, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Deep Ocean) */
.low-magnitude {
    background-color: rgba(57, 255, 20, 0.08); /* Green bg */
    border-left: 4px solid ${glowGreen};
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(0, 247, 255, 0.08); /* Cyan bg */
    border-left: 4px solid ${glowCyan};
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(157, 114, 255, 0.12); /* Purple bg */
    border-left: 4px solid ${glowPurple};
    color: ${textLight};
}

.very-high-magnitude {
    background-color: rgba(247, 37, 133, 0.15); /* Pink bg */
    border-left: 4px solid ${glowPink};
    color: ${textLight};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(2, 8, 26, 0.92); /* deepOceanBg transparent */
    backdrop-filter: blur(4px); /* More blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${containerBg}; /* Muted deep blue bg */
    padding: 30px 40px;
    border-radius: 4px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 247, 255, 0.3);
    text-align: center;
    width: 330px;
    color: ${textLight}; /* Light Text */
    border: 1px solid ${border}; /* Muted Border */
}

#progress-message {
    margin-bottom: 20px;
    color: ${glowGreen}; /* Green message text */
    font-weight: 500;
    text-shadow: 0 0 5px ${glowGreen};
}

#progress-bar-visual-container {
    width: 100%;
    height: 12px; /* Slightly thicker */
    background-color: ${midOceanBg}; /* Muted Background */
    border-radius: 6px; /* Rounded */
    overflow: hidden;
    margin: 20px 0;
    border: 1px solid ${border};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${glowCyan}, ${glowGreen}); /* Cyan to Green Gradient */
    border-radius: 6px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${glowCyan};
}

#progress-percentage {
    font-weight: 700;
    color: ${glowCyan}; /* Cyan Text */
    text-shadow: 0 0 6px ${glowCyan};
}

/* Fixed Info Divs Positioning & Styling (Deep Ocean) */
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
    background-color: rgba(24, 42, 69, 0.92); /* containerBg transparent */
    backdrop-filter: blur(3px); /* Subtle blur */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    color: ${textLight}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${glowCyan};
}

.weatherInfo {
    top: 400px; /* Adjust spacing */
    border-left: 4px solid ${glowGreen};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 120px;
    overflow-y: auto;
    background-color: rgba(2, 8, 26, 0.9); /* deepOceanBg transparent */
    border: 1px solid ${border}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    color: ${textDim}; /* Dimmer log text */
    line-height: 1.6;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-deep-ocean 0.5s steps(1) infinite;
}

/* Separate keyframes for deep ocean highlight - a slow wave */
@keyframes highlight-row-deep-ocean {
    0% {
        background: linear-gradient(90deg, rgba(0, 247, 255, 0.05), rgba(57, 255, 20, 0.05), rgba(0, 247, 255, 0.05));
        background-size: 200% 100%;
        background-position: 100% 0;
        transform: scale(1.01);
        box-shadow: inset 0 0 10px rgba(0, 247, 255, 0.2);
    }
    50% {
        background-position: 0 0; /* Wave effect */
        transform: scale(1.01);
        box-shadow: inset 0 0 10px rgba(57, 255, 20, 0.7); /* Shift glow color */
    }
    100% {
        background-color: transparent; /* Fade back */
        background-position: -100% 0;
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

console.log("Deep Ocean (Dark) theme applied."); // Confirmation message

})(); // End of IIFE