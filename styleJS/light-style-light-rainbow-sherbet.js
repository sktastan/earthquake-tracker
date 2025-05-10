(function () { // Start of IIFE

    const themeId = 'dynamic-styles-rainbow-sherbet';

    // Dynamic CSS Injection for Earthquake Tracker - Rainbow Sherbet Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Rainbow Sherbet)
    const bgBase = '#FFF9F0';         // Light Cream Base
    const containerBg = '#FFFFFF';    // Pure White for containers
    const borderLight = '#F0E8D8';    // Muted Cream/Beige Border
    const borderFocus = '#E0D8C8';    // Slightly darker beige for focus
    const textPrimary = '#4A4A6A';   // Dark Slate Blue/Purple
    const textSecondary = '#7A7A9A'; // Muted Slate Blue
    const textDim = '#9A9AC0';       // Light Slate Blue/Lavender
    const accentCoral = '#FF7F50';    // Vibrant Coral
    const accentTeal = '#40E0D0';     // Bright Teal
    const accentYellow = '#FFDA63';   // Sunny Yellow
    const accentLavender = '#E6E6FA'; // Soft Lavender (for subtle backgrounds)
    const accentDeepPurple = '#6A5ACD';// Deep Slate Blue (for some text/borders)
    const tooltipBg = 'rgba(255, 255, 255, 0.95)'; // White, slightly transparent
    const tooltipText = textPrimary;
    const iconFilter = 'saturate(1.2) brightness(0.95)'; // Slightly more vibrant icons

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"); /* Friendly, Rounded Sans-Serif */

/* Body Styles */
body {
    font-family: 'Nunito', sans-serif; /* Apply the font */
    background-color: ${bgBase}; /* Light cream background */
    font-size: 13px; /* Slightly larger for a friendly feel */
    line-height: 1.6; /* Good readability */
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Dark slate blue text */
    font-weight: 400; /* Regular weight */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 8px 14px; /* Adjusted padding */
    text-align: left;
    border-bottom: 1px solid ${borderLight}; /* Light border */
}

th {
    background-color: ${accentLavender}; /* Soft lavender header */
    color: ${accentDeepPurple}; /* Deep slate blue header text */
    font-weight: 700; /* Bold */
    border-bottom-width: 2px;
    border-bottom-color: ${borderFocus}; /* Darker beige border */
    letter-spacing: 0.3px;
}

td {
    color: ${textSecondary}; /* Muted slate blue text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${accentCoral};
    text-align: center;
    margin-bottom: 16px;
    font-size: 1.5em; /* Cheerful and prominent */
    font-weight: 700; /* Bold */
    border-bottom: 2px dashed ${accentTeal}; /* Dashed teal border */
    padding-bottom: 10px;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
    background-color: transparent;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${accentLavender}; /* Soft lavender background for map */
    border-right: 1px solid ${borderLight}; /* Light border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${bgBase}; /* Main Background */
    border-left: 1px solid ${borderLight}; /* Light border */
    border-radius: 0;
}

/* Card Component (Rainbow Sherbet) */
.card {
    background: ${containerBg}; /* White container */
    border: 1px solid ${borderLight}; /* Light border */
    border-left: 5px solid ${accentCoral}; /* Coral accent */
    border-radius: 6px; /* Soft rounding */
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06); /* Soft shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 1.6;
    color: ${textSecondary}; /* Muted slate blue */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Slightly vibrant icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid ${accentTeal}; /* Teal accent border */
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 1.2em;
    color: ${accentDeepPurple}; /* Deep slate blue header text */
    background-color: transparent;
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Slightly vibrant icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* White bg */
    overflow-x: hidden;
    transition: 0.3s ease-out;
    padding-top: 50px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08); /* Soft shadow */
    border-right: 1px solid ${borderLight};
    border-radius: 0;
}

.sidebar-heading, .sidebar .closebtn {
   color: ${bgBase};
   background: linear-gradient(145deg, #FF7F50, #FFDA63);
}

.sidebar-heading {
    font-size: 1.2em;
    font-weight: 700;
    padding: 10px 20px 5px 20px;
    margin-bottom: 5px;
    border-bottom: 1px solid ${borderFocus};
    text-align: center;
    letter-spacing: 0.5px;
}

.sidebar a {
    padding: 10px 20px;
    text-decoration: none;
    color: ${textSecondary}; /* Muted slate blue */
    display: block;
    transition: background-color 0.2s, color 0.2s, border-left-color 0.2s;
    font-weight: 600; /* Semi-bold for links */
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${accentCoral}; /* Coral accent on hover */
    background-color: rgba(255, 127, 80, 0.08); /* Very subtle coral wash */
    border-left-color: ${accentCoral};
}

.sidebar .closebtn {
    position: absolute;
    top: 8px;
    right: 18px;
    font-size: 28px;
    color: ${textDim}; /* Light slate blue */
    text-decoration: none;
    transition: color 0.2s;
}
.sidebar .closebtn:hover {
    color: ${accentCoral}; /* Coral accent on hover */
    background: linear-gradient(145deg, ${accentTeal}, ${accentYellow});background: linear-gradient(145deg, ${accentTeal}, ${accentYellow});
}

/* --- Sidebar Section Button Styling (Rainbow Sherbet) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${accentCoral}, ${accentYellow}); /* Coral to Yellow */
    color: ${bgBase}; /* Light cream text */
    border: none;
    padding: 8px 15px; /* Cheerful padding */
    border-radius: 5px; /* Soft rounding */
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
    text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${accentTeal}, ${accentYellow}); /* Teal to Yellow */
    color: ${textPrimary};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentCoral}, ${accentYellow}); /* Coral to Yellow */
    color: ${bgBase}; /* Light Cream Text */
    padding: 9px 13px;
    border: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1002;
    border-radius: 5px; /* Soft rounding */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15); /* Soft shadow */
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentTeal}, ${accentYellow}); /* Teal to Yellow */
    color: ${textPrimary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* White, slightly transparent */
    border-radius: 4px; /* Subtle rounding */
    color: ${tooltipText}; /* Dark text */
    padding: 7px 11px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid ${borderLight}; /* Light border */
    font-weight: 500;
}

