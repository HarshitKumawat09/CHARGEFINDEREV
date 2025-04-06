// DOM Elements
// const getLocationBtn = document.getElementById('getLocationBtn');
// const radiusSelect = document.getElementById('radius');
// const stationsList = document.getElementById('stationsList');
// const locationStatus = document.getElementById('locationStatus');
// const modal = document.getElementById('stationModal');
// const closeBtn = document.querySelector('.close-btn');
// let currentStationId = null;

// // Event Listeners
// getLocationBtn.addEventListener('click', getUserLocation);
// closeBtn.addEventListener('click', closeModal);
// window.addEventListener('click', (e) => e.target === modal && closeModal());

// // Get user's current location
// function getUserLocation() {
//   locationStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting your location...';
  
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         locationStatus.innerHTML = `<i class="fas fa-check-circle"></i> Location found! Searching nearby stations...`;
//         searchNearbyStations(latitude, longitude);
//       },
//       error => {
//         console.error('Error getting location:', error);
//         locationStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> Error: ${error.message}`;
//       }
//     );
//   } else {
//     locationStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Geolocation is not supported by your browser';
//   }
// }

// // Search stations near location
// async function searchNearbyStations(lat, lng) {
//   const radius = radiusSelect.value * 1000; // Convert km to meters
//   stationsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Finding nearby stations...</div>';

//   try {
//     const response = await fetch(`${window.config.backendUrl}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
//     const stations = await response.json();

//     if (stations.length === 0) {
//       stationsList.innerHTML = '<div class="no-results">No charging stations found in this area</div>';
//       return;
//     }

//     displayStations(stations);
//   } catch (error) {
//     console.error('Error fetching stations:', error);
//     stationsList.innerHTML = `<div class="error">Error loading stations: ${error.message}</div>`;
//   }
// }

// // Display stations in list
// function displayStations(stations) {
//   stationsList.innerHTML = stations.map(station => `
//     <div class="station-card" data-id="${station._id}">
//       <div class="station-header">
//         <h3>${station.name}</h3>
//         <span class="distance">${(station.distance / 1000).toFixed(1)} km away</span>
//       </div>
//       <div class="station-details">
//         <p><i class="fas fa-bolt"></i> ${station.chargingSpeed}</p>
//         <p><i class="fas fa-car-battery"></i> ${station.slots} slots available</p>
//         <p><i class="fas fa-clock"></i> ${station.openingHours}</p>
//       </div>
//       <div class="station-rating">
//         ${getRatingStars(station.averageRating || 0)}
//         <span>${station.reviews?.length || 0} reviews</span>
//       </div>
//       <button class="view-details-btn">View Details</button>
//     </div>
//   `).join('');

//   // Add click listeners to station cards
//   document.querySelectorAll('.station-card').forEach(card => {
//     card.addEventListener('click', () => openStationModal(card.dataset.id));
//   });
// }

// // Open station details modal
// async function openStationModal(stationId) {
//   currentStationId = stationId;
//   try {
//     const response = await fetch(`${window.config.backendUrl}/${stationId}`);
//     const station = await response.json();

//     // Populate modal
//     document.getElementById('modalStationName').textContent = station.name;
//     document.getElementById('modalChargingSpeed').textContent = station.chargingSpeed;
//     document.getElementById('modalAvailableSlots').textContent = `${station.slots} available slots`;
//     document.getElementById('modalOpeningHours').textContent = station.openingHours;
//     document.getElementById('modalAddress').textContent = `${station.latitude}, ${station.longitude}`;

//     // Display reviews
//     const reviewsList = document.getElementById('reviewsList');
//     if (station.reviews?.length > 0) {
//       reviewsList.innerHTML = station.reviews.map(review => `
//         <div class="review-item">
//           <div class="review-header">
//             <strong>${review.user}</strong>
//             <div class="review-rating">${getRatingStars(review.rating)}</div>
//           </div>
//           <p class="review-text">${review.text}</p>
//           <small class="review-date">${new Date(review.createdAt).toLocaleDateString()}</small>
//         </div>
//       `).join('');
//     } else {
//       reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
//     }

//     // Show modal
//     modal.style.display = 'block';
//   } catch (error) {
//     console.error('Error fetching station details:', error);
//   }
// }

// // Close modal
// function closeModal() {
//   modal.style.display = 'none';
//   currentStationId = null;
// }

// // Star rating display helper
// function getRatingStars(rating) {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//   const emptyStars = 5 - fullStars - halfStar;
  
