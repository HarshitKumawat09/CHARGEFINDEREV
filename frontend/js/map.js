// let map;
// let markers = [];

// // Initialize the map
// function initMap() {
//     console.log("Initializing map..."); // Debugging
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: window.config.defaultLocation, // Centered on Jaipur
//       zoom: 12, // Adjust zoom level as needed
//     });
  
//     loadStations();
//   }

// // Load stations and display markers
// async function loadStations() {
//   const stations = await fetchStations();
//   updateMarkers(stations);
// }

// // Update markers on the map
// function updateMarkers(stations) {
//     console.log("Updating markers with stations:", stations); // Debugging
  
//     // Clear existing markers
//     markers.forEach(marker => marker.setMap(null));
//     markers = [];
  
//     // Add new markers
//     stations.forEach(station => {
//       const marker = new google.maps.Marker({
//         position: { lat: station.latitude, lng: station.longitude },
//         map: map,
//         title: station.name,
//       });
  
//       // Add hover effect
//       const infoWindow = new google.maps.InfoWindow({
//         content: `
//           <div>
//             <h3>${station.name}</h3>
//             <p>Status: ${station.status}</p>
//             <p>Slots: ${station.slots}</p>
//             <p>Charging Speed: ${station.chargingSpeed}</p>
//           </div>
//         `,
//       });
  
//       marker.addListener("mouseover", () => infoWindow.open(map, marker));
//       marker.addListener("mouseout", () => infoWindow.close());
  
//       markers.push(marker);
//     });
//   }

// // Refresh stations every 10 seconds
// setInterval(loadStations, 10000);

// window.initMap = initMap; // Make initMap globally available

let map;
let markers = [];
let activeInfoWindow = null;
let isReviewFormOpen = false; // Track if review form is open

// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: window.config.defaultLocation,
    zoom: 12,
  });
  loadStations();
}

async function loadStations() {
  const stations = await fetchStations();
  updateMarkers(stations);
}

function updateMarkers(stations) {
  // Only refresh markers if no review form is open
  if (isReviewFormOpen) {
    console.log("Skipping refresh - review form is active");
    return;
  }

  markers.forEach(marker => marker.setMap(null));
  markers = [];

  stations.forEach(station => {
    const marker = new google.maps.Marker({
      position: { lat: station.latitude, lng: station.longitude },
      map: map,
      title: station.name,
    });

    // Hover InfoWindow (basic info)
    const hoverContent = `
      <div style="padding: 8px;">
        <h4 style="margin: 0;">${station.name}</h4>
        <p style="margin: 5px 0;">Status: ${station.status}</p>
      </div>
    `;
    const hoverWindow = new google.maps.InfoWindow({
      content: hoverContent
    });

    // Click InfoWindow (detailed info + review button)
    const infoContent = `
      <div style="padding: 10px; min-width: 200px;">
        <h3 style="margin-top: 0;">${station.name}</h3>
        <p><strong>Status:</strong> ${station.status}</p>
        <p><strong>Available Slots:</strong> ${station.slots}</p>
        <button id="reviewBtn-${station._id}" 
                style="margin-top: 10px; padding: 8px 12px; 
                       background: #4285F4; color: white; 
                       border: none; border-radius: 4px;
                       cursor: pointer;">
          Give Review
        </button>
      </div>
    `;
    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });

    // Review Form Window
    const reviewFormContent = `
      <div style="padding: 15px; width: 250px;">
        <h3 style="margin-top: 0;">Review ${station.name}</h3>
        <form id="reviewForm-${station._id}">
          <input type="text" name="user" placeholder="Your Name" 
                 style="width: 100%; padding: 8px; margin-bottom: 10px;" required>
          <textarea name="text" placeholder="Your Review" 
                    style="width: 100%; height: 80px; padding: 8px; margin-bottom: 10px;" required></textarea>
          <select name="rating" style="width: 100%; padding: 8px; margin-bottom: 15px;" required>
            <option value="">Select Rating</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
          <button type="submit" 
                  style="width: 100%; padding: 10px; 
                         background: #34A853; color: white; 
                         border: none; border-radius: 4px;
                         cursor: pointer;">
            Submit Review
          </button>
        </form>
      </div>
    `;
    const reviewWindow = new google.maps.InfoWindow({
      content: reviewFormContent
    });

    // Hover effects
    marker.addListener("mouseover", () => {
      if (!isReviewFormOpen) {
        hoverWindow.open(map, marker);
      }
    });

    marker.addListener("mouseout", () => {
      hoverWindow.close();
    });

    // Click handler for marker
    marker.addListener("click", () => {
      if (activeInfoWindow) activeInfoWindow.close();
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;

      // Add click handler for review button
      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        const reviewBtn = document.getElementById(`reviewBtn-${station._id}`);
        if (reviewBtn) {
          reviewBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            infoWindow.close();
            reviewWindow.open(map, marker);
            activeInfoWindow = reviewWindow;
            isReviewFormOpen = true;
          });
        }
      });
    });

    // Handle form submission
    google.maps.event.addListenerOnce(reviewWindow, 'domready', () => {
      const form = document.getElementById(`reviewForm-${station._id}`);
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const formData = new FormData(form);
          const review = {
            user: formData.get("user"),
            text: formData.get("text"),
            rating: parseInt(formData.get("rating"))
          };

          try {
            const response = await fetch(`${window.config.backendUrl}/${station._id}/reviews`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(review)
            });

            if (response.ok) {
              alert("Review submitted successfully!");
              isReviewFormOpen = false;
              reviewWindow.close();
              loadStations(); // Refresh markers
            } else {
              alert("Failed to submit review");
            }
          } catch (error) {
            console.error("Error submitting review:", error);
          }
        });
      }
    });

    // Close handler for review window
    reviewWindow.addListener("closeclick", () => {
      isReviewFormOpen = false;
    });

    markers.push(marker);
  });
}

// Modified refresh logic
function safeRefresh() {
  if (!isReviewFormOpen) {
    loadStations();
  }
}

setInterval(safeRefresh, 10000);
window.initMap = initMap;