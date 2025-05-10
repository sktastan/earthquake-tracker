(function() { // Start of IIFE

const themeId = 'dynamic-styles-ink-wash';

// Dynamic CSS Injection for Earthquake Tracker - Paper & Ink Wash Theme
const styleSheet = document.createElement('style');
styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

// Color Palette (Paper & Ink Wash)
const paperBg = '#FDFBF5';        // Off-white/Cream Paper Base
const containerBg = 'rgba(235, 238, 240, 0.75)'; // Very light gray/blue, semi-transparent wash
const borderSubtle = '#D0D5DB';    // Soft Gray Border
const borderAccent = '#B0B8C0';    // Slightly darker gray border
const textPrimary = '#3C3836';   // Dark Charcoal/Sepia Text
const textSecondary = '#665F5B'; // Medium Gray/Sepia Text
const textDim = '#928374';       // Lighter Gray/Brown Text
const inkBlue = '#A8B5C2';      // Soft Blue/Gray Wash
const inkGray = '#8391A0';      // Medium Gray Wash
const inkOchre = '#D5C4A1';     // Soft Yellow/Brown Wash (Accent)
const inkHighlight = '#87A1B8'; // Slightly Brighter Blue (Accent)
const tooltipBg = 'rgba(253, 251, 245, 0.9)'; // paperBg semi-transparent
const iconFilter = 'contrast(0.3) sepia(0.2) brightness(0.8)'; // Darken and slightly sepia icons

// CSS styles as a template literal
const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"); /* Clean Humanist Sans-Serif */

/* Body Styles */
body {
    font-family: 'Lato', sans-serif; /* Apply the font */
    background-color: ${paperBg}; /* Paper background */
    /* Optional: Subtle paper texture */
    /* background-image: url('path/to/paper-texture.png'); */
    font-size: 12px;
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Dark text */
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
    background-color: rgba(235, 238, 240, 0.5); /* Very light wash */
    color: ${inkGray}; /* Gray header text */
    font-weight: 700; /* Bold */
    border-bottom-width: 2px;
    border-bottom-color: ${borderAccent}; /* Slightly darker border */
}

td {
    color: ${textSecondary}; /* Medium gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3 {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${inkBlue}, ${inkGray});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05); /* Very subtle shadow */
    border-bottom: 1px dashed ${borderSubtle};
    padding-bottom: 12px;
    letter-spacing: 0.5px;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${paperBg}; /* Paper background */
    border-right: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${paperBg}; /* Main Background */
    border-left: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Ink Wash) */
.card {
    background: ${containerBg}; /* Semi-transparent Wash */
    backdrop-filter: blur(4px); /* Frosted glass effect */
    border: 1px solid ${borderAccent}; /* Subtle border */
    border-radius: 5px; /* Rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06); /* Soft shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textSecondary}; /* Medium gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Darken icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${inkBlue}, ${inkGray});
    padding-bottom: 9px;
    font-weight: 700;
    color: ${textPrimary}; /* Dark header text */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Darken icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Semi-transparent Wash */
    backdrop-filter: blur(6px); /* Stronger blur for sidebar */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08); /* Soft shadow */
    border-right: 1px solid ${borderAccent};
    border-radius: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textSecondary}; /* Medium gray */
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 400; /* Regular weight */
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent; /* Placeholder */
}

.sidebar a:hover {
    color: ${textPrimary}; /* Dark text on hover */
    background: linear-gradient(90deg, rgba(168, 181, 194, 0.2), rgba(131, 145, 160, 0.2)); /* Subtle gradient bg */
    border-left: 4px solid ${inkBlue}; /* Blue accent line */
}