//   return `
//     ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
//     ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
//     ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
//   `;
// }

// // Initialize star rating in form
// document.querySelectorAll('.stars i').forEach(star => {
//   star.addEventListener('click', function() {
//     const rating = parseInt(this.dataset.rating);
//     document.getElementById('reviewRating').value = rating;
    
//     // Update star display
//     document.querySelectorAll('.stars i').forEach((s, index) => {
//       if (index < rating) {
//         s.classList.remove('far');
//         s.classList.add('fas');
//       } else {
//         s.classList.remove('fas');
//         s.classList.add('far');
//       }
//     });
//   });
// });

// // Handle review submission
// document.getElementById('reviewForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const review = {
//     user: document.getElementById('reviewName').value,
//     text: document.getElementById('reviewText').value,
//     rating: parseInt(document.getElementById('reviewRating').value)
//   };

//   try {
//     const response = await fetch(`${window.config.backendUrl}/${currentStationId}/reviews`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(review)
//     });

//     if (response.ok) {
//       alert('Thank you for your review!');
//       closeModal();
//       openStationModal(currentStationId); // Refresh the modal
//     } else {
//       alert('Failed to submit review. Please try again.');
//     }
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     alert('An error occurred. Please try again later.');
//   }
// });

// // DOM Elements
// const areaSelect = document.getElementById('areaSelect');
// const searchBtn = document.getElementById('searchBtn');
// const typeFilter = document.getElementById('typeFilter');
// const statusFilter = document.getElementById('statusFilter');
// const stationsList = document.getElementById('stationsList');
// const stationModal = document.getElementById('stationModal');
// const closeBtn = document.querySelector('.close-btn');
// const reviewForm = document.getElementById('reviewForm');
// const stars = document.querySelectorAll('.stars i');

// // Current selected station
// let currentStationId = null;

// // Initialize the page
// document.addEventListener('DOMContentLoaded', () => {
//   loadAllStations();
  
//   // Set up event listeners
//   searchBtn.addEventListener('click', handleSearch);
//   closeBtn.addEventListener('click', () => stationModal.style.display = 'none');
  
//   // Star rating functionality
//   stars.forEach(star => {
//     star.addEventListener('click', () => {
//       const rating = parseInt(star.getAttribute('data-rating'));
//       setStarRating(rating);
//     });
//   });
  
//   // Review form submission
//   reviewForm.addEventListener('submit', handleReviewSubmit);
// });

// // Handle search button click
// function handleSearch() {
//   const area = areaSelect.value;
//   const type = typeFilter.value;
//   const status = statusFilter.value;
  
//   if (area || type || status) {
//     fetchFilteredStations(area, type, status);
//   } else {
//     loadAllStations();
//   }
// }

// // Load all stations
// async function loadAllStations() {
//     try {
//       const response = await fetch(`${window.config.backendUrl}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const stations = await response.json();
//       displayStations(stations);
//     } catch (error) {
//       console.error('Error loading stations:', error);
//       showError("Failed to load stations. Please try again later.");
//     }
//   }

// // Fetch filtered stations
// async function fetchFilteredStations(area, type, status) {
//   try {
//     stationsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading stations...</div>';
    
//     // Build query parameters
//     const params = new URLSearchParams();
//     if (area) params.append('area', area);
//     if (type) params.append('type', type);
//     if (status) params.append('status', status);
    
//     // const response = await fetch(`/api/stations/search?${params.toString()}`);
//     const response = await fetch(`${window.config.backendUrl}/search?${params.toString()}`);
//     const stations = await response.json();
    
//     displayStations(stations);
//   } catch (error) {
//     showError('No stations found matching your criteria.');
//   }
// }

// // Display stations in the list
// function displayStations(stations) {
//   if (stations.length === 0) {
//     stationsList.innerHTML = '<div class="no-results">No stations found matching your criteria.</div>';
//     return;
//   }
  
//   stationsList.innerHTML = stations.map(station => `
//     <div class="station-card" data-id="${station._id}">
//       <div class="station-header">
//         <h3>${station.name}</h3>
//         <span class="status ${station.status.toLowerCase()}">${station.status}</span>
//       </div>
//       <div class="station-details">
//         <p><i class="fas fa-bolt"></i> ${station.chargingSpeed}</p>
//         <p><i class="fas fa-car-battery"></i> ${station.availableSlots} slots available</p>
//         <p><i class="fas fa-clock"></i> ${station.openingHours}</p>
//         <p><i class="fas fa-map-marker-alt"></i> ${station.address}</p>
//       </div>
//       <button class="view-details-btn">View Details</button>
//     </div>
//   `).join('');
  
