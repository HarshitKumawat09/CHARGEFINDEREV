// // DOM Elements
// const bookingForm = document.getElementById('booking-form');
// const bookingDate = document.getElementById('booking-date');
// const durationSelect = document.getElementById('duration');
// const timeSlotsContainer = document.getElementById('time-slots');
// const basePriceElement = document.getElementById('base-price');
// const totalPriceElement = document.getElementById('total-price');

// // Constants
// const PRICE_PER_30_MIN = 50; // ₹50 per 30 minutes
// const SERVICE_FEE = 10; // ₹10 service fee

// // Initialize the booking system
// function initBookingSystem() {
//   // Set minimum date to today
//   const today = new Date().toISOString().split('T')[0];
//   bookingDate.min = today;
//   bookingDate.value = today;
  
//   // Event listeners
//   durationSelect.addEventListener('change', generateTimeSlots);
//   bookingForm.addEventListener('submit', handleFormSubmit);
  
//   // Initial setup
//   generateTimeSlots();
// }

// // Generate available time slots
// function generateTimeSlots() {
//   const duration = durationSelect.value;
//   timeSlotsContainer.innerHTML = '';
  
//   if (!duration) {
//     timeSlotsContainer.innerHTML = '<div class="empty">Please select duration first</div>';
//     updatePrice(0);
//     return;
//   }
  
//   // Generate slots from 8AM to 10PM (every 30 minutes)
//   for (let hour = 8; hour <= 22; hour++) {
//     for (let minutes of ['00', '30']) {
//       // Skip if it would go past closing time
//       if (hour === 22 && minutes === '30') continue;
      
//       const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
//       const slot = document.createElement('div');
//       slot.className = 'time-slot';
//       slot.textContent = time;
//       slot.dataset.time = time;
      
//       // Randomly mark some slots as booked (for demo)
//       if (Math.random() > 0.7) {
//         slot.classList.add('booked');
//         slot.title = 'This slot is already booked';
//       } else {
//         slot.addEventListener('click', function() {
//           selectTimeSlot(this);
//         });
//       }
      
//       timeSlotsContainer.appendChild(slot);
//     }
//   }
  
//   updatePrice(calculateBasePrice(duration));
// }

// // Select a time slot
// function selectTimeSlot(slotElement) {
//   // Deselect all other slots
//   document.querySelectorAll('.time-slot').forEach(slot => {
//     slot.classList.remove('selected');
//   });
  
//   // Select the clicked slot
//   slotElement.classList.add('selected');
  
//   // Update price if duration is selected
//   if (durationSelect.value) {
//     updatePrice(calculateBasePrice(durationSelect.value));
//   }
// }

// // Calculate base price based on duration
// function calculateBasePrice(duration) {
//   return Math.floor((duration / 30) * PRICE_PER_30_MIN);
// }

// // Update price display
// function updatePrice(basePrice) {
//   basePriceElement.textContent = `₹${basePrice}`;
//   totalPriceElement.textContent = `₹${basePrice + SERVICE_FEE}`;
// }

// // Handle form submission
// function handleFormSubmit(e) {
//   e.preventDefault();
  
//   // Get form values
//   const date = bookingDate.value;
//   const duration = durationSelect.value;
//   const vehicleType = document.querySelector('input[name="vehicle-type"]:checked')?.value;
//   const selectedSlot = document.querySelector('.time-slot.selected');
  
//   // Validate form
//   if (!date || !duration || !vehicleType || !selectedSlot) {
//     alert('Please fill all booking details and select a time slot');
//     return;
//   }
  
//   // Prepare booking data
//   const bookingData = {
//     station: document.getElementById('station-name').textContent,
//     date: date,
//     time: selectedSlot.dataset.time,
//     duration: `${duration} minutes`,
//     vehicleType: vehicleType,
//     basePrice: calculateBasePrice(duration),
//     serviceFee: SERVICE_FEE,
//     totalPrice: calculateBasePrice(duration) + SERVICE_FEE
//   };
  
