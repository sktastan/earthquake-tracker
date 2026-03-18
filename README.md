# Earthquake Tracker

A comprehensive web application for tracking earthquake activity in real-time, visualizing data on an interactive map, and providing local weather context for the latest events.

## Features

- **Multi-Source Data**: Aggregates earthquake data from both [USGS](https://earthquake.usgs.gov/) and [EMSC](https://www.seismicportal.eu/).
- **Interactive Map**: Built with [OpenLayers](https://openlayers.org/), featuring dynamic markers scaled by magnitude, tooltips, and signal animations for the most recent event.
- **Advanced Filtering**:
  - Filter by Minimum/Maximum Magnitude.
  - Filter by Date Range.
  - **Geospatial Filtering**: Limit results to a specific geographic bounding box.
- **Map Interaction**:
  - **Bounding Box Tool**: Hold the `CTRL` key and move your mouse to view the current map view boundaries. Releasing the key captures these bounds to filter data.
  - Click markers to view detailed information.
- **Weather Integration**: Fetches real-time weather data (Temperature, Humidity, Wind, etc.) for the location of the most recent earthquake using the MET Norway API.
- **Dynamic Theming**: Includes a robust theming engine with multiple built-in styles that change both the UI and the Map tiles:
  - *Chromatic Glass* (Light)
  - *Retro Terminal* (Dark)
  - *Solid Mint* (Light)
  - *Solid Peach* (Light)
  - *Shadow Onyx* (Dark)
  - And more...
- **Responsive Design**:
  - **Desktop**: Collapsible sidebar controls, fixed info panels, and a data table.
  - **Mobile**: Bottom navigation bar for easy switching between Map, Info, and Data views.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/earthquake-tracker.git
    ```
2.  **Open the application**:
    - Simply open `index.html` in a modern web browser.
    - *Note*: While the application works directly from the file system, using a local development server (e.g., Live Server for VS Code, Python `http.server`) is recommended to ensure all browser features and APIs function correctly without CORS limitations.

## Usage

### Sidebar Controls
Click the hamburger menu (`☰`) (top-left on desktop) to open the sidebar.
- **Theme**: Select a visual theme from the dropdown. This updates the UI colors and the underlying map provider.
- **Map Area**:
  - **Get Current Map Area**: Populates the coordinate inputs with the current map view.
  - **Use Current Map Area**: Immediately filters earthquake data to what you see on the screen.
  - **Clear Map Area Filter**: Resets the spatial filter.
- **Filters**: Set Magnitude limits, result limits, and date ranges.
- **Update**: Click "Update & Refetch" to apply changes.

### Data Table
The right-hand side (or toggleable view on mobile) displays a list of all fetched earthquakes. The first row is often highlighted to indicate the most recent event found.

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Mapping Library**: OpenLayers (v10.5.0).
- **APIs**:
  - USGS Earthquake Hazards Program
  - EMSC (European-Mediterranean Seismological Centre)
  - MET Norway (Weather)

## Directory Structure

```text
earthquake-tracker/
├── css/
│   └── style.css           # Core application styles
├── img/                    # SVG Icons
├── js/
│   ├── earthquake.js       # Data fetching and processing logic
│   ├── openStreetMap.js    # OpenLayers map initialization and interaction
│   ├── script.js           # Main application controller
│   ├── ui.js               # UI manipulation and event handling
│   └── weather.js          # Weather data fetching
├── styleJS/                # Dynamic theme scripts (injected at runtime)
│   ├── light-style-chromatic-glass.js
│   ├── dark-style-retro-terminal.js
│   └── ...
└── index.html              # Entry point
```

## Credits

- Earthquake data provided by **USGS** and **EMSC**.
- Weather data provided by **MET Norway**.
- Map tiles provided by various services (OpenStreetMap, Jawg Maps, Stadia Maps, Esri, Geoportail France) depending on the selected theme.
