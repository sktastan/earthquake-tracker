(function () { // Start of IIFE

    const themeId = 'dynamic-styles-neon-citrus';

    // Dynamic CSS Injection for Earthquake Tracker - Neon Citrus Splash Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Neon Citrus Splash)
    const bgBase = '#FFFFFF';         // Pure White Base
    const containerBg = '#F8F9FA';    // Very Light Off-White for containers
    const borderLight = '#E9ECEF';    // Light Gray Border
    const borderFocus = '#DEE2E6';    // Slightly Darker Light Gray for focus
    const textPrimary = '#212529';   // Very Dark Gray (near black)
    const textSecondary = '#495057'; // Dark Gray
    const textDim = '#6C757D';       // Medium Gray
    const accentNeonLime = '#AEFF00'; // Vibrant Neon Lime
    const accentLemonYellow = '#FFF000';// Vibrant Lemon Yellow
    const accentZestyOrange = '#FFA500';// Vibrant Zesty Orange
    const accentElectricBlue = '#00CFFF';// Vibrant Electric Blue
    const tooltipBg = 'rgba(33, 37, 41, 0.9)'; // Dark gray for tooltip contrast
    const tooltipText = '#F8F9FA';    // Light text for tooltip
    const iconFilter = 'saturate(1.5) brightness(1.05)'; // Slightly more vibrant icons

    // --- Define the primary button background color here for reuse ---
    const sidebarButtonBg = accentNeonLime;
    const sidebarButtonText = textPrimary; // Dark text on lime button
    const sidebarButtonHoverBg = '#99E600'; // Darker Lime for hover
    const sidebarButtonHoverText = textPrimary;

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); /* Clean, modern Sans-Serif */

/* Body Styles */
body {
    font-family: 'Roboto', sans-serif; /* Apply the font */
    background-color: ${bgBase}; /* Pure white background */
    font-size: 13px; /* Crisp and clean */
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Dark text */
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
    padding: 8px 14px;
    text-align: left;
    border-bottom: 1px solid ${borderLight}; /* Light border */
}

th {
    background-color: ${containerBg}; /* Light off-white header */
    color: ${textPrimary}; /* Dark header text */
    font-weight: 700; /* Bold */
    border-bottom-width: 2px;
    border-bottom-color: ${accentNeonLime}; /* Neon Lime border */
    letter-spacing: 0.4px;
}

td {
    color: ${textSecondary}; /* Dark gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${accentZestyOrange};
    text-align: center;
    margin-bottom: 18px;
    font-size: 1.6em; /* Bright and clear */
    font-weight: 700; /* Bold */
    border-bottom: 2px dashed ${accentElectricBlue}; /* Dashed blue border */
    padding-bottom: 12px;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.03);
    background-color: transparent;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${containerBg}; /* Light off-white for map */
    border-right: 1px solid ${borderLight}; /* Light border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 40%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${bgBase}; /* Main Background */
    border-left: 1px solid ${borderLight}; /* Light border */
    border-radius: 0;
}

/* Card Component (Neon Citrus Splash) */
.card {
    background: ${containerBg}; /* Light off-white container */
    border: 1px solid ${borderLight}; /* Light border */
    border-left: 5px solid ${accentNeonLime}; /* Neon Lime accent */
    border-radius: 5px; /* Soft rounding */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* Very soft shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    line-height: 1.6;
    color: ${textSecondary}; /* Dark gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Vibrant icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid ${accentElectricBlue}; /* Electric Blue accent border */
    padding-bottom: 9px;
    font-weight: 700;
    font-size: 1.25em;
    color: ${textPrimary}; /* Dark header text */
    background-color: transparent;
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Vibrant icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Light off-white bg */
    overflow-x: hidden;
    transition: 0.3s ease-out;
    padding-top: 0; /* Adjusted for heading */
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.07); /* Soft shadow */
    border-right: 1px solid ${borderLight};
    border-radius: 0;
}

.sidebar-heading {
    color: ${sidebarButtonText}; /* Match button text */
    background-color: ${sidebarButtonBg}; /* Match button background */
    font-size: 1.25em;
    font-weight: 700;
    padding: 14px 20px; /* Good padding */
    margin-bottom: 20px; /* User request */
    text-align: center;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.05);
}

.sidebar a {
    padding: 10px 20px;
    text-decoration: none;
    color: ${textSecondary}; /* Dark gray */
    display: block;
    transition: background-color 0.15s, color 0.15s, border-left-color 0.15s;
    font-weight: 500; /* Medium for links */
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${accentElectricBlue}; /* Electric Blue accent on hover */
    background-color: rgba(0, 207, 255, 0.07); /* Very subtle blue wash */
    border-left-color: ${accentElectricBlue};
}

.sidebar .closebtn {
    position: absolute;
    top: 0px; /* Align with top of heading */
    right: 0px; /* Align with right of heading */
    font-size: 20px; /* Adjust for visual balance */
    color: ${sidebarButtonText}; /* Match button text */
    background-color: ${sidebarButtonBg}; /* Match button background */
    text-decoration: none;
    transition: color 0.15s, background-color 0.15s;
    padding: 14px 16px; /* Match heading padding for alignment */
    line-height: 1.25em; /* Match heading line-height for vertical centering */
    border-bottom-left-radius: 4px; /* Optional rounding */
}
.sidebar .closebtn:hover {
    color: ${sidebarButtonHoverText}; /* Match button hover text */
    background-color: ${sidebarButtonHoverBg}; /* Match button hover background */
}