//   // Process booking (in a real app, you would send to your backend)
//   processBooking(bookingData);
// }

// // Process booking (mock implementation)
// function processBooking(bookingData) {
//   console.log('Processing booking:', bookingData);
  
//   // Show success message
//   alert(`Booking Confirmed!\n\n` +
//         `Station: ${bookingData.station}\n` +
//         `Date: ${new Date(bookingData.date).toLocaleDateString()}\n` +
//         `Time: ${bookingData.time}\n` +
//         `Duration: ${bookingData.duration}\n` +
//         `Vehicle: ${getVehicleName(bookingData.vehicleType)}\n` +
//         `Total: ₹${bookingData.totalPrice}`);
  
//   // Reset form
//   bookingForm.reset();
//   timeSlotsContainer.innerHTML = '';
//   updatePrice(0);
  
//   // In a real app, you would redirect to a confirmation page
//   // window.location.href = `confirmation.html?booking=${encodeURIComponent(JSON.stringify(bookingData))}`;
// }

// // Helper function to get vehicle name
// function getVehicleName(type) {
//   switch(type) {
//     case 'car': return 'Electric Car';
//     case 'bike': return 'Electric Bike';
//     case 'scooter': return 'Electric Scooter';
//     default: return type;
//   }
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', initBookingSystem);


// // DOM Elements
// const bookingForm = document.getElementById('booking-form');
// const bookingDate = document.getElementById('booking-date');
// const durationSelect = document.getElementById('duration');
// const timeSlotsContainer = document.getElementById('time-slots');
// const basePriceElement = document.getElementById('base-price');
// const totalPriceElement = document.getElementById('total-price');
// const stationSelect = document.getElementById('station-select');
// const stationDetails = document.getElementById('station-details');

// // Manual Station Data
// const stations = [
//   {
//     name: "Jaipur Charging Hub",
//     status: "Available",
//     slots: 5,
//     review: "Fast charging, great service!",
//     repairTime: "N/A",
//     chargingSpeed: "Fast",
//     openingHours: "24/7",
//     latitude: 26.9260,
//     longitude: 75.7850,
//     lastUpdated: new Date(),
//     price: 50 // ₹50 per 30 minutes
//   },
//   {
//     name: "Manipal University Charger",
//     status: "Available",
//     slots: 4,
//     review: "Best spot for students, affordable rates.",
//     repairTime: "N/A",
//     chargingSpeed: "Fast",
//     openingHours: "24/7",
//     latitude: 26.8430,
//     longitude: 75.5640,
//     lastUpdated: new Date(),
//     price: 45 // ₹45 per 30 minutes
//   },
//   {
//     name: "Udaipur EV Point",
//     status: "Available",
//     slots: 3,
//     review: "Peaceful location, clean area.",
//     repairTime: "N/A",
//     chargingSpeed: "Fast",
//     openingHours: "24/7",
//     latitude: 26.8780,
//     longitude: 75.7220,
//     lastUpdated: new Date(),
//     price: 55 // ₹55 per 30 minutes
//   },
//   {
//     name: "Ajmer Fast Charge",
//     status: "Busy",
//     slots: 1,
//     review: "Always crowded, but works well.",
//     repairTime: "N/A",
//     chargingSpeed: "Normal",
//     openingHours: "6 AM - 11 PM",
//     latitude: 26.9320,
//     longitude: 75.7950,
//     lastUpdated: new Date(),
//     price: 40 // ₹40 per 30 minutes
//   }
// ];

// // Constants
// const SERVICE_FEE = 10; // ₹10 service fee

// // Initialize the booking system
// function initBookingSystem() {
//   // Set minimum date to today
//   const today = new Date().toISOString().split('T')[0];
//   bookingDate.min = today;
//   bookingDate.value = today;
  
//   // Populate station dropdown
//   populateStationDropdown();
  
