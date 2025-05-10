(function () { // Start of IIFE

    const themeId = 'dynamic-styles-cosmic-bloom';

    // Dynamic CSS Injection for Earthquake Tracker - Cosmic Bloom Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal

    // Color Palette (Cosmic Bloom)
    const deepSpaceBlue = '#0B0033';     // Main dark background
    const nebulaPurple = '#3D2C8D';    // Darker containers, mid-tones
    const starViolet = '#907AD6';      // Lighter purple accents, borders
    const cometWhite = '#F0F0FF';      // Primary text (off-white/lavender)
    const stardustGray = '#C0C0E0';    // Secondary text
    const textDim = '#A0A0CC';         // Dimmer text
    const bloomMagenta = '#FF00A0';    // Primary accent (buttons, highlights)
    const electricBlue = '#00BFFF';    // Secondary accent (info headers, signal)
    const novaGold = '#FFD700';        // Tertiary accent (magnitude, progress)
    const tooltipBg = 'rgba(61, 44, 141, 0.95)'; // nebulaPurple transparent
    const iconFilter = 'invert(90%) sepia(20%) saturate(800%) hue-rotate(220deg) brightness(1.1) contrast(100%)'; // Light, purplish tint

    // --- Define the primary button background color here for reuse ---
    const sidebarButtonBg = bloomMagenta;
    const sidebarButtonText = cometWhite; // Light text on magenta button
    const sidebarButtonHoverBg = '#D90086'; // Darker Magenta for hover
    const sidebarButtonHoverText = cometWhite;

    // CSS styles as a template literal
    const cssStyles = `
/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Font Import */
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap"); /* Futuristic, slightly condensed Sans-Serif */

/* Body Styles */
body {
    font-family: 'Rajdhani', sans-serif; /* Apply the font */
    background-color: ${deepSpaceBlue}; /* Deep space background */
    font-size: 13px; /* Rajdhani can be a bit smaller */
    line-height: 1.6;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    color: ${cometWhite}; /* Light text */
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
    padding: 7px 14px;
    text-align: left;
    border-bottom: 1px solid ${nebulaPurple}; /* Darker purple border */
}

th {
    background-color: ${nebulaPurple}; /* Darker purple header */
    color: ${electricBlue}; /* Electric blue header text */
    font-weight: 700; /* Bold */
    border-bottom-width: 2px;
    border-bottom-color: ${electricBlue}; /* Electric blue border */
    letter-spacing: 0.5px;
    text-shadow: 0 0 3px ${electricBlue};
}

td {
    color: ${stardustGray}; /* Lighter gray text for data */
}

/* --- Style for Table Heading --- */
.tableContainer h3.table-heading {
    color: ${bloomMagenta};
    text-align: center;
    margin-bottom: 18px;
    font-size: 1.6em; /* Prominent and cosmic */
    font-weight: 700; /* Bold */
    border-bottom: 2px dashed ${starViolet}; /* Dashed violet border */
    padding-bottom: 12px;
    letter-spacing: 1px;
    text-shadow: 0 0 8px ${bloomMagenta};
    background-color: transparent;
}
/* --- End Table Heading Style --- */


/* Map Container */
.map {
    width: 65%;
    height: 100%;
    position: relative;
    background: ${nebulaPurple}; /* Dark purple for map */
    border-right: 1px solid ${starViolet}; /* Violet border */
    border-radius: 0;
}

/* Table Container */
.tableContainer {
    width: 35%;
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    background-color: ${deepSpaceBlue}; /* Main Background */
    border-left: 1px solid ${nebulaPurple}; /* Dark purple border */
    border-radius: 0;
}

/* Card Component (Cosmic Bloom) */
.card {
    background: ${nebulaPurple}; /* Dark purple container */
    border: 1px solid ${starViolet}; /* Violet border */
    border-left: 5px solid ${bloomMagenta}; /* Magenta accent */
    border-radius: 5px; /* Soft rounding */
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(11, 0, 51, 0.5); /* Shadow + Inner Glow */
    color: ${cometWhite};
}

/* Info Div Alignment */
#earthquakeInfo p,
#weatherInfo p {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    line-height: 1.6;
    color: ${stardustGray}; /* Lighter gray */
}

#earthquakeInfo p img,
#weatherInfo p img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Purplish icons */
}

#earthquakeInfo h3,
#weatherInfo h3 {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid ${electricBlue}; /* Electric blue accent border */
    padding-bottom: 9px;
    font-weight: 700;
    font-size: 1.25em;
    color: ${cometWhite}; /* Light header text */
    text-shadow: 0 0 5px ${electricBlue};
    background-color: transparent;
}

#earthquakeInfo h3 img,
#weatherInfo h3 img {
    margin-right: 10px;
    flex-shrink: 0;
    filter: ${iconFilter}; /* Purplish icons */
}

/* Sidebar Styles */
.sidebar {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: ${nebulaPurple}; /* Dark purple bg */
    overflow-x: hidden;
    transition: 0.3s ease-out;
    padding-top: 0; /* Adjusted to accommodate heading */
    box-shadow: 3px 0 12px rgba(0, 0, 0, 0.4); /* Stronger shadow */
    border-right: 1px solid ${starViolet};
    border-radius: 0;
}

.sidebar-heading {
    color: ${sidebarButtonText}; /* Match button text */
    background-color: ${sidebarButtonBg}; /* Match button background */
    font-size: 1.3em;
    font-weight: 700;
    padding: 15px 20px; /* Good padding */
    margin-bottom: 20px; /* User request */
    text-align: center;
    letter-spacing: 0.8px;
    text-shadow: 0 0 4px rgba(0,0,0,0.5); /* Shadow for depth */
    /* border-bottom: 1px solid ${starViolet}; */ /* Optional: if needed with bg */
}

.sidebar a {
    padding: 11px 22px;
    text-decoration: none;
    color: ${stardustGray}; /* Lighter gray */
    display: block;
    transition: background-color 0.2s, color 0.2s, border-left-color 0.2s, text-shadow 0.2s;
    font-weight: 600; /* Semi-bold for links */
    border-radius: 4px;
    margin: 2px 10px;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    color: ${cometWhite}; /* Bright text on hover */
    background-color: rgba(255, 0, 160, 0.15); /* Subtle magenta wash */
    border-left-color: ${bloomMagenta};
    text-shadow: 0 0 5px ${bloomMagenta};
}

.sidebar .closebtn {
    position: absolute;
    top: 0px; /* Align with top of heading */
    right: 0px; /* Align with right of heading */
    font-size: 22px; /* Adjust for visual balance */
    color: ${sidebarButtonText}; /* Match button text */
    background-color: ${sidebarButtonBg}; /* Match button background */
    text-decoration: none;
    transition: color 0.2s, background-color 0.2s, text-shadow 0.2s;
    padding: 15px 18px; /* Match heading padding for alignment */
    line-height: 1.3em; /* Match heading line-height for vertical centering */
    border-bottom-left-radius: 5px; /* Optional rounding */
    text-shadow: 0 0 4px rgba(0,0,0,0.5);
}
.sidebar .closebtn:hover {
    color: ${sidebarButtonHoverText}; /* Match button hover text */
    background-color: ${sidebarButtonHoverBg}; /* Match button hover background */
    text-shadow: 0 0 6px rgba(0,0,0,0.7);
}

/* --- Sidebar Section Button Styling (Cosmic Bloom) --- */
.sidebar-section button {
    background-color: ${sidebarButtonBg};
    color: ${sidebarButtonText};
    border: 1px solid ${starViolet}; /* Subtle border */
    padding: 9px 16px; /* Good padding */
    border-radius: 5px; /* Soft rounding */
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
    margin-top: 10px;
    display: inline-block;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255,0,160,0.4); /* Shadow + Magenta Glow */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.sidebar-section button:hover {
    background-color: ${sidebarButtonHoverBg};
    color: ${sidebarButtonHoverText};
    border-color: ${bloomMagenta};
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.4), 0 0 15px rgba(217,0,134,0.6);
    transform: translateY(-1px);
}
/* --- End Sidebar Section Button Styling --- */


/* Hamburger Button Styles */
.hamburger-btn {
    cursor: pointer;
    background: linear-gradient(145deg, ${bloomMagenta}, ${electricBlue}); /* Magenta to Blue */
    color: ${deepSpaceBlue}; /* Dark Text */
    padding: 10px 14px;
    border: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1002;
    border-radius: 5px; /* Soft rounding */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.35), 0 0 12px rgba(255,0,160,0.5); /* Shadow + Glow */
}

.hamburger-btn:hover {
    background: linear-gradient(145deg, ${electricBlue}, ${novaGold}); /* Blue to Gold */
    color: ${deepSpaceBlue};
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.45), 0 0 18px rgba(0,191,255,0.7);
    transform: translateY(-1px);
}

/* Tooltip Styles */
.ol-tooltip {
    position: relative;
    background: ${tooltipBg}; /* Dark purple transparent */
    backdrop-filter: blur(3px);
    border-radius: 4px; /* Subtle rounding */
    color: ${electricBlue}; /* Electric blue text */
    padding: 7px 11px;
    white-space: nowrap;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
    border: 1px solid ${electricBlue}; /* Electric blue border */
    font-weight: 600;
    text-shadow: 0 0 5px ${electricBlue};
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
    border-color: ${electricBlue} transparent transparent transparent; /* Match border color */
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
    background-color: rgba(0, 191, 255, 0.8); /* Electric Blue, semi-transparent */
    border-radius: 50%;
    display: none;
    pointer-events: none;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.6);
    border: none;
}

.signal-overlay.active {
    display: block;
    animation: pulse-signal-cosmic 1.4s infinite ease-out;
}

/* Separate keyframes for cosmic pulse */
@keyframes pulse-signal-cosmic {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(0, 191, 255, 0.7);
        opacity: 0.9;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.9);
        box-shadow: 0 0 12px 20px rgba(0, 191, 255, 0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.9);
        box-shadow: 0 0 4px 2px rgba(0, 191, 255, 0);
        opacity: 0;
    }
}


/* Earthquake Magnitude Colors (Cosmic Bloom) */
.low-magnitude {
    background-color: rgba(0, 191, 255, 0.08); /* Subtle Electric Blue */
    border-left: 4px solid ${electricBlue};
    color: ${stardustGray};
}

.moderate-magnitude {
    background-color: rgba(144, 122, 214, 0.1); /* Subtle Star Violet */
    border-left: 4px solid ${starViolet};
    color: ${stardustGray};
}

.high-magnitude {
    background-color: rgba(255, 215, 0, 0.12); /* Subtle Nova Gold */
    border-left: 4px solid ${novaGold};
    color: ${cometWhite};
}

.very-high-magnitude {
    background-color: rgba(255, 0, 160, 0.15); /* Subtle Bloom Magenta */
    border-left: 4px solid ${bloomMagenta};
    color: ${cometWhite};
}

/* Progress Bar */
.progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 0, 51, 0.94); /* deepSpaceBlue transparent */
    backdrop-filter: blur(4px); /* Optional blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s;
}

.progress-content {
    background: ${nebulaPurple}; /* Dark purple container */
    padding: 30px 40px;
    border-radius: 6px; /* Rounded corners */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255,0,160,0.3); /* Shadow + Magenta Glow */
    text-align: center;
    width: 330px;
    color: ${cometWhite}; /* Light Text */
    border: 1px solid ${starViolet}; /* Violet Border */
}

#progress-message {
    margin-bottom: 18px;
    color: ${electricBlue}; /* Electric blue message text */
    font-weight: 600;
    text-shadow: 0 0 4px ${electricBlue};
}

#progress-bar-visual-container {
    width: 100%;
    height: 12px; /* Festive bar height */
    background-color: ${deepSpaceBlue}; /* Darkest Background */
    border-radius: 6px; /* Rounded */
    overflow: hidden;
    margin: 18px 0;
    border: 1px solid ${starViolet};
}

#progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, ${bloomMagenta}, ${electricBlue}, ${novaGold}); /* Cosmic Gradient */
    background-size: 200% 100%;
    animation: animate-gradient-cosmic 5s linear infinite;
    border-radius: 6px; /* Rounded */
    transition: width 0.25s ease-out;
    box-shadow: 0 0 8px ${bloomMagenta};
}

@keyframes animate-gradient-cosmic {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

#progress-percentage {
    font-weight: 700;
    color: ${bloomMagenta}; /* Magenta Text */
    text-shadow: 0 0 5px ${bloomMagenta};
}

/* Fixed Info Divs Positioning & Styling (Cosmic Bloom) */
.earthquakeInfo, .weatherInfo, .log {
    position: fixed;
    left: 80px;
    width: auto;
    max-width: 390px;
    height: auto;
    padding: 18px;
    z-index: 10;
    border: 1px solid ${starViolet}; /* Violet Border */
    border-radius: 6px; /* Rounded corners */
    background-color: rgba(61, 44, 141, 0.92); /* nebulaPurple transparent */
    backdrop-filter: blur(3px); /* Subtle blur */
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.35);
    color: ${cometWhite}; /* Light text */
}

.earthquakeInfo {
    top: 80px;
    border-left: 4px solid ${electricBlue};
}

.weatherInfo {
    top: 380px; /* Adjusted for 40px margin from a typical earthquakeInfo height */
    margin-top: 0; /* Explicitly set to 0 as top positioning handles the gap */
    border-left: 4px solid ${novaGold};
}

.log {
    position: fixed;
    bottom: 10px;
    left: 80px;
    width: auto;
    height: 115px;
    overflow-y: auto;
    background-color: rgba(11, 0, 51, 0.92); /* deepSpaceBlue transparent */
    border: 1px solid ${nebulaPurple}; /* Subtle border */
    border-radius: 4px;
    padding: 10px 14px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.25);
    color: ${textDim}; /* Dimmer text log text */
    line-height: 1.5;
}

/* Hidden class for Progress Bar */
.progress-overlay.hidden {
    opacity: 0;
    pointer-events: none; /* Prevent interaction when hidden */
}

/* Style for new earthquake row highlight */
.new-earthquake-row {
    animation: highlight-row-cosmic 2.8s ease-out forwards;
}

/* Separate keyframes for cosmic highlight (glowing pulse) */
@keyframes highlight-row-cosmic {
    0% {
        background-color: rgba(255, 0, 160, 0.1); /* Magenta glow */
        box-shadow: inset 0 0 10px rgba(255, 0, 160, 0.3);
    }
    50% {
        background-color: rgba(0, 191, 255, 0.1); /* Blue glow */
        box-shadow: inset 0 0 10px rgba(0, 191, 255, 0.4);
    }
    100% {
        background-color: transparent; /* Fade back */
        box-shadow: none;
    }
}

`;

    // --- Apply Styles and Cleanup ---

    // Add styles to the style element
    styleSheet.textContent = cssStyles;

    // Append style element to head
    document.head.appendChild(styleSheet);

    console.log("Cosmic Bloom (Dark) theme applied."); // Confirmation message

})(); // End of IIFE
