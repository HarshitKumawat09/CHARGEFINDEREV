const config = {
    backendUrl: "http://localhost:5000/api/stations", // Backend API endpoint
    googleMapsApiKey: "your api key",    // Google Maps API key
    defaultLocation: { lat: 26.9124, lng: 75.7873 }, // Centered on Jaipur, Rajasthan

    endpoints: {
      stations: "/stations",
      bookings: "/bookings"
    }
  };
  
  window.config = config; // Make config globally available