//   // Add click event to station cards
//   document.querySelectorAll('.station-card').forEach(card => {
//     card.addEventListener('click', () => openStationModal(card.getAttribute('data-id')));
//   });
// }

// // Open station details modal
// async function openStationModal(stationId) {
//   try {
//     currentStationId = stationId;
    
//     const response = await fetch(`/api/stations/${stationId}`);
//     const station = await response.json();
    
//     // Populate modal with station data
//     document.getElementById('modalStationName').textContent = station.name;
//     document.getElementById('modalChargingSpeed').textContent = station.chargingSpeed;
//     document.getElementById('modalAvailableSlots').textContent = `${station.availableSlots} slots available`;
//     document.getElementById('modalOpeningHours').textContent = station.openingHours;
//     document.getElementById('modalAddress').textContent = station.address;
    
//     // Load reviews
//     loadReviews(stationId);
    
//     // Show modal
//     stationModal.style.display = 'block';
//   } catch (error) {
//     console.error('Error loading station details:', error);
//   }
// }

// // Load reviews for a station
// async function loadReviews(stationId) {
//   try {
//     const response = await fetch(`/api/stations/${stationId}/reviews`);
//     const reviews = await response.json();
    
//     const reviewsList = document.getElementById('reviewsList');
//     reviewsList.innerHTML = reviews.map(review => `
//       <div class="review-item">
//         <div class="review-author">${review.name}</div>
//         <div class="review-stars">
//           ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
//         </div>
//         <div class="review-text">${review.text}</div>
//       </div>
//     `).join('');
//   } catch (error) {
//     console.error('Error loading reviews:', error);
//   }
// }

// // Handle review form submission
// async function handleReviewSubmit(e) {
//   e.preventDefault();
  
//   const name = document.getElementById('reviewName').value;
//   const text = document.getElementById('reviewText').value;
//   const rating = document.getElementById('reviewRating').value;
  
//   if (!name || !text || rating === '0') {
//     alert('Please fill out all fields and provide a rating.');
//     return;
//   }
  
//   try {
//     const response = await fetch(`/api/stations/${currentStationId}/reviews`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, text, rating: parseInt(rating) })
//     });
    
//     if (response.ok) {
//       // Reload reviews
//       loadReviews(currentStationId);
//       // Reset form
//       reviewForm.reset();
//       setStarRating(0);
//       alert('Thank you for your review!');
//     } else {
//       throw new Error('Failed to submit review');
//     }
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     alert('Failed to submit review. Please try again.');
//   }
// }

// // Set star rating
// function setStarRating(rating) {
//   stars.forEach(star => {
//     const starRating = parseInt(star.getAttribute('data-rating'));
//     if (starRating <= rating) {
//       star.classList.add('active');
//       star.classList.remove('far');
//       star.classList.add('fas');
//     } else {
//       star.classList.remove('active');
//       star.classList.remove('fas');
//       star.classList.add('far');
//     }
//   });
//   document.getElementById('reviewRating').value = rating;
// }

// // Show error message
// function showError(message) {
//   stationsList.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
// }

// // Close modal when clicking outside
// window.addEventListener('click', (e) => {
//   if (e.target === stationModal) {
//     stationModal.style.display = 'none';
//   }
// });

//2nd code snippet
// DOM Elements
// const elements = {
//     areaSelect: document.getElementById('areaSelect'),
//     searchBtn: document.getElementById('searchBtn'),
//     typeFilter: document.getElementById('typeFilter'),
//     statusFilter: document.getElementById('statusFilter'),
//     stationsList: document.getElementById('stationsList'),
//     stationModal: document.getElementById('stationModal'),
//     closeBtn: document.querySelector('.close-btn'),
//     reviewForm: document.getElementById('reviewForm'),
//     stars: document.querySelectorAll('.stars i'),
//     modalStationName: document.getElementById('modalStationName'),
//     modalChargingSpeed: document.getElementById('modalChargingSpeed'),
//     modalAvailableSlots: document.getElementById('modalAvailableSlots'),
//     modalOpeningHours: document.getElementById('modalOpeningHours'),
//     modalAddress: document.getElementById('modalAddress'),
//     reviewsList: document.getElementById('reviewsList')
//   };
  
