class OpenStreetMap {
    constructor() {
          // ------------------------------------------------- //
        // --- Define Map Styles ---
        this.mapStyles = {
            'Default': {
                source: () => new ol.source.OSM({
                    attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    crossOrigin: null // Added for potential CORS issues
                })
            },
            'GeoportailFrance': {
                source: () => new ol.source.XYZ({
                    url: 'https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
                    attributions: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
                    minZoom: 2,
                    maxZoom: 19,
                    crossOrigin: null // Added for potential CORS issues
                })
            },
            'EsriWorldGrayCanvas': {
                source: () => new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                    minZoom: 0,
                    maxZoom: 22,
                    attributions: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    crossOrigin: null
                })
            },
            'StadiaAlidadeSmoothDark': {
                source: () => new ol.source.XYZ({
                    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png',
                    maxZoom: 17,
                    attributions: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    crossOrigin: null
                })
            },
            'EsriWorldImagery': {
                source: () => new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    crossOrigin: null
                })
            },
            'TopPlusOpenColor': {
                source: () => new ol.source.XYZ({
                    url: 'http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png',
                    maxZoom: 19,
                    attributions: 'Map data: &copy; <a href="http://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>',
                    crossOrigin: null
                })
            },
            'TopPlusOpenGrey': {
                source: () => new ol.source.XYZ({
                    url: 'http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png',
                    maxZoom: 18,
                    attributions: 'Map data: &copy; <a href="http://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>',
                    crossOrigin: null
                })
            }
        };

        // --- Setup for Markers ---
        this.markerSource = new ol.source.Vector();
        this.lastEarthquakeMarkerSource = new ol.source.Vector();

        this.lastEarthquakeMarkerLayer = new ol.layer.Vector({ source: this.lastEarthquakeMarkerSource, style: this.createLastEarthquakeMarkerStyle() })
        this.markerLayer = new ol.layer.Vector({
            source: this.markerSource,
            style: this.createMarkerStyle()
        });

        // Set up the OSM layer
        this.myTileServer = new ol.layer.Tile({
            source: new ol.source.OSM({ crossOrigin: null })
        });

        // ------------------------------------------------- //
        // this.myTileServer = new ol.layer.Tile({
        //     source: new ol.source.XYZ({ 
        //         url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        //             minZoom: 0,
        //             maxZoom: 22,
        //             attributions: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        //             crossOrigin: null
        //     })
        // }); // Initial layer uses the default style

        // --- Get Tooltip Element ---
        this.tooltipElement = document.getElementById('tooltip');
        if (!this.tooltipElement) console.error("Tooltip element 'tooltip' not found!");

        // --- Get Signal Animation Element ---
        this.signalElement = document.getElementById('signal-animation');
        if (!this.signalElement) console.error("Signal element 'signal-animation' not found!");

        // --- Create Tooltip Overlay ---
        this.tooltipOverlay = new ol.Overlay({
            element: this.tooltipElement,
            offset: [0, -7],
            positioning: 'bottom-center',
            stopEvent: false,
            autoPan: true,
            autoPanAnimation: { duration: 250 },
        });

        // --- Create Signal Animation Overlay ---
        this.signalOverlay = new ol.Overlay({
            element: this.signalElement,
            offset: [-16, -16],
            positioning: 'center-center',
            stopEvent: false
        });

        // --- Variable to store the signal timeout ---
        this.signalTimeoutId = null;

        // --- NEW: State for CTRL key and captured bounds ---
        this.isCtrlKeyPressed = false;
        this.capturedBounds = null; // Will store {minLat, maxLat, minLon, maxLon}
        // --- END NEW ---

        // Create the map
        this.map = new ol.Map({
            layers: [this.myTileServer, this.markerLayer, this.lastEarthquakeMarkerLayer],
            target: 'map', // Make sure this matches your HTML map div ID
            view: new ol.View({
                center: ol.proj.fromLonLat([10, 45]),
                zoom: 5
            }),
            overlays: [this.tooltipOverlay, this.signalOverlay]
        });

        // Attach the pointermove event handler to the map
        this.map.on('pointermove', (evt) => this.handlePointerMove(evt));

        // ------------------------------------------------- //
        // Add Key Listeners ---
        const mapElement = this.map.getTargetElement();
        if (mapElement) {
            // Need tabindex for the div to receive key events directly
            mapElement.tabIndex = 0; // Or set in HTML: <div id="map" tabindex="0">...</div>
            mapElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
            mapElement.addEventListener('keyup', (e) => this.handleKeyUp(e));
            // Fallback listeners on document if map loses focus
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
            document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        } else {
            console.error("Map target element not found, cannot attach key listeners.");
        }
    }

    // ------------------------------------------------- //
    // --- Key Handlers ---
    handleKeyDown(e) {
        if (e.key === 'Control' && !this.isCtrlKeyPressed) {
            this.isCtrlKeyPressed = true;
            // Optional: Add a visual cue, like changing the cursor
            this.map.getTargetElement().style.cursor = 'crosshair';
            // Trigger a pointermove event artificially to show tooltip immediately if needed
            // this.map.dispatchEvent({ type: 'pointermove', originalEvent: e, coordinate: this.map.getView().getCenter() });
            console.log("CTRL key down");
        }
    }

    handleKeyUp(e) {
        if (e.key === 'Control') {
            this.isCtrlKeyPressed = false;
            this.map.getTargetElement().style.cursor = ''; // Reset cursor
            this.hideTooltip(); // Hide the bounding box tooltip

            // Dispatch custom event with the captured bounds
            if (this.capturedBounds) {
                console.log("Dispatching bboxcaptured event:", this.capturedBounds);
                const event = new CustomEvent('bboxcaptured', {
                    detail: { bounds: this.capturedBounds },
                    bubbles: true, // Allow event to bubble up
                    cancelable: true
                });
                this.map.getTargetElement().dispatchEvent(event);
                this.capturedBounds = null; // Clear after dispatch
            }
            console.log("CTRL key up");
        }
    }

    // --- Helper to hide tooltip ---
    hideTooltip() {
        if (this.tooltipElement) this.tooltipElement.style.display = 'none';
        this.tooltipOverlay.setPosition(undefined);
    }

    handlePointerMove(evt) {
        // If dragging, hide tooltip and return
        if (evt.dragging) {
            this.hideTooltip();
            return;
        }

        // --- Handle CTRL key press ---
        if (this.isCtrlKeyPressed) {
            const view = this.map.getView();
            const extent = view.calculateExtent(this.map.getSize()); // Get extent in map projection
            const transformedExtent = ol.proj.transformExtent(extent, view.getProjection(), 'EPSG:4326'); // Transform to Lon/Lat (EPSG:4326)

            const [minLon, minLat, maxLon, maxLat] = transformedExtent;

            // Store the bounds
            this.capturedBounds = {
                minLat: parseFloat(minLat.toFixed(4)),
                maxLat: parseFloat(maxLat.toFixed(4)),
                minLon: parseFloat(minLon.toFixed(4)),
                maxLon: parseFloat(maxLon.toFixed(4))
            };

            // Display bounds in the tooltip
            this.getTooltipElement().innerHTML = `Map Area:<br>` +
                `Min Lat: ${this.capturedBounds.minLat}<br>` +
                `Max Lat: ${this.capturedBounds.maxLat}<br>` +
                `Min Lon: ${this.capturedBounds.minLon}<br>` +
                `Max Lon: ${this.capturedBounds.maxLon}`;
            this.getTooltipElement().style.display = 'block'; // Ensure it's visible
            this.getTooltipOverlay().setPosition(evt.coordinate); // Position tooltip at mouse cursor
            return; // Don't process feature tooltips while CTRL is pressed
        }

        // --- Original Feature Tooltip Logic ---
        const pixel = this.map.getEventPixel(evt.originalEvent);
        let featureFound = false;

        // Only check markerLayer for regular tooltips
        this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
            if (layer === this.markerLayer) { // Check if it's the regular marker layer
                featureFound = true;
                const magnitude = feature.get('magnitude');
                const place = feature.get('name'); // Use 'name' which was set during feature creation
                const depth = feature.get('depth');
                const station = feature.get('station');
                const time = feature.get('time'); // Use the formatted time string
                const coordinate = feature.getGeometry().getCoordinates(); // Get feature's coordinate
                const lonLat = ol.proj.toLonLat(coordinate); // Convert to Lon/Lat for display

                this.getTooltipElement().innerHTML = `Station: ${station}<br>` +
                    `Place: ${place}<br>` +
                    `Magnitude: ${typeof magnitude === 'number' ? magnitude.toFixed(1) : magnitude}<br>` +
                    `Depth: ${typeof depth === 'number' ? depth.toFixed(2) + ' km' : depth}<br>` +
                    `Lat: ${lonLat[1].toFixed(4)}<br>` +
                    `Lon: ${lonLat[0].toFixed(4)}<br>` +
                    `Time: ${time}`;
                this.getTooltipElement().style.display = 'block';
                this.getTooltipOverlay().setPosition(coordinate); // Position tooltip at feature location
                return true; // Stop searching after finding one feature
            }
        }, {
            layerFilter: (layer) => layer === this.markerLayer, // Only consider markerLayer
            hitTolerance: 5
        });

        if (!featureFound) {
            this.hideTooltip(); // Hide if no feature found
        }
        // --- End Original Feature Tooltip Logic ---
    }

    getMap() {
        return this.map;
    }

    getMarkerSource() {
        return this.markerSource;
    }

    getTooltipOverlay() {
        return this.tooltipOverlay;
    }
    getSignalOverlay() {
        return this.signalOverlay;
    }
    getSignalElement() {
        return this.signalElement;
    }
    getTooltipElement() {
        return this.tooltipElement;
    }
    createMarkerStyle() {
        // Define base stroke style (remains the same)
        const baseStroke = new ol.style.Stroke({ color: 'black', width: 1 });

        // Define colors for different magnitude ranges (customize as needed)
        const colors = {
            low: 'rgba(0, 255, 0, 0.7)',      // Green for < 3.0
            medium: 'rgba(255, 255, 0, 0.7)', // Yellow for 3.0 - 4.9
            high: 'rgba(255, 165, 0, 0.7)',   // Orange for 5.0 - 6.4
            veryHigh: 'rgba(255, 0, 0, 0.7)', // Red for 6.5+
            default: 'rgba(128, 128, 128, 0.7)' // Grey for unknown/invalid
        };

        // Return the function that OpenLayers will call for each feature
        return (feature, resolution) => {
            const magnitude = feature.get('magnitude'); // Get magnitude from feature

            // --- Determine Fill Color based on Magnitude ---
            let fillColor;
            if (typeof magnitude !== 'number' || isNaN(magnitude)) {
                fillColor = colors.default;
            } else if (magnitude < 3.0) {
                fillColor = colors.low;
            } else if (magnitude < 5.0) {
                fillColor = colors.medium;
            } else if (magnitude < 6.5) {
                fillColor = colors.high;
            } else {
                fillColor = colors.veryHigh;
            }

            // Create the fill style with the determined color
            const dynamicFill = new ol.style.Fill({ color: fillColor });

            // --- Calculate radius based on magnitude (existing logic) ---
            let radius = 5; // Default radius
            if (typeof magnitude === 'number' && !isNaN(magnitude)) {
                radius = Math.max(3, 3 + (magnitude * 1.5));
            }

            // Create and return a new style object for this specific feature
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,     // Use the calculated radius
                    fill: dynamicFill,  // Use the dynamic fill color
                    stroke: baseStroke  // Use the consistent stroke
                })
            });
        };
    }
    createLastEarthquakeMarkerStyle() {
        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1], // Center bottom
                //src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Using a standard red marker image from Google Maps
                src: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scale: 1, // Adjust the scale as needed
                crossOrigin: 'anonymous',
            }),
        });
    }
    populateMapMarkers(earthquakesData) {
        if (!this.markerSource) {
            console.error("Vector source for markers not provided.");
            return;
        }
        if (!this.lastEarthquakeMarkerSource) {
            console.error("Vector source for last earthquake marker not provided.");
            return;
        }
        this.markerSource.clear(); // Clear existing markers before adding new/updated ones
        this.lastEarthquakeMarkerSource.clear();

        const features = earthquakesData.slice(0, -1).map(earthquake => {
            const longitude = parseFloat(earthquake.longitude);
            const latitude = parseFloat(earthquake.latitude);

            if (isNaN(longitude) || isNaN(latitude)) return null;

            const point = new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]));
            return new ol.Feature({ geometry: point, ...earthquake, name: earthquake.place });
        }).filter(feature => feature !== null);

        this.markerSource.addFeatures(features); // Add all features at once

        const newestEarthquake = earthquakesData[0]; // Get the first element (newest)
        if (!newestEarthquake) {
            return; // No new earthquake to mark
        }
        const longitude = parseFloat(newestEarthquake.longitude);
        const latitude = parseFloat(newestEarthquake.latitude);
        if (!isNaN(longitude) && !isNaN(latitude)) {
            const point = new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]));
            const newestEarthquakeFeature = new ol.Feature({ geometry: point, ...newestEarthquake, name: newestEarthquake.place });
            this.lastEarthquakeMarkerSource.addFeature(newestEarthquakeFeature);
        }
    }

    // ------------------------------------------------- //
    // --- Method to Change Map Style ---
    changeMapStyle(styleName) {
        console.log(`Attempting to change map style to: ${styleName}`);
        const styleConfig = this.mapStyles[styleName];

        if (styleConfig && typeof styleConfig.source === 'function') {
            try {
                const newSource = styleConfig.source();
                if (this.myTileServer) {
                    this.myTileServer.setSource(newSource);
                    console.log(`Map style changed successfully to ${styleName}`);
                } else {
                    console.error("Tile layer (this.myTileServer) not found.");
                }
            } catch (error) {
                console.error(`Error creating source for style ${styleName}:`, error);
            }
        } else {
            console.error(`Map style '${styleName}' not found or configuration is invalid.`);
            // Optionally fall back to a default style or do nothing
        }
    }
}