async function fetchStations() {
    try {
      const response = await fetch(window.config.backendUrl);
      const stations = await response.json();
      console.log("Fetched stations:", stations); // Debugging
      return stations;
    } catch (error) {
      console.error("Error fetching stations:", error);
      return [];
    }
  }
  
  window.fetchStations = fetchStations; // Make function globally available