//   let currentStationId = null;
  
//   // Initialize the page
//   document.addEventListener('DOMContentLoaded', () => {
//     loadAllStations();
//     setupEventListeners();
//   });
  
//   function setupEventListeners() {
//     elements.searchBtn.addEventListener('click', handleSearch);
//     elements.closeBtn.addEventListener('click', closeModal);
    
//     // Star rating functionality
//     elements.stars.forEach(star => {
//       star.addEventListener('click', () => {
//         const rating = parseInt(star.getAttribute('data-rating'));
//         setStarRating(rating);
//       });
//     });
    
//     // Review form submission
//     elements.reviewForm.addEventListener('submit', handleReviewSubmit);
//   }
  
//   // Handle search button click
//   function handleSearch() {
//     const area = elements.areaSelect.value;
//     const type = elements.typeFilter.value;
//     const status = elements.statusFilter.value;
    
//     if (area || type || status) {
//       fetchFilteredStations(area, type, status);
//     } else {
//       loadAllStations();
//     }
//   }
  
//   // Load all stations
//   async function loadAllStations() {
//     try {
//       showLoading();
//       const response = await fetch(`${window.config.backendUrl}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const stations = await response.json();
//       displayStations(stations);
//     } catch (error) {
//       showError("Failed to load stations. Please try again later.");
//       console.error('Error loading stations:', error);
//     }
//   }
  
//   // Fetch filtered stations
//   async function fetchFilteredStations(area, type, status) {
//     try {
//       showLoading();
      
//       const params = new URLSearchParams();
//       if (area) params.append('area', area);
//       if (type) params.append('type', type);
//       if (status) params.append('status', status);
      
//       const response = await fetch(`${window.config.backendUrl}/search?${params.toString()}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const stations = await response.json();
//       displayStations(stations);
//     } catch (error) {
//       showError('No stations found matching your criteria.');
//       console.error('Error fetching filtered stations:', error);
//     }
//   }
  
//   // Display stations in the list
//   function displayStations(stations) {
//     if (!stations || stations.length === 0) {
//       elements.stationsList.innerHTML = '<div class="no-results">No stations found matching your criteria.</div>';
//       return;
//     }
    
//     elements.stationsList.innerHTML = stations.map(station => `
//       <div class="station-card" data-id="${station._id}">
//         <div class="station-header">
//           <h3>${station.name}</h3>
//           <span class="status ${station.status.toLowerCase()}">${station.status}</span>
//         </div>
//         <div class="station-details">
//           <p><i class="fas fa-bolt"></i> ${station.chargingSpeed}</p>
//           <p><i class="fas fa-car-battery"></i> ${station.availableSlots} slots available</p>
//           <p><i class="fas fa-clock"></i> ${station.openingHours}</p>
//           <p><i class="fas fa-map-marker-alt"></i> ${station.address}</p>
//         </div>
//         <button class="view-details-btn">View Details</button>
//       </div>
//     `).join('');
    
//     // Add click event to station cards and buttons
//     document.querySelectorAll('.station-card, .view-details-btn').forEach(element => {
//       element.addEventListener('click', (event) => {
//         // Prevent event bubbling when clicking the button inside the card
//         if (event.target.classList.contains('view-details-btn')) {
//           event.stopPropagation();
//         }
        
//         const card = event.target.closest('.station-card');
//         if (card) {
//           const stationId = card.getAttribute('data-id');
//           openStationModal(stationId);
//         }
//       });
//     });
//   }
  
//   // Open station details modal
//   async function openStationModal(stationId) {
//     try {
//       currentStationId = stationId;
//       showModalLoading();
      
//       // Fetch station details
//       const stationResponse = await fetch(`${window.config.backendUrl}/${stationId}`);
//       if (!stationResponse.ok) throw new Error('Failed to load station details');
//       const station = await stationResponse.json();
      
//       // Fetch reviews
//       const reviewsResponse = await fetch(`${window.config.backendUrl}/${stationId}/reviews`);
//       const reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];
      
//       // Display data in modal
//       populateModal(station, reviews);
//       elements.stationModal.style.display = 'block';
//     } catch (error) {
//       console.error('Error opening station modal:', error);
//       alert('Failed to load station details. Please try again.');
//       closeModal();
//     }
//   }
  
