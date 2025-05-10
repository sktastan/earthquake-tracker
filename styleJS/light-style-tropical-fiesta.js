(function () { // Start of IIFE

    const themeId = 'dynamic-styles-tropical-fiesta';

    // Dynamic CSS Injection for Earthquake Tracker - Tropical Fiesta Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Tropical Fiesta)
    const bgBase = '#FFF8E1';         // Light Sandy Beige/Cream
    const containerBg = '#FFFFFF';    // Clean White for containers
    const borderLight = '#FFE0B2';    // Light Mango/Peach Border
    const borderFocus = '#FFCC80';    // Medium Mango/Peach for focus
    const textPrimary = '#4E342E';   // Dark Warm Brown
    const textSecondary = '#795548'; // Medium Warm Brown
    const textDim = '#A1887F';       // Light Warm Brown/Beige
    const accentLimeGreen = '#A6D785'; // Vibrant Lime Green
    const accentMangoOrange = '#FFB347';// Vibrant Mango Orange
    const accentHibiscusPink = '#FF69B4';// Vibrant Hibiscus Pink
    const accentPineappleYellow = '#FFEE93'; // Subtle Pineapple Yellow (added)
    const accentOceanBlue = '#50C878';  // Vibrant Seafoam Green/Blue (more green)
    const tooltipBg = 'rgba(78, 52, 46, 0.95)'; // Dark Brown, slightly transparent
    const tooltipText = bgBase;
    const iconFilter = 'sepia(0.2) saturate(1.1) brightness(0.9)'; // Warm, slightly desaturated icons

    // --- Define the primary button background color here for reuse ---
    // For this theme, sidebar buttons will have a solid accentMangoOrange background.
    const sidebarButtonBg = accentMangoOrange;
    const sidebarButtonText = textPrimary; // Dark text on orange button
    const sidebarButtonHoverBg = '#FFA000'; // Darker Mango for hover
    const sidebarButtonHoverText = bgBase;

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"); /* Modern, Playful Sans-Serif */

/* Body Styles */
body {
    font-family: 'Montserrat', sans-serif; /* Apply the font */
    background-color: ${bgBase}; /* Light sandy beige background */
    font-size: 13px; /* Energetic and readable */
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${textPrimary}; /* Dark warm brown text */
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
    border-bottom: 1px solid ${borderLight}; /* Light mango border */
}

th {
    background-color: ${accentLimeGreen}33; /* Subtle LimeGreen wash */
    color: ${textPrimary}; /* Dark brown header text */
    font-weight: 700; /* Bold */
    border-bottom-width: 2px;
    border-bottom-color: ${borderFocus}; /* Medium mango border */
    letter-spacing: 0.4px;
}

td {
    color: ${textSecondary}; /* Medium warm brown text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${accentMangoOrange};
    text-align: center;
    margin-bottom: 18px;
    font-size: 1.6em; /* Bold and festive */
    font-weight: 700; /* Bold */
    border-bottom: 2px solid ${accentHibiscusPink}; /* Pink border */
    padding-bottom: 12px;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.08);
    background-color: transparent;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${accentLimeGreen}22; /* Very subtle lime green for map */
    border-right: 1px solid ${borderLight}; /* Light mango border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${bgBase}; /* Main Background */
    border-left: 1px solid ${borderLight}; /* Light mango border */
    border-radius: 0;
}

/* Card Component (Tropical Fiesta) */
.card {
    background: ${containerBg}; /* White container */
    border: 1px solid ${borderLight}; /* Light mango border */
    border-left: 5px solid ${accentMangoOrange}; /* Mango accent */
    border-radius: 6px; /* Soft rounding */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.07); /* Soft shadow */
    color: ${textPrimary};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${textSecondary}; /* Medium warm brown */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Warm icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid ${accentHibiscusPink}; /* Pink accent border */
    padding-bottom: 9px;
    font-weight: 700;
    font-size: 1.25em;
    color: ${accentMangoOrange}; /* Mango header text */
    background-color: transparent;
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Warm icons */
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
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
    border-right: 1px solid ${borderLight};
    border-radius: 0;
}

.sidebar-heading {
    color: ${sidebarButtonText}; /* Match button text color */
    background-color: ${sidebarButtonBg}; /* Match button background */
    font-size: 1.25em;
    font-weight: 700;
    padding: 12px 20px; /* Adjusted padding */
    margin-bottom: 20px; /* User request */
    text-align: center;
    letter-spacing: 0.5px;
    border-bottom: 1px solid ${borderFocus}; /* Add a subtle separator if bg is light */
}

.sidebar a {
    padding: 11px 22px;
    text-decoration: none;
    color: ${textSecondary}; /* Medium warm brown */
    display: block;
    transition: background-color 0.2s, color 0.2s, border-left-color 0.2s;
    font-weight: 600; /* Semi-bold for links */
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${accentMangoOrange}; /* Mango accent on hover */
    background-color: rgba(255, 179, 71, 0.08); /* Very subtle mango wash */
    border-left-color: ${accentMangoOrange};
}

