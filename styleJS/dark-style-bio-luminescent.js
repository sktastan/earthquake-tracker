(function() { // Start of IIFE

const themeId = 'dynamic-styles-bio-luminescent';

// Dynamic CSS Injection for Earthquake Tracker - Bio-Luminescent Flora Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Bio-Luminescent Flora)
const forestFloorDark = '#101810'; // Very dark green/black
const forestFloorMid = '#182818';  // Dark green/brown
const forestFloorLight = '#283828';// Muted green/gray for containers
const borderSubtle = '#384838';   // Muted green border
const textPrimary = '#E0F0E0';   // Light green/white
const textSecondary = '#B0D0B0'; // Soft green
const textDim = '#80A080';       // Muted green
const bioLime = '#90EE90';      // Light Green / Lime
const bioTeal = '#40E0D0';      // Turquoise / Teal
const bioPurple = '#C8A2C8';    // Lilac / Soft Purple
const bioPink = '#FFB6C1';      // Light Pink (for high magnitude)
const tooltipBg = 'rgba(24, 40, 24, 0.95)'; // forestFloorMid transparent
const iconFilter = 'invert(90%) sepia(30%) saturate(400%) hue-rotate(80deg) brightness(100%) contrast(90%)'; // Greenish tint

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
    background-color: ${forestFloorDark}; /* Dark background */
    /* Optional: Subtle organic texture */
    /* background-image: url('path/to/organic-texture.png'); */
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
    background-color: ${forestFloorMid}; /* Slightly lighter dark bg */
    color: ${bioLime}; /* Lime header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${bioLime}; /* Lime border */
    text-shadow: 0 0 4px ${bioLime};
}

td {
    color: ${textSecondary}; /* Soft green text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${bioLime}, ${bioTeal});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(144, 238, 144, 0.3); /* Subtle lime glow */
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
    background: ${forestFloorMid}; /* Dark background */
    border-right: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${forestFloorDark}; /* Main Background */
    border-left: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Bio-Luminescent) */
.card {
    background: ${forestFloorLight}; /* Muted green/gray bg */
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 5px; /* Softly rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25), inset 0 0 6px rgba(16, 24, 16, 0.5); /* Shadow + Inner Dark */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textDim}; /* Muted green */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Greenish icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${bioLime}, ${bioTeal});
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textPrimary}; /* Light header text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Greenish icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${forestFloorMid}; /* Dark bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 9px rgba(0, 0, 0, 0.3); /* Soft shadow */
    border-right: 1px solid ${borderSubtle};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textDim}; /* Muted green */
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent; /* Placeholder */
}

.sidebar a:hover {
    color: ${textPrimary}; /* Light text on hover */
    background: linear-gradient(90deg, rgba(144, 238, 144, 0.1), rgba(64, 224, 208, 0.1)); /* Subtle gradient bg */
    border-left: 4px solid ${bioLime}; /* Lime accent line */
}

