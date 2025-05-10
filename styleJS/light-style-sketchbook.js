(function() { // Start of IIFE

    const themeId = 'dynamic-styles-sketchbook';
    
    // Dynamic CSS Injection for Earthquake Tracker - Minimalist Sketchbook Theme
    const styleSheet = document.createElement('style');
    styleSheet.id = `${themeId}-styles`; // Unique ID for the style tag
    styleSheet.classList.add('dynamic-theme-style-sheet'); // Add common class for removal
    
    // Color Palette (Minimalist Sketchbook)
    const sketchBg = '#F8F8F6';        // Slightly warm off-white paper
    const containerBg = 'rgba(240, 240, 238, 0.8)'; // Very light gray, semi-transparent wash
    const borderSubtle = '#DCDCDC';    // Light pencil gray
    const borderAccent = '#B8B8B8';    // Medium pencil gray
    const textPrimary = '#4A4A4A';   // Dark charcoal gray
    const textSecondary = '#7A7A7A'; // Medium gray
    const textDim = '#A0A0A0';       // Light gray
    const washTeal = '#A0D2DB';      // Muted Teal wash
    const washCoral = '#F5BCA9';     // Soft Coral wash
    const washYellow = '#FDECC8';    // Pale Yellow wash
    const washHighlight = '#8EC1C9'; // Slightly brighter Teal (Accent)
    const tooltipBg = 'rgba(248, 248, 246, 0.92)'; // sketchBg semi-transparent
    const iconFilter = 'grayscale(0.5) contrast(0.5) brightness(0.7)'; // Desaturated, slightly darker
    
    // CSS styles as a template literal
    const cssStyles = `
    /* Global Styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    /* Font Import */
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"); /* Clean, Rounded Sans-Serif */
    
    /* Body Styles */
    body {
        font-family: 'Poppins', sans-serif; /* Apply the font */
        background-color: ${sketchBg}; /* Paper background */
        /* Optional: Subtle texture */
        /* background-image: url('path/to/subtle-paper-texture.png'); */
    font-size: 12px;
        line-height: 1.6;
        display: flex;
        flex-direction: row; /* Default for desktop */
        height: 100vh;
        overflow: hidden; /* Prevent scrolling on body for desktop */
        color: ${textPrimary}; /* Dark text */
        font-weight: 400; /* Regular weight */
    }
    
    /* Table Styles */
    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    th, td {
        padding: 4px 14px; /* Slightly reduced padding */
        text-align: left;
        border-bottom: 1px solid ${borderSubtle}; /* Subtle border */
    }
    
    th {
        background-color: rgba(240, 240, 238, 0.5); /* Very light wash */
        color: ${textSecondary}; /* Medium gray header text */
        font-weight: 600; /* Semi-bold */
        border-bottom-width: 1px; /* Thinner header border */
        border-bottom-color: ${borderAccent}; /* Slightly darker border */
        letter-spacing: 0.5px;
    }
    
    td {
        color: ${textSecondary}; /* Medium gray text for data */
    }
    
    /* --- Style for Table Heading --- */
    .tableContainer h3.table-heading {
        color: ${textPrimary};
        background: linear-gradient(90deg, ${washTeal}, ${washHighlight});
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent; /* Make text transparent to show gradient */
        text-align: center;
        margin-bottom: 16px;
        font-size: 1.4em; /* Slightly smaller */
        font-weight: 600;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.03); /* Very subtle shadow */
        border-bottom: 1px dashed ${borderSubtle};
        padding-bottom: 10px;
        letter-spacing: 0.5px;
        /* Add padding top to avoid overlap with minimize button */
        padding-top: 25px;
        position: relative; /* Needed if button is inside h3 */
    }
    /* --- End Table Heading Style --- */
    
    
    /* Map Container */
    .map {
        width: 65%; /* Default width */
        height: 100%; /* Default height */
        position: relative;
        background: ${sketchBg}; /* Paper background */
        border-right: 1px solid ${borderSubtle}; /* Subtle border */
        border-radius: 0;
    }
    
    /* Table Container */
    .tableContainer {
        width: 35%; /* Default width */
        height: 100%; /* Default height */
        overflow-y: auto;
        padding: 15px;
        background-color: ${sketchBg}; /* Main Background */
        border-left: 1px solid ${borderSubtle}; /* Subtle border */
        border-radius: 0;
        position: relative; /* Needed for minimize button */
        transition: height 0.3s ease-out, padding 0.3s ease-out; /* Smooth transition */
    }
    
    /* Card Component (Sketchbook) */
    .card {
        background: ${containerBg}; /* Semi-transparent Wash */
        backdrop-filter: blur(3px); /* Subtle blur */
        border: 1px solid ${borderSubtle}; /* Light border */
        border-radius: 4px; /* Slightly rounded corners */
        padding: 15px;
        margin: 10px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* Very soft shadow */
        color: ${textPrimary};
    }
    
    /* Info Div Alignment */
    #earthquakeInfo p,
    #weatherInfo p {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        line-height: 1.5;
        color: ${textSecondary}; /* Medium gray */
    }
    
    #earthquakeInfo p img,
    #weatherInfo p img {
        margin-right: 8px;
        flex-shrink: 0;
        filter: ${iconFilter}; /* Desaturated icons */
    }
    
    #earthquakeInfo h3,
    #weatherInfo h3 {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        border-bottom: 1px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to right, ${washTeal}, ${borderSubtle}); /* Wash to subtle border */
        padding-bottom: 8px;
        font-weight: 600;
        font-size: 1.1em;
        color: ${textPrimary}; /* Dark header text */
        /* Add padding top to avoid overlap with minimize button */
        padding-top: 25px;
    }
    
    #earthquakeInfo h3 img,
    #weatherInfo h3 img {
        margin-right: 8px;
        flex-shrink: 0;
        filter: ${iconFilter}; /* Desaturated icons */
    }
    
    /* Sidebar Styles */
    .sidebar {
        height: 100%;
        width: 0; /* Controlled by JS */
        position: fixed;
        z-index: 1001;
        top: 0;
        left: 0;
        background-color: ${containerBg}; /* Semi-transparent Wash */
        backdrop-filter: blur(5px); /* Blur */
        overflow-x: hidden;
        transition: 0.3s;
        padding-top: 50px; /* Reduced padding */
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.07); /* Soft shadow */
        border-right: 1px solid ${borderAccent};
        border-radius: 0;
    }
    
    .sidebar a {
        padding: 10px 20px; /* Reduced padding */
        text-decoration: none;
        display: block;
        transition: background 0.2s, color 0.2s, border-left 0.2s;
        font-weight: 500; /* Medium weight */
        border-radius: 3px;
        margin: 1px 8px;
        border-left: 3px solid transparent; /* Placeholder */
    }
    
    .sidebar a:hover {
        color: ${textPrimary}; /* Dark text on hover */
        background: linear-gradient(90deg, rgba(160, 210, 219, 0.2), rgba(220, 220, 220, 0.15)); /* Subtle gradient bg */
        border-left: 3px solid ${washTeal}; /* Teal accent line */
    }
    
    /* --- Sidebar Section Button Styling (Sketchbook) --- */
    .sidebar-section button, button#updateSettingsBtn {
        background: linear-gradient(145deg, ${washTeal}, ${washHighlight}); /* Teal Gradient */
        color: ${textPrimary}; /* Dark text */
        border: 1px solid ${borderAccent};
        padding: 7px 12px; /* Smaller padding */
        border-radius: 3px; /* Slightly rounded corners */
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        margin-top: 10px;
        display: inline-block;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06); /* Very soft shadow */
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    }
    
    .sidebar-section button:hover, button#updateSettingsBtn:hover {
        background: linear-gradient(145deg, ${washCoral}, ${washYellow}); /* Coral to Yellow Gradient on Hover */
        color: ${textPrimary};
        border-color: ${washCoral};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* Slightly stronger shadow */
        transform: translateY(-1px);
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    }
    /* --- End Sidebar Section Button Styling --- */
    
    
    /* Hamburger Button Styles */
    .hamburger-btn {
        cursor: pointer;
        background: linear-gradient(145deg, ${washTeal}, ${washHighlight}); /* Teal Gradient */
        color: ${textPrimary}; /* Dark Text */
        padding: 8px 12px; /* Smaller padding */
        border: 1px solid ${borderAccent};
        position: fixed;
        top: 10px; /* Closer to top */
        left: 10px; /* Closer to left */
        z-index: 1002;
        border-radius: 4px; /* Rounded */
        transition: all 0.2s ease-in-out;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08); /* Soft shadow */
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    }
    
    .hamburger-btn:hover {
        background: linear-gradient(145deg, ${washCoral}, ${washYellow}); /* Coral to Yellow Gradient on Hover */
        color: ${textPrimary};
        border-color: ${washCoral};
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.12); /* Slightly stronger shadow */
        transform: translateY(-1px);
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    }
    
    /* Tooltip Styles */
    .ol-tooltip {
        position: relative;
        background: ${tooltipBg}; /* Paper semi-transparent */
        backdrop-filter: blur(2px); /* Subtle blur */
        border-radius: 3px; /* Rounded corners */
        color: ${textPrimary}; /* Dark text */
        padding: 6px 10px; /* Smaller padding */
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid ${borderAccent}; /* Subtle dark border */
        font-weight: 400;
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
        border-width: 6px 6px 0 6px; /* Triangle size */
        border-color: transparent;
        border-top-color: ${borderAccent}; /* Match border color */
    }
    /* Inner triangle */
    .ol-tooltip::before {
        content: "";
        position: absolute;
        bottom: -6px; /* Inside the border */
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px; /* Slightly smaller */
        border-color: ${tooltipBg} transparent transparent transparent; /* Match background */
        z-index: 1;
    }
    
    
    /* Signal Animation */
    .signal-overlay {
        position: absolute;
        width: 26px; /* Slightly smaller */
        height: 26px;
        background-color: rgba(142, 193, 201, 0.7); /* washHighlight semi-transparent */
        border-radius: 50%;
        display: none;
        pointer-events: none;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 0 rgba(142, 193, 201, 0.5);
        border: none; /* No border */
    }
    
    .signal-overlay.active {
        display: block;
        animation: pulse-signal-sketchbook 1.6s infinite ease-out;
    }
    
    /* Separate keyframes for sketchbook pulse */
    @keyframes pulse-signal-sketchbook {
        0% {
            transform: translate(-50%, -50%) scale(0.9);
            box-shadow: 0 0 4px 2px rgba(142, 193, 201, 0.5);
            opacity: 0.8;
        }
        70% {
            transform: translate(-50%, -50%) scale(1.8);
            box-shadow: 0 0 12px 18px rgba(142, 193, 201, 0);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.9);
            box-shadow: 0 0 4px 2px rgba(142, 193, 201, 0);
            opacity: 0;
        }
    }
    
    
    /* Earthquake Magnitude Colors (Sketchbook) */
    .low-magnitude {
        background-color: rgba(160, 210, 219, 0.1); /* Subtle teal */
        border-left: 3px solid ${washTeal}; /* Teal */
        color: ${textDim};
    }
    
    .moderate-magnitude {
        background-color: rgba(253, 236, 200, 0.12); /* Subtle yellow */
        border-left: 3px solid ${washYellow}; /* Yellow */
        color: ${textDim};
    }
    
    .high-magnitude {
        background-color: rgba(245, 188, 169, 0.15); /* Subtle coral */
        border-left: 3px solid ${washCoral}; /* Coral */
        color: ${textSecondary}; /* Brighter text */
    }
    
    .very-high-magnitude {
        background-color: rgba(142, 193, 201, 0.2); /* Subtle highlight teal */
        border-left: 3px solid ${washHighlight}; /* Highlight Teal */
        color: ${textPrimary}; /* Brightest text */
    }
    
    /* Progress Bar */
    .progress-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(248, 248, 246, 0.9); /* sketchBg transparent */
        backdrop-filter: blur(3px); /* Blur effect */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.4s;
    }
    
    .progress-content {
        background: ${containerBg}; /* Semi-transparent Wash */
        backdrop-filter: blur(5px); /* Stronger blur */
        padding: 25px 35px; /* Smaller padding */
        border-radius: 4px; /* Rounded corners */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Soft shadow */
        text-align: center;
        width: 320px; /* Slightly smaller */
        color: ${textPrimary}; /* Dark Text */
        border: 1px solid ${borderAccent}; /* Subtle Border */
    }
    
    #progress-message {
        margin-bottom: 15px;
        color: ${washTeal}; /* Teal message text */
        font-weight: 500;
    }
    
    #progress-bar-visual-container {
        width: 100%;
        height: 8px; /* Slimmer bar */
        background-color: ${borderSubtle}; /* Light Background */
        border-radius: 4px; /* Rounded */
        overflow: hidden;
        margin: 15px 0;
        border: 1px solid ${borderAccent};
    }
    
    #progress-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, ${washTeal}, ${washCoral}, ${washYellow}); /* Full Wash Gradient */
        background-size: 250% 100%; /* For potential animation */
        border-radius: 4px; /* Rounded */
        transition: width 0.3s ease-out;
        box-shadow: 0 0 5px rgba(245, 188, 169, 0.4); /* Coral glow */
        animation: animate-gradient-wash 7s linear infinite; /* Animate the gradient */
    }
    
    @keyframes animate-gradient-wash {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    #progress-percentage {
        font-weight: 600;
        color: ${textSecondary}; /* Medium Gray Text */
    }
    
    /* Fixed Info Divs Positioning & Styling (Sketchbook) */
    .earthquakeInfo, .weatherInfo, .log {
        /* Ensure relative positioning context for the absolute button */
        position: fixed; /* Default to fixed for desktop */
        left: 80px;      /* Default desktop left */
        width: auto;     /* Default desktop width */
        max-width: 380px; /* Max width */
        height: auto;
        padding: 15px;
        z-index: 10;
        border: 1px solid ${borderAccent}; /* Subtle Border */
        border-radius: 4px; /* Rounded corners */
        background-color: ${containerBg}; /* Semi-transparent wash */
        backdrop-filter: blur(4px); /* Blur effect */
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
        transition: height 0.3s ease-out, padding 0.3s ease-out, border 0.3s ease-out; /* Smooth transition */
        color: ${textPrimary}; /* Dark text */
        /* display: none; Let JS handle initial display based on screen size */
    }
    
    .earthquakeInfo {
        top: 80px; /* Default desktop top */
        border-left: 3px solid ${washTeal};
    }
    
    .weatherInfo {
        top: 410px; /* Default desktop top */
        border-left: 3px solid ${washCoral};
    }
    
    .log {
        bottom: 10px;
        left: 80px; /* Default desktop left */
        /* width: calc(100% - 20px); Let desktop width be auto */
        height: 120px; /* Default height */
        overflow-y: auto;
        background-color: rgba(248, 248, 246, 0.85); /* sketchBg transparent */
        backdrop-filter: blur(2px);
        border: 1px solid ${borderSubtle}; /* Subtle border */
        border-radius: 3px;
        padding: 8px 12px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        color: ${textDim}; /* Muted gray log text */
        line-height: 1.4;
        position: fixed; /* Ensure it's fixed on desktop */
        transition: height 0.3s ease-out, padding 0.3s ease-out; /* Smooth transition */
    }
    
    /* Minimize Button Styling */
    .minimize-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: rgba(184, 184, 184, 0.5); /* Medium pencil gray, semi-transparent */
        border: 1px solid ${borderAccent};
        color: ${textPrimary};
        cursor: pointer;
        line-height: 1;
        padding: 2px 5px;
        border-radius: 3px;
        z-index: 15; /* Ensure it's above content */
        transition: background-color 0.2s;
    }
    
    .minimize-btn:hover {
        background-color: rgba(160, 210, 219, 0.7); /* Teal wash on hover */
    }
    
    /* Minimized State Styling */
    .collapsible-container.minimized {
        height: 30px !important; /* Force small height */
        overflow: hidden;
        padding-top: 0;
        padding-bottom: 0;
        border-width: 1px; /* Keep border */
    }
    
    /* Hide content when minimized (adjust selectors as needed) */
    /* Keep h3 visible, hide other direct children except the button */
    .collapsible-container.minimized > *:not(.minimize-btn):not(h3) {
        display: none;
    }
    
    
    /* Hidden class for Progress Bar */
    .progress-overlay.hidden {
        opacity: 0;
        pointer-events: none; /* Prevent interaction when hidden */
    }
    
    /* Style for new earthquake row highlight */
    .new-earthquake-row {
        animation: highlight-row-sketchbook 2.8s ease-out forwards;
    }
    
    /* Separate keyframes for sketchbook highlight (soft color wash fade) */
    @keyframes highlight-row-sketchbook {
        0% {
            background-color: rgba(160, 210, 219, 0.2); /* Teal wash start */
            box-shadow: inset 0 0 5px rgba(160, 210, 219, 0.25);
            transform: scale(1.003);
        }
        50% {
            background-color: rgba(245, 188, 169, 0.15); /* Coral wash mid */
            box-shadow: inset 0 0 5px rgba(245, 188, 169, 0.2);
            transform: scale(1.003);
        }
        100% {
            background-color: transparent; /* Fade back */
            box-shadow: none;
            transform: scale(1);
        }
    }
    
    /* --- Media Query for Mobile --- */
    @media (max-width: 768px) {
        body {
            flex-direction: column; /* Stack elements vertically */
            overflow: auto; /* Allow body scrolling */
            height: auto; /* Allow body height to grow */
        }
    
        .map {
            width: 100%; /* Full width */
            height: 50vh; /* Half screen height */
            border-right: none;
            border-bottom: 1px solid ${borderSubtle};
        }
    
        .tableContainer {
            width: 100%; /* Full width */
            height: auto; /* Auto height based on content */
            max-height: 50vh; /* Limit height */
            border-left: none;
            overflow-y: auto; /* Ensure scrolling */
            position: relative; /* Ensure relative positioning for button */
        }
    
        .sidebar {
            padding-top: 60px; /* Ensure content below close button */
        }
    
        /* --- Mobile Overrides for Info Divs --- */
    
        /* Show info divs on mobile, adjust positioning */
        .earthquakeInfo, .weatherInfo {
            display: block; /* Show on mobile */
            position: relative; /* Change from fixed */
            left: auto;
            top: auto;
            width: auto; /* Let it fit in sidebar/main content */
            margin: 10px; /* Add margin */
            max-width: none; /* Remove max width */
        }
    
        /* Placeholders in sidebar */
        #sidebar-earthquake-info, #sidebar-weather-info {
            padding: 0 10px; /* Add padding inside sidebar */
        }
    
        .log {
            position: relative; /* Change from fixed */
            bottom: auto; /* Remove bottom positioning */
            left: auto;
            width: auto;
            margin: 10px; /* Add margin */
            height: 100px; /* Shorter height for mobile */
        }
    }
    
    `;
    
    // --- Apply Styles and Cleanup ---
    
    // Add styles to the style element
    styleSheet.textContent = cssStyles;
    
    // Append style element to head
    document.head.appendChild(styleSheet);
    
    console.log("Minimalist Sketchbook (Light) theme applied."); // Confirmation message
    
    })(); // End of IIFE
    
    