//   // Event listeners
//   stationSelect.addEventListener('change', handleStationSelect);
//   durationSelect.addEventListener('change', generateTimeSlots);
//   bookingForm.addEventListener('submit', handleFormSubmit);
  
//   // Initial setup
//   generateTimeSlots();
// }

// // Populate station dropdown with manual data
// function populateStationDropdown() {
//   stationSelect.innerHTML = '<option value="">Select a station</option>';
  
//   stations.forEach(station => {
//     const option = document.createElement('option');
//     option.value = station.name;
//     option.textContent = `${station.name} (${station.status}, ${station.slots} slots)`;
//     stationSelect.appendChild(option);
//   });
// }

// // Handle station selection
// function handleStationSelect() {
//   const selectedName = this.value;
//   const selectedStation = stations.find(station => station.name === selectedName);
  
//   if (selectedStation) {
//     showStationDetails(selectedStation);
//     stationDetails.style.display = 'block';
//   } else {
//     stationDetails.style.display = 'none';
//   }
  
//   // Regenerate time slots when station changes
//   generateTimeSlots();
// }

// // Update the showStationDetails function to match your HTML
// function showStationDetails(station) {
//     // Get or create the station details container
//     const stationDetails = document.getElementById('station-details');
//     if (!stationDetails) return;
  
//     // Create the details HTML structure
//     stationDetails.innerHTML = `
//       <div class="station-card">
//         <div class="station-details">
//           <h2>${station.name}</h2>
//           <p class="station-description">${station.review}</p>
          
//           <div class="station-meta">
//             <div class="meta-item">
//               <i class="fas fa-bolt"></i>
//               <span>${station.chargingSpeed}</span>
//             </div>
//             <div class="meta-item">
//               <i class="fas fa-map-marker-alt"></i>
//               <span>Lat: ${station.latitude}, Lng: ${station.longitude}</span>
//             </div>
//             <div class="meta-item">
//               <i class="fas fa-clock"></i>
//               <span>${station.openingHours}</span>
//             </div>
//             <div class="meta-item">
//               <i class="fas fa-rupee-sign"></i>
//               <span>₹${station.price} per 30 mins</span>
//             </div>
//             <div class="meta-item">
//               <i class="fas fa-info-circle"></i>
//               <span>Status: ${station.status}</span>
//             </div>
//             <div class="meta-item">
//               <i class="fas fa-car"></i>
//               <span>Available Slots: ${station.slots}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
  
//     // Make sure the container is visible
//     stationDetails.style.display = 'block';
//   }
// // Generate available time slots
// function generateTimeSlots() {
//   const duration = durationSelect.value;
//   const selectedStation = stations.find(s => s.name === stationSelect.value);
  
//   timeSlotsContainer.innerHTML = '';
  
//   if (!duration) {
//     timeSlotsContainer.innerHTML = '<div class="empty">Please select duration first</div>';
//     updatePrice(0);
//     return;
//   }
  
//   if (!selectedStation) {
//     timeSlotsContainer.innerHTML = '<div class="empty">Please select a station first</div>';
//     updatePrice(0);
//     return;
//   }
  
//   // Get opening hours
//   const openingHours = selectedStation.openingHours;
//   let startHour = 8, endHour = 22; // Default hours
  
//   // Parse opening hours if they're in "HH AM - HH PM" format
//   if (openingHours.includes('AM') || openingHours.includes('PM')) {
//     const [openStr, closeStr] = openingHours.split(' - ');
//     startHour = parseHour(openStr);
//     endHour = parseHour(closeStr);
//   }
  
//   // Generate slots from startHour to endHour (every 30 minutes)
//   for (let hour = startHour; hour <= endHour; hour++) {
//     for (let minutes of ['00', '30']) {
//       // Skip if it would go past closing time
//       if (hour === endHour && minutes === '30') continue;
      
//       const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
//       const slot = document.createElement('div');
//       slot.className = 'time-slot';
//       slot.textContent = time;
//       slot.dataset.time = time;
      
