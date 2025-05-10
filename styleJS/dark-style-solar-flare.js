(function () { // Start of IIFE

    const themeId = 'dynamic-styles-solar-flare';

    // Dynamic CSS Injection for Earthquake Tracker - Solar Flare & Plasma Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Solar Flare & Plasma)
    const spaceBlack = '#030308';     // Very Dark Base
    const nebulaDark = '#100C18';    // Dark Purple/Blue Mid Tone
    const nebulaLight = '#1C1828';   // Lighter Purple/Blue Container
    const borderSubtle = '#302840';   // Muted Purple Border
    const textPrimary = '#F0F0F8';   // Very Light Gray/White
    const textSecondary = '#C8C8D8'; // Light Gray
    const textDim = '#A0A0B0';       // Muted Gray
    const flareRed = '#FF4500';      // Orangered
    const flareOrange = '#FFA500';   // Orange
    const flareYellow = '#FFD700';   // Gold/Yellow
    const plasmaBlue = '#00BFFF';    // Deep Sky Blue (Cool Accent)
    const tooltipBg = 'rgba(16, 12, 24, 0.95)'; // nebulaDark transparent
    const iconFilter = 'invert(95%) sepia(5%) saturate(100%) hue-rotate(200deg) brightness(105%) contrast(100%)'; // Light, slightly cool tint

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap"); /* Geometric Sans-Serif */

/* Body Styles */
body {
    font-family: 'Exo 2', sans-serif; /* Apply the font */
    background-color: ${spaceBlack}; /* Dark background */
    /* Optional: Subtle starfield or nebula effect */
    /* background-image: url('path/to/starfield.png'); */
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
    background-color: ${nebulaDark}; /* Darker mid tone bg */
    color: ${flareOrange}; /* Orange header text */
    font-weight: 600; /* Semi-bold */
    border-bottom-width: 2px;
    border-bottom-color: ${flareOrange}; /* Orange border */
    text-shadow: 0 0 4px ${flareOrange};
}

td {
    color: ${textSecondary}; /* Light gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3 {
    color: ${textPrimary};
    background: linear-gradient(90deg, ${flareRed}, ${flareOrange}, ${flareYellow});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* Make text transparent to show gradient */
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.4); /* Subtle red glow */
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
    background: ${nebulaDark}; /* Dark background */
    border-right: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${spaceBlack}; /* Main Background */
    border-left: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 0;
}

/* Card Component (Solar Flare) */
.card {
    background: ${nebulaLight}; /* Lighter Purple/Blue bg */
    border: 1px solid ${borderSubtle}; /* Subtle border */
    border-radius: 4px; /* Slightly rounded corners */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(3, 3, 8, 0.4); /* Shadow + Inner Dark */
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
    filter: ${iconFilter}; /* Light, cool icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${flareOrange}, ${flareYellow});
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
    background-color: ${nebulaDark}; /* Dark bg */
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.4); /* Soft shadow */
    border-right: 1px solid ${borderSubtle};
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
    background: linear-gradient(90deg, rgba(255, 69, 0, 0.15), rgba(255, 165, 0, 0.15)); /* Subtle gradient bg */
    border-left: 4px solid ${flareRed}; /* Red accent line */
}

/* --- Sidebar Section Button Styling (Solar Flare) --- */
.sidebar-section button {
    background: linear-gradient(145deg, ${flareRed}, ${flareOrange}); /* Red to Orange Gradient */
    color: ${spaceBlack}; /* Dark text */
    border: 1px solid ${flareRed};
    padding: 8px 14px;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer;
    font-family: 'Exo 2', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    margin-top: 8px;
    display: inline-block;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 69, 0, 0.5); /* Shadow + Red Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);
}

.sidebar-section button:hover {
    background: linear-gradient(145deg, ${flareYellow}, ${plasmaBlue}); /* Yellow to Blue Gradient on Hover */
    color: ${spaceBlack};
    border-color: ${flareYellow};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 0 12px rgba(255, 215, 0, 0.6); /* Shadow + Yellow Glow */
    transform: translateY(-1px);
    text-shadow: none;
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${flareRed}, ${flareOrange}); /* Red to Orange Gradient */
    color: ${spaceBlack}; /* Dark Text */
    padding: 10px 14px;
    border: 1px solid ${flareRed};
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1002;
    border-radius: 5px; /* Rounded */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 0 10px rgba(255, 69, 0, 0.6); /* Shadow + Red Glow */
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${flareYellow}, ${plasmaBlue}); /* Yellow to Blue Gradient on Hover */
    color: ${spaceBlack};
    border-color: ${flareYellow};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 18px rgba(255, 215, 0, 0.7); /* Shadow + Yellow Glow */
    transform: translateY(-1px);
    text-shadow: none;
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark transparent bg */
    backdrop-filter: blur(2px); /* Blur effect */
    border-radius: 4px; /* Rounded corners */
    color: ${flareYellow}; /* Yellow text */
    padding: 8px 12px;
    white-space: nowrap;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    border: 1px solid ${flareYellow}; /* Yellow Border */
    font-weight: 500;
    text-shadow: 0 0 4px ${flareYellow};
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
    border-top-color: ${flareYellow}; /* Match border color */
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
    background-color: rgba(255, 165, 0, 0.85); /* Orange Signal */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.6);
    border: none; /* No border */
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-solar-flare 1.3s infinite ease-out;
}