/* --- Sidebar Section Button Styling (Ink Wash) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${inkBlue}, ${inkGray}); /* Blue to Gray Gradient */
    color: ${textPrimary}; /* Dark text */
    border: 1px solid ${borderAccent};
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* Soft shadow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4); /* Subtle light shadow */
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${inkGray}, ${inkOchre}); /* Gray to Ochre Gradient on Hover */
    color: ${textPrimary};
    border-color: ${inkGray};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* Slightly stronger shadow */
    transform: translateY(-1px);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${inkBlue}, ${inkGray}); /* Blue to Gray Gradient */
    color: ${textPrimary}; /* Dark Text */
    padding: 10px 14px;
    border: 1px solid ${borderAccent};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${inkGray}, ${inkOchre}); /* Gray to Ochre Gradient on Hover */
    color: ${textPrimary};
    border-color: ${inkGray};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow */
    transform: translateY(-1px);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Paper semi-transparent */
    backdrop-filter: blur(3px); /* Blur effect */
    border-radius: 4px; /* Rounded corners */
    color: ${textPrimary}; /* Dark text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid ${borderAccent}; /* Subtle dark border */
    font-weight: 400;
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
    border-top-color: ${borderAccent}; /* Match border color */
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
    background-color: rgba(135, 161, 184, 0.7); /* inkHighlight semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(135, 161, 184, 0.5);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-ink-wash 1.5s infinite ease-out;
}

/* Separate keyframes for ink wash pulse */
@keyframes pulse-signal-ink-wash {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(135, 161, 184, 0.5);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 22px rgba(135, 161, 184, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(135, 161, 184, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Ink Wash) */
.low-magnitude {
    background-color: rgba(168, 181, 194, 0.1); /* Subtle blue */
    border-left: 4px solid ${inkBlue}; /* Blue */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(131, 145, 160, 0.12); /* Subtle gray */
    border-left: 4px solid ${inkGray}; /* Gray */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(213, 196, 161, 0.15); /* Subtle ochre */
    border-left: 4px solid ${inkOchre}; /* Ochre */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(135, 161, 184, 0.2); /* Subtle highlight blue */
    border-left: 4px solid ${inkHighlight}; /* Highlight Blue */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(253, 251, 245, 0.9); /* paperBg transparent */
    backdrop-filter: blur(4px); /* Blur effect */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${containerBg}; /* Semi-transparent Wash */
    backdrop-filter: blur(6px); /* Stronger blur */
    padding: 30px 40px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Soft shadow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderAccent}; /* Subtle Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${inkBlue}; /* Blue message text */
    font-weight: 400;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slim bar */
    background-color: ${borderSubtle}; /* Light Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderAccent};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${inkBlue}, ${inkGray}, ${inkOchre}); /* Full Ink Gradient */
    background-size: 250% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 6px rgba(131, 145, 160, 0.4); /* Gray glow */
    animation: animate-gradient-ink 6s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient-ink {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 700;
    color: ${inkGray}; /* Gray Text */
}

/* Fixed Info Divs Positioning & Styling (Ink Wash) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderAccent}; /* Subtle Border */
    border-radius: 5px; /* Rounded corners */
    background-color: ${containerBg}; /* Semi-transparent wash */
    backdrop-filter: blur(5px); /* Blur effect */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${inkBlue};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 4px solid ${inkGray};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto; /* Adjust width as needed */
    height: 120px;
    overflow-y: auto;
    background-color: rgba(253, 251, 245, 0.85); /* paperBg transparent */
    backdrop-filter: blur(3px);
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
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
    animation: highlight-row-ink-wash 2.5s ease-out forwards;
}

/* Separate keyframes for ink wash highlight (soft fade) */
@keyframes highlight-row-ink-wash {
    0% {
        background-color: rgba(168, 181, 194, 0.2); /* Blue wash start */
        box-shadow: inset 0 0 6px rgba(168, 181, 194, 0.3);
        transform: scale(1.005);
    }
    50% {
        background-color: rgba(131, 145, 160, 0.15); /* Gray wash mid */
        box-shadow: inset 0 0 6px rgba(131, 145, 160, 0.2);
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

console.log("Paper & Ink Wash (Light) theme applied."); // Confirmation message

})(); // End of IIFE