.ol-tooltip::after {
    content: "";
    position: absolute;
    bottom: -7px; /* Adjusted for border */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 7px 0 7px; /* Triangle size */
    border-color: ${borderLight} transparent transparent transparent; /* Match border color */
}
.ol-tooltip::before { /* Inner part to match bg */
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 6px;
    border-color: ${tooltipBg} transparent transparent transparent;
    z-index: 1;
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 26px;
    height: 26px;
    background-color: rgba(255, 127, 80, 0.7); /* Coral, semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 127, 80, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-sherbet 1.5s infinite ease-out;
}

/* Separate keyframes for sherbet pulse */
@keyframes pulse-signal-sherbet {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 127, 80, 0.5);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.7);
        box-shadow: 0 0 0 16px rgba(255, 127, 80, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 127, 80, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Rainbow Sherbet) */
.low-magnitude {
    background-color: rgba(64, 224, 208, 0.08); /* Subtle Teal */
    border-left: 4px solid ${accentTeal};
    color: ${textSecondary};
}

.moderate-magnitude {
    background-color: rgba(255, 218, 63, 0.1); /* Subtle Yellow */
    border-left: 4px solid ${accentYellow};
    color: ${textSecondary};
}

.high-magnitude {
    background-color: rgba(255, 127, 80, 0.12); /* Subtle Coral */
    border-left: 4px solid ${accentCoral};
    color: ${textPrimary};
}

.very-high-magnitude {
    background-color: rgba(106, 90, 205, 0.1); /* Subtle Deep Purple */
    border-left: 4px solid ${accentDeepPurple};
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 249, 240, 0.92); /* bgBase transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s;
}

.progress-content {
    background: ${containerBg}; /* White container */
    padding: 28px 38px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* Soft shadow */
    text-align: center;
    width: 310px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderLight}; /* Light Border */
}

#progress-message {
    margin-bottom: 16px;
    color: ${accentCoral}; /* Coral message text */
    font-weight: 600;
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Cheerful bar height */
    background-color: ${accentLavender}; /* Soft Lavender Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 16px 0;
    border: 1px solid ${borderFocus};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentCoral}, ${accentYellow}, ${accentTeal}); /* Sherbet Gradient */
    background-size: 200% 100%;
    animation: animate-gradient-sherbet 4s linear infinite;
    border-radius: 5px; /* Rounded */
    transition: width 0.25s ease-out;
    box-shadow: none;
}

@keyframes animate-gradient-sherbet {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 700;
    color: ${accentCoral}; /* Coral Text */
}

/* Fixed Info Divs Positioning & Styling (Rainbow Sherbet) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 390px;
    height: auto;
    padding: 16px;
    z-index: 10;
    border: 1px solid ${borderLight}; /* Light Border */
    border-radius: 6px; /* Rounded corners */
    background-color: ${containerBg}; /* White container */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.07);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentTeal};
}

.weatherInfo {
    top: 420px; /* Adjust spacing */
    border-left: 4px solid ${accentYellow};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 115px;
    overflow-y: auto;
    background-color: ${accentLavender}; /* Soft Lavender */
    border: 1px solid ${borderFocus}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    color: ${textSecondary}; /* Muted slate blue log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-sherbet 2.2s ease-out forwards;
}

/* Separate keyframes for sherbet highlight (soft color wash) */
@keyframes highlight-row-sherbet {
    0% {
        background-color: rgba(255, 218, 63, 0.15); /* Subtle Yellow wash */
    }
    50% {
        background-color: rgba(255, 127, 80, 0.1); /* Subtle Coral wash */
    }
    100% {
        background-color: transparent; /* Fade back */
    }
}

`;

    // --- Apply Styles and Cleanup ---

    // Add styles to the style element
    styleSheet.textContent = cssStyles;

    // Append style element to head
    document.head.appendChild(styleSheet);

    console.log("Rainbow Sherbet (Light) theme applied."); // Confirmation message

})(); // End of IIFE