//   function populateModal(station, reviews) {
//     // Station details
//     elements.modalStationName.textContent = station.name;
//     elements.modalChargingSpeed.textContent = station.chargingSpeed;
//     const slots = typeof station.slots === 'number' ? station.slots : 0;
//   elements.modalAvailableSlots.textContent = `${slots} slot${slots !== 1 ? 's' : ''} available`;
//     elements.modalOpeningHours.textContent = station.openingHours || '24/7';
//     elements.modalAddress.textContent = station.address;
    
//     // Reviews
//     displayReviews(reviews);
//   }
  
//   function displayReviews(reviews) {
//     if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
//       elements.reviewsList.innerHTML = '<div class="no-reviews">No reviews available for this station.</div>';
//       return;
//     }
  
//     elements.reviewsList.innerHTML = reviews.map(review => {
//       // Safely extract review properties
//       const userName = review.user || review.name || 'Anonymous';
//       const reviewText = review.text || review.review || 'No review text';
//       const rating = Math.min(5, Math.max(0, Number(review.rating) || 0));
//       const dateString = review.createdAt || review.date; // Use createdAt first
      
//       return `
//         <div class="review-item">
//           <div class="review-header">
//             <span class="review-author">${userName}</span>
//             <span class="review-date">${formatISODate(dateString)}</span>
//           </div>
//           <div class="review-stars">
//             ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
//           </div>
//           <div class="review-text">${reviewText}</div>
//         </div>
//       `;
//     }).join('');
//   }
  
//   // Specialized ISO date formatter
//   function formatISODate(isoString) {
//     if (!isoString) return 'Date not available';
    
//     try {
//       const date = new Date(isoString);
//       if (isNaN(date.getTime())) return 'Date not available';
      
//       return date.toLocaleString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//       // Example output: "29 Mar 2025, 2:34 PM"
//     } catch (e) {
//       console.error('Date formatting error:', e);
//       return 'Date not available';
//     }
//   }
  
// // Update your handleReviewSubmit function in stations.js
// async function handleReviewSubmit(e) {
//     e.preventDefault();
    
//     // Safely get form elements
//     const reviewName = document.getElementById('reviewName')?.value.trim();
//     const reviewText = document.getElementById('reviewText')?.value.trim();
//     const reviewRating = document.getElementById('reviewRating')?.value;
    
//     // Validate inputs
//     if (!reviewName || !reviewText || !reviewRating || reviewRating === '0') {
//       alert('Please fill out all fields and provide a rating');
//       return;
//     }
  
//     try {
//       const response = await fetch(`${window.config.backendUrl}/${currentStationId}/reviews`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           user: reviewName,
//           text: reviewText, 
//           rating: parseInt(reviewRating) 
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to submit review');
//       }
      
//       // Refresh reviews after successful submission
//       const reviewsResponse = await fetch(`${window.config.backendUrl}/${currentStationId}/reviews`);
//       const reviews = await reviewsResponse.json();
      
//       // Update reviews display
//       const reviewsList = document.getElementById('reviewsList');
//       reviewsList.innerHTML = reviews.map(review => `
//         <div class="review-item">
//           <div class="review-author">${review.user}</div>
//           <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
//           <div class="review-text">${review.text}</div>
//         </div>
//       `).join('');
      
//       // Reset form
//       e.target.reset();
//       setStarRating(0);
//       alert('Thank you for your review!');
      
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review. Please try again.');
//     }
//   }
  
//   function validateReviewForm(name, text, rating) {
//     if (!name || name.length < 2) {
//       alert('Please enter a valid name (at least 2 characters)');
//       return false;
//     }
//     if (!text || text.length < 10) {
//       alert('Please enter a meaningful review (at least 10 characters)');
//       return false;
//     }
//     if (rating === '0') {
//       alert('Please provide a rating');
//       return false;
//     }
//     return true;
//   }
  
//   // Set star rating
//   function setStarRating(rating) {
//     elements.stars.forEach(star => {
//       const starRating = parseInt(star.getAttribute('data-rating'));
//       star.classList.toggle('active', starRating <= rating);
//       star.classList.toggle('far', starRating > rating);
//       star.classList.toggle('fas', starRating <= rating);
//     });
//     elements.reviewRating.value = rating;
//   }
  
//   // UI Helper functions
//   function showLoading() {
//     elements.stationsList.innerHTML = `
//       <div class="loading">
//         <i class="fas fa-spinner fa-spin"></i>
//         <p>Loading stations...</p>
//       </div>
//     `;
//   }
  