//       // Mark as booked if station is busy or random chance (for demo)
//       if (selectedStation.status === "Busy" || Math.random() > 0.7) {
//         slot.classList.add('booked');
//         slot.title = 'This slot is already booked';
//       } else {
//         slot.addEventListener('click', function() {
//           selectTimeSlot(this);
//         });
//       }
      
//       timeSlotsContainer.appendChild(slot);
//     }
//   }
  
//   updatePrice(calculateBasePrice(duration, selectedStation.price));
// }

// // Helper function to parse hour from "HH AM/PM" format
// function parseHour(timeStr) {
//   if (timeStr === '24/7') return 0; // Special case for 24/7 stations
  
//   const [time, period] = timeStr.split(' ');
//   let hour = parseInt(time);
  
//   if (period === 'PM' && hour < 12) hour += 12;
//   if (period === 'AM' && hour === 12) hour = 0;
  
//   return hour;
// }

// // Select a time slot
// function selectTimeSlot(slotElement) {
//   // Deselect all other slots
//   document.querySelectorAll('.time-slot').forEach(slot => {
//     slot.classList.remove('selected');
//   });
  
//   // Select the clicked slot
//   slotElement.classList.add('selected');
  
//   // Update price if duration is selected
//   if (durationSelect.value) {
//     const selectedStation = stations.find(s => s.name === stationSelect.value);
//     const price = selectedStation ? selectedStation.price : 50;
//     updatePrice(calculateBasePrice(durationSelect.value, price));
//   }
// }

// // Calculate base price based on duration and station price
// function calculateBasePrice(duration, pricePer30Min = 50) {
//   return Math.floor((duration / 30) * pricePer30Min);
// }

// // Update price display
// function updatePrice(basePrice) {
//   basePriceElement.textContent = `₹${basePrice}`;
//   totalPriceElement.textContent = `₹${basePrice + SERVICE_FEE}`;
// }

// // Handle form submission
// function handleFormSubmit(e) {
//   e.preventDefault();
  
//   // Get form values
//   const date = bookingDate.value;
//   const duration = durationSelect.value;
//   const vehicleType = document.querySelector('input[name="vehicle-type"]:checked')?.value;
//   const selectedSlot = document.querySelector('.time-slot.selected');
//   const selectedStation = stations.find(s => s.name === stationSelect.value);
  
//   // Validate form
//   if (!date || !duration || !vehicleType || !selectedSlot || !selectedStation) {
//     alert('Please fill all booking details and select a time slot');
//     return;
//   }
  
//   // Prepare booking data
//   const bookingData = {
//     station: selectedStation.name,
//     date: date,
//     time: selectedSlot.dataset.time,
//     duration: `${duration} minutes`,
//     vehicleType: vehicleType,
//     basePrice: calculateBasePrice(duration, selectedStation.price),
//     serviceFee: SERVICE_FEE,
//     totalPrice: calculateBasePrice(duration, selectedStation.price) + SERVICE_FEE,
//     location: `Lat: ${selectedStation.latitude}, Lng: ${selectedStation.longitude}`
//   };
  
//   // Process booking
//   processBooking(bookingData);
// }

// // Process booking (mock implementation)
// function processBooking(bookingData) {
//   console.log('Processing booking:', bookingData);
  
//   // Show success message
//   alert(`Booking Confirmed!\n\n` +
//         `Station: ${bookingData.station}\n` +
//         `Date: ${new Date(bookingData.date).toLocaleDateString()}\n` +
//         `Time: ${bookingData.time}\n` +
//         `Duration: ${bookingData.duration}\n` +
//         `Vehicle: ${getVehicleName(bookingData.vehicleType)}\n` +
//         `Location: ${bookingData.location}\n` +
//         `Total: ₹${bookingData.totalPrice}`);
  
//   // Reset form
//   bookingForm.reset();
//   timeSlotsContainer.innerHTML = '';
//   stationDetails.style.display = 'none';
//   updatePrice(0);
// }

