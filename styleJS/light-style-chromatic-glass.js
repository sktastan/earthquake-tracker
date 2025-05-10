(function () { // Start of IIFE

    const themeId = 'dynamic-styles-chromatic-glass';

    // Dynamic CSS Injection for Earthquake Tracker - Chromatic Glass Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Chromatic Glass)
    // const glassBg = '#F8F9FA';        // Very Light Gray/Off-White Base
    const glassBg = 'rgba(255, 255, 255, 0.5)';
    const containerBg = 'rgba(255, 255, 255, 0.7)'; // Semi-transparent White
    const borderSubtle = '#E0E0E5';    // Very Light Gray Border
    const borderAccent = 'rgba(0, 0, 0, 0.1)'; // Subtle dark border for contrast
    const textPrimary = '#212529';   // Dark Gray/Black Text
    const textSecondary = '#495057'; // Medium Gray Text
    const textDim = '#6C757D';       // Lighter Gray Text
    const prismCyan = '#00FFFF';      // Vibrant Cyan
    const prismMagenta = '#FF00FF';   // Vibrant Magenta
    const prismYellow = '#FFFF00';    // Vibrant Yellow
    const prismGreen = '#00FF80';     // Vibrant Green (Secondary)
    const tooltipBg = 'rgba(255, 255, 255, 0.85)'; // Semi-transparent white tooltip
    const iconFilter = 'contrast(0.1) sepia(0.5) hue-rotate(180deg)'; // Subtle dark/desaturated filter

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"); /* Clean Sans-Serif */

/* Body Styles */
body {
    font-family: 'Inter', sans-serif; /* Apply the font */
    background-color: ${glassBg}; /* Light background */
    /* Optional: Subtle gradient or pattern */
    /* background-image: linear-gradient(to bottom right, #F8F9FA, #E9ECEF); */
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
    text-align: left;
    border-bottom: 1px solid ${borderSubtle}; /* Subtle border */
}

th {
    background-color: rgba(255, 255, 255, 0.5); /* Slightly transparent white */
    color: ${prismCyan}; /* Cyan header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${prismCyan}; /* Cyan border */
    text-shadow: 0 0 3px rgba(0, 255, 255, 0.4);
}

/* --- Style for Table Heading --- */
// h3{
//     font-size: 24px; /* Adjusted for better visibility */
// }

.tableContainer h3.table-heading {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${prismCyan}, ${prismMagenta}, ${prismYellow});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;  
    font-weight: 600;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); /* Subtle dark shadow */
    border-bottom: 1px solid ${borderSubtle};
    padding-bottom: 12px;
    letter-spacing: 0.5px;
}
/* --- End Table Heading Style --- */

td {
    color: ${textSecondary}; /* Medium gray text for data */
}


/* Map Container */
.map {
    width: 100%;
    height: 100%;
    position: relative;
    background: ${glassBg}; /* Light background */
    border-right: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 36%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${glassBg}; /* Main Background */
    border-left: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Chromatic Glass) */
.card {
    background: ${containerBg}; /* Semi-transparent White */
    backdrop-filter: blur(5px); /* Frosted glass effect */
    border: 1px solid ${borderAccent}; /* Subtle dark border */
    border-radius: 6px; /* Rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* Soft shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    line-height: 1.6;
    color: ${textSecondary}; /* Medium gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Subtle dark icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${prismCyan}, ${prismMagenta});
    padding-bottom: 9px;
    font-weight: 600;
    color: ${textPrimary}; /* Dark header text */
    background: transparent; /* No background */
}

.tableContainer h3.table-heading img,
.tableContainer thead img, 
#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Subtle dark icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${containerBg}; /* Semi-transparent White */
    backdrop-filter: blur(8px); /* Stronger blur for sidebar */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
    border-right: 1px solid ${borderAccent};
    border-radius: 0;
}

.sidebar-heading {
    font-size: 20px; 
    color:rgb(0, 0, 0);
    border-radius: 4px;
    background-color: transparent; /* No background */
    /* text-align: center; */
    /* margin: 10px 0; */
    margin-top: 40px;
    padding: 0;
}

.sidebar a {
    padding: 12px 24px;
    text-decoration: none;
    color: ${textSecondary}; /* Medium gray */
    display: block;
    transition: background 0.2s, color 0.2s, border-left 0.2s;
    font-weight: 500;
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent; /* Placeholder */
}

.sidebar a:hover {
    color: ${textPrimary}; /* Dark text on hover */
    background: linear-gradient(90deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15)); /* Subtle gradient bg */
    border-left: 4px solid ${prismCyan}; /* Cyan accent line */
}

.sidebar .closebtn {
    color: ${textPrimary}; /* Dark text on hover */
    background: transparent; /* No background */
}