//   function showModalLoading() {
//     elements.reviewsList.innerHTML = `
//       <div class="loading">
//         <i class="fas fa-spinner fa-spin"></i>
//         <p>Loading details...</p>
//       </div>
//     `;
//   }
  
//   function showError(message) {
//     elements.stationsList.innerHTML = `
//       <div class="error">
//         <i class="fas fa-exclamation-circle"></i>
//         <p>${message}</p>
//       </div>
//     `;
//   }
  
//   function closeModal() {
//     elements.stationModal.style.display = 'none';
//   }
  
//   // Close modal when clicking outside
//   window.addEventListener('click', (e) => {
//     if (e.target === elements.stationModal) {
//       closeModal();
//     }
//   });





//
const elements = {
    areaSelect: document.getElementById('areaSelect'),
    searchBtn: document.getElementById('searchBtn'),
    typeFilter: document.getElementById('typeFilter'),
    statusFilter: document.getElementById('statusFilter'),
    stationsList: document.getElementById('stationsList'),
    stationModal: document.getElementById('stationModal'),
    closeBtn: document.querySelector('.close-btn'),
    reviewForm: document.getElementById('reviewForm'),
    stars: document.querySelectorAll('.stars i'),
    modalStationName: document.getElementById('modalStationName'),
    modalChargingSpeed: document.getElementById('modalChargingSpeed'),
    modalAvailableSlots: document.getElementById('modalAvailableSlots'),
    modalOpeningHours: document.getElementById('modalOpeningHours'),
    modalAddress: document.getElementById('modalAddress'),
    reviewsList: document.getElementById('reviewsList'),
    modalLastUpdated: document.getElementById('modalLastUpdated') || { textContent: '' }
};

let currentStationId = null;
let lastGeocodeRequestTime = 0;
const geocodeQueue = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadAllStations();
    setupEventListeners();
    
    // Add OpenStreetMap attribution
    const footer = document.querySelector('footer');
    if (footer) {
        footer.insertAdjacentHTML('beforeend', 
            '<div class="osm-attribution">Address data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a></div>'
        );
    }
});

function setupEventListeners() {
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.closeBtn.addEventListener('click', closeModal);
    
    // Star rating functionality
    elements.stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setStarRating(rating);
        });
        
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', () => {
            const currentRating = parseInt(elements.reviewRating.value) || 0;
            highlightStars(currentRating);
        });
    });
    
    // Review form submission
    elements.reviewForm.addEventListener('submit', handleReviewSubmit);
}

function highlightStars(rating) {
    elements.stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('hover', starRating <= rating);
    });
}

// Handle search button click
function handleSearch() {
    const area = elements.areaSelect.value;
    const type = elements.typeFilter.value;
    const status = elements.statusFilter.value;
    
    if (area || type || status) {
        fetchFilteredStations(area, type, status);
    } else {
        loadAllStations();
    }
}

// Load all stations
async function loadAllStations() {
    try {
        showLoading();
        const response = await fetch(`${window.config.backendUrl}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stations = await response.json();
        displayStations(stations);
    } catch (error) {
        showError("Failed to load stations. Please try again later.");
        console.error('Error loading stations:', error);
    }
}

// Fetch filtered stations
async function fetchFilteredStations(area, type, status) {
    try {
        showLoading();
        
        const params = new URLSearchParams();
        if (area) params.append('area', area);
        if (type) params.append('type', type);
        if (status) params.append('status', status);
        
        const response = await fetch(`${window.config.backendUrl}/search?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stations = await response.json();
        displayStations(stations);
    } catch (error) {
        showError('No stations found matching your criteria.');
        console.error('Error fetching filtered stations:', error);
    }
}

// Display stations in the list
function displayStations(stations) {
    if (!stations || stations.length === 0) {
        elements.stationsList.innerHTML = '<div class="no-results">No stations found matching your criteria.</div>';
        return;
    }
    
    elements.stationsList.innerHTML = stations.map(station => {
        const slots = typeof station.slots === 'number' ? station.slots : 0;
        const address = station.address || (station.latitude && station.longitude ? 
            "Loading address..." : "Address not available");
        
        return `
        <div class="station-card" data-id="${station._id}" 
             data-lat="${station.latitude || ''}" 
             data-lng="${station.longitude || ''}">
            <div class="station-header">
                <h3>${station.name}</h3>
                <span class="status ${getStatusClass(station.status)}">
                    <i class="fas ${getStatusIcon(station.status)}"></i> ${station.status}
                </span>
            </div>
            <div class="station-details">
                <p><i class="fas fa-bolt"></i> ${station.chargingSpeed || 'Not specified'}</p>
                <p><i class="fas fa-car-battery"></i> ${slots} slot${slots !== 1 ? 's' : ''} available</p>
                <p><i class="fas fa-clock"></i> ${station.openingHours || '24/7'}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
            </div>
            <button class="view-details-btn">View Details</button>
        </div>
        `;
    }).join('');
    
    // Load addresses for stations with coordinates
    document.querySelectorAll('.station-card').forEach(card => {
        const lat = card.dataset.lat;
        const lng = card.dataset.lng;
        const addressElement = card.querySelector('.fa-map-marker-alt').parentElement;
        
        if (lat && lng && addressElement.textContent.includes('Loading')) {
            throttledGeocode(lat, lng)
                .then(address => {
                    addressElement.textContent = address;
                    card.dataset.address = address;
                })
                .catch(() => {
                    addressElement.textContent = "Address unavailable";
                });
        }
    });

    // Add click event to station cards and buttons
    document.querySelectorAll('.station-card, .view-details-btn').forEach(element => {
        element.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                event.stopPropagation();
            }
            
            const card = event.target.closest('.station-card');
            if (card) {
                const stationId = card.getAttribute('data-id');
                openStationModal(stationId);
            }
        });
    });
}

