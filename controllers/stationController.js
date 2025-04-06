// const ChargingStation = require("../models/ChargingStation");

// // Get all charging stations
// const getStations = async (req, res) => {
//   try {
//     const stations = await ChargingStation.find();
//     res.json(stations);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


//2nd code snippet
// const ChargingStation = require("../models/ChargingStation");

// // Get all charging stations
// const getStations = async (req, res) => {
//   try {
//     const stations = await ChargingStation.find();
//     res.json(stations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Search charging stations
// const searchStations = async (req, res) => {
//   const { name } = req.query;
//   try {
//     const stations = await ChargingStation.find({ name: { $regex: name, $options: "i" } });
//     res.json(stations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const addReview = async (req, res) => {
//   const { id } = req.params; // Station ID
//   const { user, text, rating } = req.body;

//   try {
//     const station = await ChargingStation.findById(id);
//     if (!station) return res.status(404).json({ message: "Station not found" });

//     station.reviews.push({ user, text, rating });
//     await station.save();

//     res.status(201).json(station.reviews);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { getStations, searchStations, addReview };




const ChargingStation = require("../models/ChargingStation");

// Get all charging stations (existing)
const getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search charging stations (existing)
const searchStations = async (req, res) => {
  const { name } = req.query;
  try {
    const stations = await ChargingStation.find({ name: { $regex: name, $options: "i" } });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single station by ID (new - for your routes file)
const getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a station (new - for your routes file)
const getStationReviews = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station.reviews || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review (existing)
const addReview = async (req, res) => {
  const { id } = req.params; // Station ID
  const { user, text, rating } = req.body;

  try {
    const station = await ChargingStation.findById(id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    station.reviews.push({ user, text, rating });
    await station.save();

    res.status(201).json(station.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getStations, 
  searchStations, 
  getStationById, 
  getStationReviews, 
  addReview 
};



//3rd code snippet
// const ChargingStation = require("../models/ChargingStation");

// // Get all charging stations
// const getStations = async (req, res) => {
//   try {
//     const stations = await ChargingStation.find();
//     res.json(stations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Search charging stations
// const searchStations = async (req, res) => {
//   const { name } = req.query;
//   try {
//     const stations = await ChargingStation.find({ name: { $regex: name, $options: "i" } });
//     res.json(stations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add review to a station
// const addReview = async (req, res) => {
//   const { id } = req.params; // Station ID
//   const { user, text, rating } = req.body;

//   try {
//     const station = await ChargingStation.findById(id);
//     if (!station) return res.status(404).json({ message: "Station not found" });

//     station.reviews.push({ user, text, rating });
//     await station.save();

//     res.status(201).json(station.reviews);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get nearby stations based on location
// const getNearbyStations = async (req, res) => {
//   try {
//     const { lat, lng, radius } = req.query;
    
//     // Validate required parameters
//     if (!lat || !lng || !radius) {
//       return res.status(400).json({ 
//         message: "Missing required parameters: lat, lng, radius" 
//       });
//     }

//     // Convert to numbers and validate
//     const latitude = parseFloat(lat);
//     const longitude = parseFloat(lng);
//     const radiusInMeters = parseFloat(radius);
    
//     if (isNaN(latitude)) {
//       return res.status(400).json({ message: "Invalid latitude value" });
//     }
//     if (isNaN(longitude)) {
//       return res.status(400).json({ message: "Invalid longitude value" });
//     }
//     if (isNaN(radiusInMeters) || radiusInMeters <= 0) {
//       return res.status(400).json({ message: "Invalid radius value" });
//     }

//     const nearbyStations = await ChargingStation.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [longitude, latitude]
//           },
//           $maxDistance: radiusInMeters
//         }
//       },
//       status: "Available" // Optional: only show available stations
//     })
//     .select("name status slots chargingSpeed openingHours reviews latitude longitude")
//     .lean(); // Convert to plain JS object

//     // Add distance calculation to each station
//     const stationsWithDistance = nearbyStations.map(station => {
//       // Calculate distance in km
//       const distance = getDistanceFromLatLonInKm(
//         latitude,
//         longitude,
//         station.latitude,
//         station.longitude
//       );
      
//       // Calculate average rating
//       const avgRating = station.reviews.length > 0 
//         ? station.reviews.reduce((sum, review) => sum + review.rating, 0) / station.reviews.length
//         : 0;

//       return {
//         ...station,
//         distance: distance * 1000, // Convert to meters
//         averageRating: avgRating
//       };
//     });

//     // Sort by distance (nearest first)
//     stationsWithDistance.sort((a, b) => a.distance - b.distance);

//     res.json(stationsWithDistance);
//   } catch (error) {
//     console.error("Error finding nearby stations:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Helper function to calculate distance between coordinates (Haversine formula)
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   const distance = R * c; // Distance in km
//   return distance;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI/180);
// }

// module.exports = { 
//   getStations, 
//   searchStations, 
//   addReview,
//   getNearbyStations 
// };