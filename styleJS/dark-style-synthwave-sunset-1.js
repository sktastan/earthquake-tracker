(function () { // Start of IIFE

    const themeId = 'dynamic-styles-monochrome-minimal';

    // Dynamic CSS Injection for Earthquake Tracker - Monochrome Minimalist Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Monochrome Minimalist)
    const bgBase = '#FFFFFF';         // Pure White Base
    const bgSubtle = '#F8F9FA';       // Very Light Gray (almost white)
    const containerBg = '#FDFDFD';    // Off-White for containers
    const borderLight = '#E9ECEF';    // Light Gray Border
    const borderFocus = '#ADB5BD';    // Medium Gray for focus/accent borders
    const textPrimary = '#212529';   // Very Dark Gray (near black)
    const textSecondary = '#495057'; // Dark Gray
    const textDim = '#ADB5BD';       // Medium Gray (dimmer text, icons)
    const accentBlue = '#007BFF';     // A clear, standard blue for primary actions
    const accentBlueHover = '#0056b3';// Darker blue for hover
    const tooltipBg = 'rgba(33, 37, 41, 0.95)'; // Dark gray for tooltip contrast
    const tooltipText = '#F8F9FA';    // Light text for tooltip
    const iconFilter = 'grayscale(1) contrast(0.5) brightness(0.3)'; // Dark, desaturated icons

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"); /* Clean, modern Sans-Serif */

/* Body Styles */
body {
    font-family: 'Inter', sans-serif; /* Apply the font */
    background-color: ${bgBase}; /* Pure white background */
    font-size: 12px; /* Slightly smaller for a cleaner look */
    line-height: 1.5; /* Optimal readability */
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Dark text */
    font-weight: 400; /* Regular weight */
    -webkit-font-smoothing: antialiased; /* Smoother fonts on WebKit */
    -moz-osx-font-smoothing: grayscale; /* Smoother fonts on Firefox */
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 6px 12px; /* Adjusted padding for minimalism */
    text-align: left;
    border-bottom: 1px solid ${borderLight}; /* Light border */
}

th {
    background-color: ${bgSubtle}; /* Very light gray header */
    color: ${textSecondary}; /* Dark gray header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 1px; /* Consistent border width */
    border-bottom-color: ${borderFocus}; /* Slightly darker border for header */
    letter-spacing: 0.5px; /* Subtle letter spacing */
}

td {
    color: ${textSecondary}; /* Dark gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${textPrimary};
    text-align: center;
    margin-bottom: 16px;
    font-size: 1.3em; /* Clean and proportional */
    font-weight: 600; /* Semi-bold */
    border-bottom: 1px solid ${borderLight};
    padding-bottom: 10px;
    letter-spacing: 0.2px;
    background-color: transparent; /* No background for minimalist heading */
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${bgSubtle}; /* Very light gray background */
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

/* Card Component (Monochrome Minimalist) */
.card {
    background: ${containerBg}; /* Off-white container */
    border: 1px solid ${borderLight}; /* Light border */
    border-radius: 4px; /* Subtle rounding */
    padding: 14px;
    margin: 10px 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); /* Very subtle shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    line-height: 1.5;
    color: ${textSecondary}; /* Dark gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 8px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Dark, desaturated icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    border-bottom: 1px solid ${borderFocus}; /* Accent border */
    padding-bottom: 7px;
    font-weight: 600;
    font-size: 1.1em;
    color: ${textPrimary}; /* Dark header text */
    background-color: transparent; /* No background */
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 8px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Dark, desaturated icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Off-white bg */
    overflow-x: hidden;
    transition: 0.3s ease-out;
    padding-top: 50px;
    box-shadow: 1px 0 3px rgba(0, 0, 0, 0.05); /* Very subtle shadow */
    border-right: 1px solid ${borderLight};
    border-radius: 0;
}

.sidebar a {
    padding: 10px 20px;
    text-decoration: none;
    color: ${textSecondary}; /* Dark gray */
    display: block;
    transition: background-color 0.15s, color 0.15s;
    font-weight: 500; /* Medium weight for links */
    border-radius: 3px;
    margin: 1px 8px;
}

.sidebar a:hover {
    color: ${accentBlue}; /* Blue accent on hover */
    background-color: rgba(0, 123, 255, 0.05); /* Very subtle blue wash */
}

/* --- NEW: Sidebar Heading Style --- */
.sidebar-heading {
    color: ${bgBase};
    font-size: 1.1em; /* Slightly larger than links */
    font-weight: 600; /* Semi-bold */
    padding: 12px 20px 8px 20px; /* Padding around the heading */
    margin-bottom: 4px; /* Space below the heading */
    border-bottom: 1px solid ${borderLight}; /* Subtle separator */
    text-transform: uppercase; /* Optional: for a more formal look */
    letter-spacing: 0.5px; /* Optional: subtle spacing */
    background-color: ${accentBlue}; 
}
/* --- End Sidebar Heading Style --- */

/* --- NEW: Close button inside sidebar --- */
.sidebar .closebtn {
    position: absolute;
    top: 5px; /* Adjust as needed */
    right: 15px; /* Adjust as needed */
    font-size: 24px; /* Make it easily clickable */
    color: ${textDim}; /* Ensures Medium Gray (#ADB5BD) */
    text-decoration: none;
    transition: color 0.15s;
    background-color: ${accentBlue}; v
}
.sidebar .closebtn:hover {
    color: ${textSecondary}; /* Ensures Dark Gray (#495057) on hover */
}
/* --- End Close button style --- */

/* --- Sidebar Section Button Styling (Monochrome Minimalist) --- */
.sidebar-section button {
    background-color: ${accentBlue};
    color: ${bgBase}; /* White text */
    border: none;
    padding: 7px 12px; /* Clean padding */
    border-radius: 3px; /* Subtle rounding */
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08); /* Very subtle shadow */
    text-shadow: none;
}

.sidebar-section button:hover {
    background-color: ${accentBlueHover}; /* Darker blue */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(0); /* No movement for minimalist */
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background-color: ${accentBlue};
    color: ${bgBase}; /* White Text */
    padding: 8px 12px;
    border: none;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1002;
    border-radius: 3px; /* Subtle rounding */
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.hamburger-btn:hover {
    background-color: ${accentBlueHover}; /* Darker blue */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    transform: translateY(0);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark background for contrast */
    border-radius: 3px; /* Subtle rounding */
    color: ${tooltipText}; /* Light text */
    padding: 6px 10px;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border: none; /* No border for minimalist tooltip */
    font-weight: 400;
}

.ol-tooltip::after {
    content: "";
    position: absolute;
    bottom: -6px; /* Adjusted for no border */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 6px; /* Triangle size */
    border-color: ${tooltipBg} transparent transparent transparent; /* Match background */
}


/* Signal Animation */
.signal-overlay {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: rgba(0, 123, 255, 0.6); /* Accent blue, semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-minimalist 1.5s infinite ease-out;
}

/* Separate keyframes for minimalist pulse */
@keyframes pulse-signal-minimalist {
    0% {
        transform: translate(-50%, -50%) scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
        opacity: 0.7;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.6);
        box-shadow: 0 0 0 15px rgba(0, 123, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Monochrome Minimalist - using shades of gray and the accent) */
.low-magnitude {
    background-color: rgba(0, 123, 255, 0.03); /* Very subtle accent blue */
    border-left: 3px solid ${accentBlue};
    color: ${textSecondary};
}

.moderate-magnitude {
    background-color: rgba(173, 181, 189, 0.1); /* Subtle light gray */
    border-left: 3px solid ${textDim}; /* Medium gray */
    color: ${textSecondary};
}

.high-magnitude {
    background-color: rgba(73, 80, 87, 0.08); /* Subtle dark gray */
    border-left: 3px solid ${textSecondary}; /* Dark gray */
    color: ${textPrimary};
}

.very-high-magnitude {
    background-color: rgba(33, 37, 41, 0.08); /* Subtle very dark gray */
    border-left: 3px solid ${textPrimary}; /* Near black */
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(253, 253, 253, 0.9); /* bgSubtle transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s;
}

.progress-content {
    background: ${containerBg}; /* Off-white container */
    padding: 25px 35px;
    border-radius: 4px; /* Rounded corners */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06); /* Soft shadow */
    text-align: center;
    width: 300px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderLight}; /* Light Border */
}

#progress-message {
    margin-bottom: 15px;
    color: ${textSecondary}; /* Dark gray message text */
    font-weight: 500;
}

#progress-bar-visual-container {
    width: 100%;
    height: 8px; /* Slim bar */
    background-color: ${borderLight}; /* Light Background */
    border-radius: 4px; /* Rounded */
    overflow: hidden;
    margin: 15px 0;
    border: none;
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: ${accentBlue}; /* Accent blue */
    border-radius: 4px; /* Rounded */
    transition: width 0.25s ease-out;
    box-shadow: none;
}

#progress-percentage {
    font-weight: 600;
    color: ${accentBlue}; /* Accent Blue Text */
}

/* Fixed Info Divs Positioning & Styling (Monochrome Minimalist) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 380px;
    height: auto;
    padding: 15px;
    z-index: 10;
    border: 1px solid ${borderLight}; /* Light Border */
    border-radius: 4px; /* Rounded corners */
    background-color: ${containerBg}; /* Off-white container */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 3px solid ${accentBlue};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 3px solid ${textDim};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 110px;
    overflow-y: auto;
    background-color: ${bgSubtle}; /* Very light gray */
    border: 1px solid ${borderLight}; /* Subtle border */
    border-radius: 3px;
    padding: 8px 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    color: ${textDim}; /* Muted gray log text */
    line-height: 1.4;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-minimalist 2.0s ease-out forwards;
}

/* Separate keyframes for minimalist highlight (subtle background fade) */
@keyframes highlight-row-minimalist {
    0% {
        background-color: rgba(0, 123, 255, 0.08); /* Very subtle blue wash */
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

    console.log("Monochrome Minimalist (Light) theme applied."); // Confirmation message

})(); // End of IIFE