/* Separate keyframes for solar flare pulse */
@keyframes pulse-signal-solar-flare {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(255, 165, 0, 0.7);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 15px 22px rgba(255, 165, 0, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 5px 3px rgba(255, 165, 0, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Solar Flare) */
.low-magnitude {
    background-color: rgba(0, 191, 255, 0.08); /* Subtle blue */
    border-left: 4px solid ${plasmaBlue}; /* Blue */
    color: ${textDim};
}

.moderate-magnitude {
    background-color: rgba(255, 215, 0, 0.1); /* Subtle yellow */
    border-left: 4px solid ${flareYellow}; /* Yellow */
    color: ${textDim};
}

.high-magnitude {
    background-color: rgba(255, 165, 0, 0.12); /* Subtle orange */
    border-left: 4px solid ${flareOrange}; /* Orange */
    color: ${textSecondary}; /* Brighter text */
}

.very-high-magnitude {
    background-color: rgba(255, 69, 0, 0.15); /* Subtle red */
    border-left: 4px solid ${flareRed}; /* Red */
    color: ${textPrimary}; /* Brightest text */
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 3, 8, 0.94); /* spaceBlack transparent */
    backdrop-filter: blur(4px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.4s;
}

.progress-content {
    background-color: ${nebulaLight}; /* Lighter Purple/Blue bg */
    padding: 30px 40px;
    border-radius: 4px; /* Rounded corners */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), 0 0 18px rgba(255, 165, 0, 0.3); /* Shadow + Orange Glow */
    text-align: center;
    width: 340px;
    color: ${textPrimary}; /* Light Text */
    border: 1px solid ${borderSubtle}; /* Muted Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${flareOrange}; /* Orange message text */
    font-weight: 500;
    text-shadow: 0 0 4px ${flareOrange};
}

#progress-bar-visual-container {
    width: 100%;
    height: 10px; /* Slim bar */
    background-color: ${nebulaDark}; /* Darker Background */
    border-radius: 5px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderSubtle};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${flareRed}, ${flareOrange}, ${flareYellow}); /* Full Flare Gradient */
    background-size: 200% 100%; /* For potential animation */
    border-radius: 5px; /* Rounded */
    transition: width 0.3s ease-out;
    box-shadow: 0 0 8px ${flareOrange}; /* Orange glow */
    animation: animate-gradient-flare 4s linear infinite; /* Animate the gradient */
}

@keyframes animate-gradient-flare {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 600;
    color: ${flareYellow}; /* Yellow Text */
    text-shadow: 0 0 5px ${flareYellow};
}

/* Fixed Info Divs Positioning & Styling (Solar Flare) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 400px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderSubtle}; /* Subtle Border */
    border-radius: 4px; /* Rounded corners */
    background-color: rgba(28, 24, 40, 0.95); /* nebulaLight transparent */
    backdrop-filter: blur(3px); /* Subtle blur */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    color: ${textPrimary}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${flareOrange};
}

.weatherInfo {
    top: 410px; /* Adjust spacing */
    border-left: 4px solid ${plasmaBlue};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto; /* Adjust width as needed */
    height: 120px;
    overflow-y: auto;
    background-color: rgba(3, 3, 8, 0.94); /* spaceBlack transparent */
    border: 1px solid ${borderSubtle}; /* Subtle border */
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
    animation: highlight-row-solar-flare 2.0s ease-out forwards;
}

/* Separate keyframes for solar flare highlight (heat shimmer/wave) */
@keyframes highlight-row-solar-flare {
    0% {
        background: linear-gradient(90deg, rgba(255, 69, 0, 0.1), rgba(255, 165, 0, 0.1));
        background-size: 200% 100%;
        background-position: 100% 0;
        transform: scale(1.005) skewX(-1deg); /* Subtle skew */
        box-shadow: inset 0 0 8px rgba(255, 69, 0, 0.2);
    }
    50% {
        background-position: 0 0; /* Sweep gradient */
        transform: scale(1.005) skewX(1deg); /* Reverse skew */
        box-shadow: inset 0 0 8px rgba(255, 165, 0, 0.3); /* Shift glow color */
    }
    100% {
        background: transparent; /* Fade back */
        background-position: -100% 0;
        transform: scale(1) skewX(0);
        box-shadow: none;
    }
}

`;

    // --- Apply Styles and Cleanup ---

    // Add styles to the style element (Cleanup is now handled by loadThemeScript)
    styleSheet.textContent = cssStyles; // Modern way to add CSS text

    // Append style element to head
    document.head.appendChild(styleSheet);

    console.log("Solar Flare & Plasma (Dark) theme applied."); // Confirmation message

})(); // End of IIFE