// // Helper function to get vehicle name
// function getVehicleName(type) {
//   switch(type) {
//     case 'car': return 'Electric Car';
//     case 'bike': return 'Electric Bike';
//     case 'scooter': return 'Electric Scooter';
//     default: return type;
//   }
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', initBookingSystem);


// DOM Elements
const bookingForm = document.getElementById('booking-form');
const bookingDate = document.getElementById('booking-date');
const durationSelect = document.getElementById('duration');
const timeSlotsContainer = document.getElementById('time-slots');
const basePriceElement = document.getElementById('base-price');
const totalPriceElement = document.getElementById('total-price');
const stationSelect = document.getElementById('station-select');
const stationDetails = document.getElementById('station-details');

// Receipt Elements
const receiptModal = document.getElementById('booking-receipt');
const rcptStation = document.getElementById('rcpt-station');
const rcptLocation = document.getElementById('rcpt-location');
const rcptDatetime = document.getElementById('rcpt-datetime');
const rcptDuration = document.getElementById('rcpt-duration');
const rcptVehicle = document.getElementById('rcpt-vehicle');
const rcptCharger = document.getElementById('rcpt-charger');
const rcptTotal = document.getElementById('rcpt-total');
const bookingId = document.getElementById('booking-id');

// Manual Station Data
const stations = [
  {
    name: "Jaipur Charging Hub",
    status: "Available",
    slots: 5,
    review: "Fast charging, great service!",
    repairTime: "N/A",
    chargingSpeed: "Fast",
    openingHours: "24/7",
    latitude: 26.9260,
    longitude: 75.7850,
    lastUpdated: new Date(),
    price: 50
  },
  {
    name: "Manipal University Charger",
    status: "Available",
    slots: 4,
    review: "Best spot for students, affordable rates.",
    repairTime: "N/A",
    chargingSpeed: "Fast",
    openingHours: "24/7",
    latitude: 26.8430,
    longitude: 75.5640,
    lastUpdated: new Date(),
    price: 45
  },
  {
    name: "Udaipur EV Point",
    status: "Available",
    slots: 3,
    review: "Peaceful location, clean area.",
    repairTime: "N/A",
    chargingSpeed: "Fast",
    openingHours: "24/7",
    latitude: 26.8780,
    longitude: 75.7220,
    lastUpdated: new Date(),
    price: 55
  },
  {
    name: "Ajmer Fast Charge",
    status: "Busy",
    slots: 1,
    review: "Always crowded, but works well.",
    repairTime: "N/A",
    chargingSpeed: "Normal",
    openingHours: "6 AM - 11 PM",
    latitude: 26.9320,
    longitude: 75.7950,
    lastUpdated: new Date(),
    price: 40
  }
];

// Constants
const SERVICE_FEE = 10;

// Initialize the booking system
function initBookingSystem() {
  const today = new Date().toISOString().split('T')[0];
  bookingDate.min = today;
  bookingDate.value = today;
  
  populateStationDropdown();
  
  // Event listeners
  stationSelect.addEventListener('change', handleStationSelect);
  durationSelect.addEventListener('change', generateTimeSlots);
  bookingForm.addEventListener('submit', handleFormSubmit);
  
  // Receipt handlers
  document.getElementById('share-receipt').addEventListener('click', shareReceipt);
  document.getElementById('download-receipt').addEventListener('click', downloadReceipt);
  document.getElementById('print-receipt').addEventListener('click', printReceipt);
  document.getElementById('close-receipt').addEventListener('click', closeReceipt);
  receiptModal.addEventListener('click', (e) => e.target === receiptModal && closeReceipt());

  generateTimeSlots();
}

function populateStationDropdown() {
  stationSelect.innerHTML = '<option value="">Select a station</option>';
  stations.forEach(station => {
    const option = document.createElement('option');
    option.value = station.name;
    option.textContent = `${station.name} (${station.status}, ${station.slots} slots)`;
    stationSelect.appendChild(option);
  });
}