/* --- Sidebar Section Button Styling (Neon Citrus Splash) --- */
.sidebar-section button {
    background-color: ${sidebarButtonBg};
    color: ${sidebarButtonText};
    border: none;
    padding: 9px 16px; /* Bright padding */
    border-radius: 4px; /* Soft rounding */
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.sidebar-section button:hover {
    background-color: ${sidebarButtonHoverBg};
    color: ${sidebarButtonHoverText};
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentNeonLime}, ${accentLemonYellow}); /* Lime to Yellow */
    color: ${textPrimary}; /* Dark Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1002;
    border-radius: 5px; /* Soft rounding */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15); /* Soft shadow */
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentZestyOrange}, ${accentLemonYellow}); /* Orange to Yellow */
    color: ${textPrimary};
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark gray, slightly transparent */
    border-radius: 4px; /* Subtle rounding */
    color: ${tooltipText}; /* Light text */
    padding: 7px 11px;
    white-space: nowrap;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
    border: 1px solid ${textDim}; /* Medium gray border */
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
    border-color: ${textDim} transparent transparent transparent; /* Match border color */
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
    width: 28px;
    height: 28px;
    background-color: rgba(174, 255, 0, 0.75); /* Neon Lime, semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(174, 255, 0, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-citrus 1.3s infinite ease-out;
}

/* Separate keyframes for citrus pulse */
@keyframes pulse-signal-citrus {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(174, 255, 0, 0.6);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 20px rgba(174, 255, 0, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(174, 255, 0, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Neon Citrus Splash) */
.low-magnitude {
    background-color: rgba(0, 207, 255, 0.07); /* Subtle Electric Blue */
    border-left: 4px solid ${accentElectricBlue};
    color: ${textSecondary};
}

.moderate-magnitude {
    background-color: rgba(174, 255, 0, 0.1); /* Subtle Neon Lime */
    border-left: 4px solid ${accentNeonLime};
    color: ${textSecondary};
}

.high-magnitude {
    background-color: rgba(255, 240, 0, 0.12); /* Subtle Lemon Yellow */
    border-left: 4px solid ${accentLemonYellow};
    color: ${textPrimary};
}

.very-high-magnitude {
    background-color: rgba(255, 165, 0, 0.15); /* Subtle Zesty Orange */
    border-left: 4px solid ${accentZestyOrange};
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(248, 249, 250, 0.93); /* containerBg transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s;
}

.progress-content {
    background: ${containerBg}; /* Light off-white container */
    padding: 30px 40px;
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Soft shadow */
    text-align: center;
    width: 320px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderLight}; /* Light Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentZestyOrange}; /* Orange message text */
    font-weight: 600;
}

#progress-bar-visual-container {
    width: 100%;
    height: 12px; /* Bright bar height */
    background-color: ${borderLight}; /* Light Gray Background */
    border-radius: 6px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderFocus};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentNeonLime}, ${accentLemonYellow}, ${accentZestyOrange}); /* Citrus Gradient */
    background-size: 200% 100%;
    animation: animate-gradient-citrus 4s linear infinite;
    border-radius: 6px; /* Rounded */
    transition: width 0.25s ease-out;
    box-shadow: 0 0 5px ${accentNeonLime};
}

@keyframes animate-gradient-citrus {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 700;
    color: ${accentNeonLime}; /* Neon Lime Text */
}

/* Fixed Info Divs Positioning & Styling (Neon Citrus Splash) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 390px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderLight}; /* Light Border */
    border-radius: 5px; /* Rounded corners */
    background-color: ${containerBg}; /* Light off-white container */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentElectricBlue};
}

.weatherInfo {
    top: 400px; /* Ensures a 40px+ gap from a typical earthquakeInfo height */
    margin-top: 0; /* Explicitly set to 0 as top positioning handles the gap */
    border-left: 4px solid ${accentZestyOrange};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 115px;
    overflow-y: auto;
    background-color: ${containerBg}; /* Light off-white */
    border: 1px solid ${borderFocus}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 14px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
    color: ${textDim}; /* Medium gray log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-citrus 2.5s ease-out forwards;
}

/* Separate keyframes for citrus highlight (bright color flash) */
@keyframes highlight-row-citrus {
    0%, 100% {
        background-color: transparent;
    }
    25% {
        background-color: rgba(174, 255, 0, 0.2); /* Neon Lime wash */
    }
    75% {
        background-color: rgba(255, 240, 0, 0.2); /* Lemon Yellow wash */
    }
}

`;

    // --- Apply Styles and Cleanup ---

    // Add styles to the style element
    styleSheet.textContent = cssStyles;

    // Append style element to head
    document.head.appendChild(styleSheet);

    console.log("Neon Citrus Splash (Light) theme applied."); // Confirmation message

})(); // End of IIFE