/* --- Sidebar Section Button Styling (Bio-Luminescent) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${bioLime}, ${bioTeal}); /* Lime to Teal Gradient */
    color: ${forestFloorDark}; /* Dark text */
    border: 1px solid ${borderSubtle};
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 0 8px rgba(144, 238, 144, 0.4); /* Shadow + Lime Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${bioTeal}, ${bioPurple}); /* Teal to Purple Gradient on Hover */
    color: ${forestFloorDark};
    border-color: ${bioTeal};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25), 0 0 12px rgba(64, 224, 208, 0.6); /* Shadow + Teal Glow */
    transform: translateY(-1px);
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${bioLime}, ${bioTeal}); /* Lime to Teal Gradient */
    color: ${forestFloorDark}; /* Dark Text */
    padding: 10px 14px;
    border: 1px solid ${borderSubtle};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25), 0 0 10px rgba(144, 238, 144, 0.5); /* Shadow + Lime Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${bioTeal}, ${bioPurple}); /* Teal to Purple Gradient on Hover */
    color: ${forestFloorDark};
    border-color: ${bioTeal};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3), 0 0 18px rgba(64, 224, 208, 0.7); /* Shadow + Teal Glow */
    transform: translateY(-1px);
    text-shadow: none;
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark transparent bg */
    backdrop-filter: blur(3px); /* Blur effect */
    border-radius: 4px; /* Rounded corners */
    color: ${bioLime}; /* Lime text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
    border: 1px solid ${bioLime}; /* Lime Border */
    font-weight: 500;
    text-shadow: 0 0 4px ${bioLime};
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
    border-top-color: ${bioLime}; /* Match border color */
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
    background-color: rgba(144, 238, 144, 0.8); /* Lime Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(144, 238, 144, 0.6);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-bio-luminescent 1.4s infinite ease-out;
}

/* Separate keyframes for bio-luminescent pulse */
@keyframes pulse-signal-bio-luminescent {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(144, 238, 144, 0.7);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 22px rgba(144, 238, 144, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(144, 238, 144, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Bio-Luminescent) */
.low-magnitude {
    background-color: rgba(64, 224, 208, 0.08); /* Subtle teal */
    border-left: 4px solid ${bioTeal}; /* Teal */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(144, 238, 144, 0.1); /* Subtle lime */
    border-left: 4px solid ${bioLime}; /* Lime */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(200, 162, 200, 0.12); /* Subtle purple */
    border-left: 4px solid ${bioPurple}; /* Purple */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 182, 193, 0.15); /* Subtle pink */
    border-left: 4px solid ${bioPink}; /* Pink */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(16, 24, 16, 0.94); /* forestFloorDark transparent */
    backdrop-filter: blur(4px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${forestFloorLight}; /* Muted green/gray bg */
    padding: 30px 40px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35), 0 0 18px rgba(144, 238, 144, 0.3); /* Shadow + Lime Glow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Light Text */
    border: 1px solid ${borderSubtle}; /* Muted Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${bioLime}; /* Lime message text */
    font-weight: 500;
    text-shadow: 0 0 4px ${bioLime};
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slim bar */
    background-color: ${forestFloorMid}; /* Darker Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderSubtle};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${bioLime}, ${bioTeal}, ${bioPurple}); /* Full Bio Gradient */
    background-size: 250% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${bioTeal}; /* Teal glow */
    animation: animate-gradient-bio 5s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient-bio {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${bioTeal}; /* Teal Text */
    text-shadow: 0 0 5px ${bioTeal};
}

/* Fixed Info Divs Positioning & Styling (Bio-Luminescent) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderSubtle}; /* Subtle Border */
    border-radius: 5px; /* Rounded corners */
    background-color: rgba(40, 56, 40, 0.95); /* forestFloorLight transparent */
    backdrop-filter: blur(3px); /* Subtle blur */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    color: ${textPrimary}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${bioLime};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 4px solid ${bioTeal};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto; /* Adjust width as needed */
    height: 120px;
    overflow-y: auto;
    background-color: rgba(16, 24, 16, 0.94); /* forestFloorDark transparent */
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: ${textDim}; /* Muted green log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-bio-luminescent 2.5s ease-out forwards;
}

/* Separate keyframes for bio-luminescent highlight (soft pulse/glow) */
@keyframes highlight-row-bio-luminescent {
    0% {
        background-color: rgba(144, 238, 144, 0.1); /* Lime glow start */
        box-shadow: inset 0 0 8px rgba(144, 238, 144, 0.3);
        transform: scale(1.005);
    }
    50% {
        background-color: rgba(64, 224, 208, 0.1); /* Teal glow mid */
        box-shadow: inset 0 0 8px rgba(64, 224, 208, 0.4);
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

console.log("Bio-Luminescent Flora (Dark) theme applied."); // Confirmation message

})(); // End of IIFE