function handleStationSelect() {
  const selectedStation = stations.find(s => s.name === this.value);
  if (selectedStation) {
    showStationDetails(selectedStation);
    stationDetails.style.display = 'block';
  } else {
    stationDetails.style.display = 'none';
  }
  generateTimeSlots();
}

function showStationDetails(station) {
  stationDetails.innerHTML = `
    <div class="station-card">
      <div class="station-details">
        <h2>${station.name}</h2>
        <p class="station-description">${station.review}</p>
        <div class="station-meta">
          ${generateStationMeta(station)}
        </div>
      </div>
    </div>`;
  stationDetails.style.display = 'block';
}

function generateStationMeta(station) {
  return `
    <div class="meta-item"><i class="fas fa-bolt"></i>${station.chargingSpeed}</div>
    <div class="meta-item"><i class="fas fa-map-marker-alt"></i>Lat: ${station.latitude}, Lng: ${station.longitude}</div>
    <div class="meta-item"><i class="fas fa-clock"></i>${station.openingHours}</div>
    <div class="meta-item"><i class="fas fa-rupee-sign"></i>₹${station.price} per 30 mins</div>
    <div class="meta-item"><i class="fas fa-info-circle"></i>Status: ${station.status}</div>
    <div class="meta-item"><i class="fas fa-car"></i>Slots: ${station.slots}</div>
  `;
}

function generateTimeSlots() {
  timeSlotsContainer.innerHTML = '';
  const duration = durationSelect.value;
  const selectedStation = stations.find(s => s.name === stationSelect.value);

  if (!duration || !selectedStation) {
    timeSlotsContainer.innerHTML = `<div class="empty">Please select ${!duration ? 'duration' : 'station'} first</div>`;
    updatePrice(0);
    return;
  }

  const [startHour, endHour] = parseOpeningHours(selectedStation.openingHours);
  generateTimeSlotsGrid(startHour, endHour, selectedStation);
  updatePrice(calculateBasePrice(duration, selectedStation.price));
}

function parseOpeningHours(hours) {
  if (hours === '24/7') return [0, 24];
  if (!hours.includes('AM') && !hours.includes('PM')) return [8, 22];
  
  const [openStr, closeStr] = hours.split(' - ');
  return [parseHour(openStr), parseHour(closeStr)];
}

function parseHour(timeStr) {
  const [time, period] = timeStr.split(' ');
  let hour = parseInt(time);
  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour;
}

function generateTimeSlotsGrid(startHour, endHour, station) {
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes of ['00', '30']) {
      if (hour === endHour && minutes === '30') continue;
      const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
      const slot = createTimeSlot(time, station);
      timeSlotsContainer.appendChild(slot);
    }
  }
}

function createTimeSlot(time, station) {
  const slot = document.createElement('div');
  slot.className = 'time-slot';
  slot.textContent = time;
  slot.dataset.time = time;

  if (station.status === "Busy" || Math.random() > 0.7) {
    slot.classList.add('booked');
    slot.title = 'Booked';
  } else {
    slot.addEventListener('click', () => selectTimeSlot(slot));
  }
  return slot;
}

function selectTimeSlot(slot) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  slot.classList.add('selected');
  if (durationSelect.value) {
    const station = stations.find(s => s.name === stationSelect.value);
    updatePrice(calculateBasePrice(durationSelect.value, station?.price || 50));
  }
}

function calculateBasePrice(duration, pricePer30Min) {
  return Math.floor((duration / 30) * pricePer30Min);
}

function updatePrice(basePrice) {
  basePriceElement.textContent = `₹${basePrice}`;
  totalPriceElement.textContent = `₹${basePrice + SERVICE_FEE}`;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = validateForm();
  if (!formData) return;
  
  processBooking({
    ...formData,
    basePrice: calculateBasePrice(formData.duration, formData.station.price),
    totalPrice: calculateBasePrice(formData.duration, formData.station.price) + SERVICE_FEE
  });
}

