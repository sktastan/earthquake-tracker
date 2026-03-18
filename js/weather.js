// ---------------------------------------------------------------------
//      Manages weather data fetching based on geographic coordinates.
// ---------------------------------------------------------------------
class WeatherData {
    // ... (rest of WeatherData class)
    // ---------------------------------------------------------------------
    //      Initializes the WeatherData instance with optional coordinates.
    // ---------------------------------------------------------------------
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // ---------------------------------------------------------------------
    //      Sets the latitude for weather data fetching.
    // ---------------------------------------------------------------------
    setCurrentLatitude(latitude) {
        this.lat = parseFloat(latitude);
    }

    // ---------------------------------------------------------------------
    //      Sets the longitude for weather data fetching.
    // ---------------------------------------------------------------------
    setCurrentLongitude(longitude) {
        this.lon = parseFloat(longitude);
    }

    // ---------------------------------------------------------------------
    //      Fetches current weather data from the MET Norway API.
    // ---------------------------------------------------------------------
    async getCurrentWeatherData() {
        // Validate coordinates before fetching
        if (typeof this.latitude !== 'number' || isNaN(this.latitude) || typeof this.longitude !== 'number' || isNaN(this.longitude)) {
            console.error('Invalid coordinates for weather fetch:', this.latitude, this.longitude);
            return null; // Return null if coordinates are invalid
        }
        try {
            const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${this.latitude}&lon=${this.longitude}`;
            // ADDED: User-Agent header is required by the API
            const response = await fetch(url, {
                headers: { 'User-Agent': 'YourAppName/1.0 https://yourappwebsite.com' } // Replace with your app details
            });

            if (!response.ok) {
                // Log more details on HTTP error
                const errorText = await response.text();
                console.error(`HTTP error fetching weather! Status: ${response.status}, URL: ${url}, Response: ${errorText}`);
                return null; // Return null on HTTP error
            }

            const data = await response.json();
            // Basic validation of the returned data structure
            if (!data || !data.properties || !data.properties.timeseries || data.properties.timeseries.length === 0) {
                console.warn(`Weather data received but missing expected structure (properties.timeseries):`, data);
                return null;
            }
            return data; // Return the parsed JSON data
        } catch (error) {
            console.error('Error fetching or parsing weather data:', error);
            return null; // Return null on any error
        }
    }
}