/* --- Sidebar Section Button Styling (Chromatic Glass) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${prismCyan}, ${prismMagenta}); /* Cyan to Magenta Gradient */
    color: ${textPrimary}; /* Dark text */
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 255, 255, 0.3); /* Shadow + Cyan Glow */
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* Subtle light shadow */
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${prismYellow}, ${prismGreen}); /* Yellow to Green Gradient on Hover */
    color: ${textPrimary};
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 12px rgba(255, 255, 0, 0.5); /* Shadow + Yellow Glow */
    transform: translateY(-1px);
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${prismCyan}, ${prismMagenta}); /* Cyan to Magenta Gradient */
    color: ${textPrimary}; /* Dark Text */
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 255, 255, 0.4); /* Shadow + Cyan Glow */
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${prismYellow}, ${prismGreen}); /* Yellow to Green Gradient on Hover */
    color: ${textPrimary};
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 0 18px rgba(255, 255, 0, 0.6); /* Shadow + Yellow Glow */
    transform: translateY(-1px);
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Semi-transparent white */
    backdrop-filter: blur(4px); /* Blur effect */
    border-radius: 4px; /* Rounded corners */
    color: ${textPrimary}; /* Dark text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid ${borderAccent}; /* Subtle dark border */
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
    background-color: rgba(255, 0, 255, 0.7); /* Magenta Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 0, 255, 0.5);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-chromatic 1.4s infinite ease-out;
}

/* Separate keyframes for chromatic pulse */
@keyframes pulse-signal-chromatic {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(255, 0, 255, 0.6);
        opacity: 0.8;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 22px rgba(255, 0, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(255, 0, 255, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Chromatic Glass) */
.low-magnitude {
    background-color: rgba(0, 255, 128, 0.1); /* Subtle green */
    border-left: 4px solid ${prismGreen}; /* Green */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(0, 255, 255, 0.1); /* Subtle cyan */
    border-left: 4px solid ${prismCyan}; /* Cyan */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(255, 255, 0, 0.12); /* Subtle yellow */
    border-left: 4px solid ${prismYellow}; /* Yellow */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 0, 255, 0.15); /* Subtle magenta */
    border-left: 4px solid ${prismMagenta}; /* Magenta */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(248, 249, 250, 0.9); /* glassBg transparent */
    backdrop-filter: blur(5px); /* Blur effect */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background: ${containerBg}; /* Semi-transparent White */
    backdrop-filter: blur(8px); /* Stronger blur */
    padding: 30px 40px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1), 0 0 18px rgba(0, 255, 255, 0.2); /* Shadow + Subtle Cyan Glow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderAccent}; /* Subtle Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${prismCyan}; /* Cyan message text */
    font-weight: 500;
    text-shadow: 0 0 4px rgba(0, 255, 255, 0.5);
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
    background: linear-gradient(90deg, ${prismCyan}, ${prismMagenta}, ${prismYellow}); /* Full Prism Gradient */
    background-size: 250% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${prismMagenta}; /* Magenta glow */
    animation: animate-gradient-chromatic 5s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient-chromatic {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${prismMagenta}; /* Magenta Text */
    text-shadow: 0 0 5px ${prismMagenta};
}

/* Fixed Info Divs Positioning & Styling (Chromatic Glass) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderAccent}; /* Subtle Border */
    border-radius: 6px; /* Rounded corners */
    background-color: ${containerBg}; /* Semi-transparent white */
    backdrop-filter: blur(6px); /* Blur effect */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${prismCyan};
}

.weatherInfo {
    top: 450px; /* Adjust spacing */
    border-left: 4px solid ${prismMagenta};
}

.log {
    position: fixed; /* User request */
    
    left: 80px;
    width: auto; /* Adjust width as needed */

    overflow-y: auto;
    background-color: rgba(248, 249, 250, 0.85); /* glassBg transparent */
    backdrop-filter: blur(4px);
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
    animation: highlight-row-chromatic 0.5s steps(1) infinite;
}

/* Separate keyframes for chromatic highlight (shifting gradient overlay) */
@keyframes highlight-row-chromatic {
    0% {
        background: linear-gradient(90deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15));
        background-size: 200% 100%;
        background-position: 100% 0;
        transform: scale(1.005);
        box-shadow: inset 0 0 8px rgba(0, 255, 255, 0.2);
    }
    50% {
        background-position: 0 0; /* Sweep gradient */
        transform: scale(1.005);
        box-shadow: inset 0 0 8px rgba(255, 0, 255, 0.3); /* Shift glow color */
    }
    100% {
        background: transparent; /* Fade back */
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

    console.log("Chromatic Glass (Light) theme applied."); // Confirmation message

})(); // End of IIFE