function validateForm() {
  const date = bookingDate.value;
  const duration = durationSelect.value;
  const vehicleType = document.querySelector('input[name="vehicle-type"]:checked')?.value;
  const selectedSlot = document.querySelector('.time-slot.selected');
  const selectedStation = stations.find(s => s.name === stationSelect.value);

  if (!date || !duration || !vehicleType || !selectedSlot || !selectedStation) {
    alert('Please complete all booking details');
    return null;
  }
  return { date, duration, vehicleType, slot: selectedSlot.dataset.time, station: selectedStation };
}

function processBooking(bookingData) {
  showReceipt({
    id: `EV${Date.now().toString().slice(-6)}`,
    station: bookingData.station.name,
    location: `Lat: ${bookingData.station.latitude}, Lng: ${bookingData.station.longitude}`,
    datetime: `${new Date(bookingData.date).toLocaleDateString()}, ${bookingData.slot}`,
    duration: `${bookingData.duration} mins`,
    vehicle: getVehicleName(bookingData.vehicleType),
    charger: bookingData.station.chargingSpeed,
    total: bookingData.totalPrice
  });
  console.log('Booking Confirmed:', bookingData);
  alert(`Booking Confirmed!\n\nStation: ${bookingData.station.name}\nDate: ${bookingData.date}\nTime: ${bookingData.slot}\nDuration: ${bookingData.duration} mins\nVehicle: ${getVehicleName(bookingData.vehicleType)}\nTotal: ₹${bookingData.totalPrice}`);
  bookingForm.reset();
  resetForm();
}

function showReceipt(data) {
  bookingId.textContent = data.id;
  rcptStation.textContent = data.station;
  rcptLocation.textContent = data.location;
  rcptDatetime.textContent = data.datetime;
  rcptDuration.textContent = data.duration;
  rcptVehicle.textContent = data.vehicle;
  rcptCharger.textContent = data.charger;
  rcptTotal.textContent = `₹${data.total}`;
  receiptModal.style.display = 'flex';
}

function resetForm() {
  bookingForm.reset();
  timeSlotsContainer.innerHTML = '';
  stationDetails.style.display = 'none';
  updatePrice(0);
}

function getVehicleName(type) {
  const vehicles = {
    car: 'Electric Car',
    bike: 'Electric Bike',
    scooter: 'Electric Scooter'
  };
  return vehicles[type] || type;
}

// Receipt Functions
function shareReceipt() {
  const content = `Booking Reference: ${bookingId.textContent}
Station: ${rcptStation.textContent}
Location: ${rcptLocation.textContent}
Date/Time: ${rcptDatetime.textContent}
Duration: ${rcptDuration.textContent}
Vehicle: ${rcptVehicle.textContent}
Total: ${rcptTotal.textContent}`;

  if (navigator.share) {
    navigator.share({ title: 'EV Charging Receipt', text: content });
  } else {
    navigator.clipboard.writeText(content);
    alert('Receipt copied to clipboard!');
  }
}

function downloadReceipt() {
  if (typeof html2pdf !== 'undefined') {
    html2pdf().from(receiptModal).set({
      margin: 10,
      filename: `EV_Receipt_${bookingId.textContent}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  } else {
    // Fallback method using Blob and FileSaver.js
    const receiptContent = `
      <html>
        <head>
          <title>EV Receipt ${bookingId.textContent}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2c3e50; }
            .receipt-detail { margin: 10px 0; }
          </style>
        </head>
        <body>
          ${receiptModal.innerHTML}
        </body>
      </html>
    `;
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `EV_Receipt_${bookingId.textContent}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

function printReceipt() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>EV Receipt ${bookingId.textContent}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #2c3e50; }
          .receipt-detail { margin: 10px 0; }
        </style>
      </head>
      <body>
        ${receiptModal.innerHTML}
      </body>
    </html>
  `);
  printWindow.print();
  printWindow.close();
}

function closeReceipt() {
  receiptModal.style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', initBookingSystem);