.sidebar .closebtn {
    position: absolute;
    top: 0px; /* Align with top of heading */
    right: 0px; /* Align with right of heading */
    font-size: 20px; /* Adjust for visual balance with bg */
    color: ${sidebarButtonText}; /* Match button text color */
    background-color: ${sidebarButtonBg}; /* Match button background */
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s;
    padding: 12px 15px; /* Match heading padding for alignment */
    border-bottom-left-radius: 4px; /* Optional: round corner */
    line-height: 1.25em; /* Match heading line-height for vertical centering */
}
.sidebar .closebtn:hover {
    color: ${sidebarButtonHoverText}; /* Match button hover text */
    background-color: ${sidebarButtonHoverBg}; /* Match button hover background */
}

/* --- Sidebar Section Button Styling (Tropical Fiesta) --- */
.sidebar-section button {
    background-color: ${sidebarButtonBg};
    color: ${sidebarButtonText};
    border: none;
    padding: 9px 16px; /* Festive padding */
    border-radius: 5px; /* Soft rounding */
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12); /* Soft shadow */
    text-shadow: 1px 1px 1px rgba(0,0,0,0.05);
}

.sidebar-section button:hover {
    background-color: ${sidebarButtonHoverBg};
    color: ${sidebarButtonHoverText};
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.18);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${accentMangoOrange}, ${accentHibiscusPink}); /* Mango to Pink */
    color: ${bgBase}; /* Light Cream Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1002;
    border-radius: 5px; /* Soft rounding */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.18); /* Soft shadow */
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${accentLimeGreen}, ${accentOceanBlue}); /* Lime to Ocean */
    color: ${textPrimary};
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.22);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark brown, slightly transparent */
    border-radius: 4px; /* Subtle rounding */
    color: ${tooltipText}; /* Light text */
    padding: 7px 11px;
    white-space: nowrap;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
    border: 1px solid ${textSecondary}; /* Medium brown border */
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
    border-color: ${textSecondary} transparent transparent transparent; /* Match border color */
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
    background-color: rgba(255, 105, 180, 0.75); /* Hibiscus Pink, semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.5);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-fiesta 1.4s infinite ease-out;
}

/* Separate keyframes for fiesta pulse */
@keyframes pulse-signal-fiesta {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 3px 2px rgba(255, 105, 180, 0.6);
        opacity: 0.85;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.8);
        box-shadow: 0 0 10px 18px rgba(255, 105, 180, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 3px 2px rgba(255, 105, 180, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Tropical Fiesta) */
.low-magnitude {
    background-color: rgba(166, 215, 133, 0.1); /* Subtle LimeGreen */
    border-left: 4px solid ${accentLimeGreen};
    color: ${textSecondary};
}

.moderate-magnitude {
    background-color: rgba(255, 238, 147, 0.12); /* Subtle PineappleYellow */
    border-left: 4px solid ${accentPineappleYellow};
    color: ${textSecondary};
}

.high-magnitude {
    background-color: rgba(255, 179, 71, 0.15); /* Subtle MangoOrange */
    border-left: 4px solid ${accentMangoOrange};
    color: ${textPrimary};
}

.very-high-magnitude {
    background-color: rgba(255, 105, 180, 0.15); /* Subtle HibiscusPink */
    border-left: 4px solid ${accentHibiscusPink};
    color: ${textPrimary};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 248, 225, 0.93); /* bgBase transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s;
}

.progress-content {
    background: ${containerBg}; /* White container */
    padding: 30px 40px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
    text-align: center;
    width: 320px;
    color: ${textPrimary}; /* Dark Text */
    border: 1px solid ${borderLight}; /* Light Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${accentMangoOrange}; /* Mango message text */
    font-weight: 600;
}

#progress-bar-visual-container {
    width: 100%;
    height: 12px; /* Festive bar height */
    background-color: ${borderLight}; /* Light Mango Background */
    border-radius: 6px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${borderFocus};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${accentMangoOrange}, ${accentHibiscusPink}, ${accentLimeGreen}); /* Fiesta Gradient */
    background-size: 200% 100%;
    animation: animate-gradient-fiesta 4s linear infinite;
    border-radius: 6px; /* Rounded */
    transition: width 0.25s ease-out;
    box-shadow: none;
}

@keyframes animate-gradient-fiesta {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 700;
    color: ${accentMangoOrange}; /* Mango Text */
}

/* Fixed Info Divs Positioning & Styling (Tropical Fiesta) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 390px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${borderLight}; /* Light Border */
    border-radius: 6px; /* Rounded corners */
    background-color: ${containerBg}; /* White container */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    color: ${textPrimary}; /* Dark text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${accentOceanBlue};
}

.weatherInfo {
    top: 420px; /* Adjusted for 40px margin from a typical earthquakeInfo height */
    margin-top: 0; /* Explicitly set to 0 as top positioning handles the gap */
    border-left: 4px solid ${accentLimeGreen};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 115px;
    overflow-y: auto;
    background-color: ${accentLimeGreen}22; /* Very subtle lime green */
    border: 1px solid ${borderFocus}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 14px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
    color: ${textSecondary}; /* Medium warm brown log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-fiesta 2.5s ease-out forwards;
}

/* Separate keyframes for fiesta highlight (warm color pulse) */
@keyframes highlight-row-fiesta {
    0% {
        background-color: rgba(255, 179, 71, 0.2); /* Mango wash */
    }
    50% {
        background-color: rgba(255, 105, 180, 0.15); /* Pink wash */
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

    console.log("Tropical Fiesta (Light) theme applied."); // Confirmation message

})(); // End of IIFE