function getStatusClass(status) {
    const statusMap = {
        'available': 'available',
        'busy': 'busy',
        'repair': 'repair',
        'default': 'unknown'
    };
    return statusMap[status.toLowerCase()] || statusMap['default'];
}

function getStatusIcon(status) {
    const iconMap = {
        'available': 'fa-check-circle',
        'busy': 'fa-hourglass-half',
        'repair': 'fa-tools',
        'default': 'fa-question-circle'
    };
    return iconMap[status.toLowerCase()] || iconMap['default'];
}

// Open station details modal
async function openStationModal(stationId) {
    try {
        currentStationId = stationId;
        showModalLoading();
        elements.stationModal.style.display = 'block';
        
        // Fetch station details
        const stationResponse = await fetch(`${window.config.backendUrl}/${stationId}`);
        if (!stationResponse.ok) throw new Error('Failed to load station details');
        const station = await stationResponse.json();
        
        // Fetch reviews
        const reviewsResponse = await fetch(`${window.config.backendUrl}/${stationId}/reviews`);
        const reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];
        
        // Display data in modal
        populateModal(station, reviews);
    } catch (error) {
        console.error('Error opening station modal:', error);
        showModalError('Failed to load station details. Please try again.');
    }
}

async function populateModal(station, reviews) {
    // Station details with fallbacks
    elements.modalStationName.textContent = station.name || "Unnamed Station";
    elements.modalChargingSpeed.textContent = station.chargingSpeed || "Not specified";
    
    // Handle slots display
    const slots = typeof station.slots === 'number' ? station.slots : 0;
    elements.modalAvailableSlots.textContent = `${slots} slot${slots !== 1 ? 's' : ''} available`;
    
    elements.modalOpeningHours.textContent = station.openingHours || '24/7';
    
    // Handle address - try card first, then station data
    const card = document.querySelector(`.station-card[data-id="${station._id}"]`);
    const cachedAddress = card?.dataset.address;
    
    if (cachedAddress) {
        elements.modalAddress.textContent = cachedAddress;
    } else if (station.address) {
        elements.modalAddress.textContent = station.address;
    } else if (station.latitude && station.longitude) {
        elements.modalAddress.textContent = "Loading address...";
        try {
            const address = await throttledGeocode(station.latitude, station.longitude);
            elements.modalAddress.textContent = address;
        } catch (error) {
            elements.modalAddress.textContent = "Address unavailable";
        }
    } else {
        elements.modalAddress.textContent = "Address not available";
    }
    
    // Display last updated time if available
    if (station.lastUpdated) {
        const lastUpdated = new Date(station.lastUpdated).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        elements.modalLastUpdated.textContent = `Last updated: ${lastUpdated}`;
    } else {
        elements.modalLastUpdated.textContent = '';
    }
    
    // Reviews
    displayReviews(reviews);
}

// Free OpenStreetMap geocoding with rate limiting
async function geocodeWithNominatim(lat, lng) {
    const now = Date.now();
    const timeSinceLast = now - lastGeocodeRequestTime;
    
    // Respect 1 request/second limit
    if (timeSinceLast < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
    }
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        lastGeocodeRequestTime = Date.now();
        
        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Format address from components
        const addr = data.address;
        const addressParts = [
            addr?.road,
            addr?.neighbourhood,
            addr?.suburb,
            addr?.city || 'Jaipur',
            addr?.state || 'Rajasthan',
            addr?.postcode
        ].filter(Boolean);
        
        return addressParts.join(', ') || "Address not found";
    } catch (error) {
        console.error("Geocoding error:", error);
        throw error;
    }
}

// Queue-based throttling for geocoding
function throttledGeocode(lat, lng) {
    return new Promise((resolve, reject) => {
        geocodeQueue.push({ lat, lng, resolve, reject });
        processGeocodeQueue();
    });
}

function processGeocodeQueue() {
    if (geocodeQueue.length === 0) return;
    
    const now = Date.now();
    const timeSinceLast = now - lastGeocodeRequestTime;
    
    if (timeSinceLast >= 1000) {
        const { lat, lng, resolve, reject } = geocodeQueue.shift();
        lastGeocodeRequestTime = now;
        
        geocodeWithNominatim(lat, lng)
            .then(resolve)
            .catch(reject)
            .finally(processGeocodeQueue);
    } else {
        setTimeout(processGeocodeQueue, 1000 - timeSinceLast);
    }
}

function displayReviews(reviews) {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        elements.reviewsList.innerHTML = '<div class="no-reviews">No reviews available for this station.</div>';
        return;
    }
    
    elements.reviewsList.innerHTML = reviews.map(review => {
        const userName = review.user || review.name || 'Anonymous';
        const reviewText = review.text || review.review || 'No review text';
        const rating = Math.min(5, Math.max(0, Number(review.rating) || 0));
        const dateString = review.createdAt || review.date || new Date().toISOString();
        
        return `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author">${userName}</span>
                <span class="review-date">${formatISODate(dateString)}</span>
            </div>
            <div class="review-stars">
                ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
            </div>
            <div class="review-text">${reviewText}</div>
        </div>
        `;
    }).join('');
}

function formatISODate(isoString) {
    if (!isoString) return 'Date not available';
    
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return 'Date not available';
        
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (e) {
        console.error('Date formatting error:', e);
        return 'Date not available';
    }
}

async function handleReviewSubmit(e) {
    e.preventDefault();
    
    const name = elements.reviewName.value.trim();
    const text = elements.reviewText.value.trim();
    const rating = elements.reviewRating.value;
    
    if (!validateReviewForm(name, text, rating)) {
        return;
    }
    
    try {
        const response = await fetch(`${window.config.backendUrl}/${currentStationId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: name,
                text: text,
                rating: parseInt(rating),
                date: new Date().toISOString()
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit review');
        }
        
        // Refresh reviews
        const reviewsResponse = await fetch(`${window.config.backendUrl}/${currentStationId}/reviews`);
        const reviews = await reviewsResponse.json();
        displayReviews(reviews);
        
        // Reset form
        e.target.reset();
        setStarRating(0);
        
        // Show success message
        showModalMessage('Thank you for your review!');
        
    } catch (error) {
        console.error('Error submitting review:', error);
        showModalError('Failed to submit review. Please try again.');
    }
}

function validateReviewForm(name, text, rating) {
    if (!name || name.length < 2) {
        alert('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!text || text.length < 10) {
        alert('Please enter a meaningful review (at least 10 characters)');
        return false;
    }
    
    if (rating === '0') {
        alert('Please provide a rating');
        return false;
    }
    
    return true;
}

// Set star rating
function setStarRating(rating) {
    elements.stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', starRating <= rating);
        star.classList.toggle('far', starRating > rating);
        star.classList.toggle('fas', starRating <= rating);
    });
    elements.reviewRating.value = rating;
}

function showModalMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${message}</p>
    `;
    
    elements.reviewsList.prepend(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function showModalError(message) {
    elements.reviewsList.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

// UI Helper functions
function showLoading() {
    elements.stationsList.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading stations...</p>
        </div>
    `;
}

function showModalLoading() {
    elements.reviewsList.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading details...</p>
        </div>
    `;
}

function showError(message) {
    elements.stationsList.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

function closeModal() {
    elements.stationModal.style.display = 'none';
    elements.reviewForm.reset();
    setStarRating(0);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === elements.stationModal) {
        closeModal();
    }
});