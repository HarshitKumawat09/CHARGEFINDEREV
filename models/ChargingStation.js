const mongoose = require("mongoose");

const ChargingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  slots: { type: Number, required: true },
  reviews: [
    {
      user: { type: String, required: true }, // or use a User model if authenticated
      text: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  repairTime: { type: String },
  chargingSpeed: { type: String, required: true },
  openingHours: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true } 
});

module.exports = mongoose.model("ChargingStation", ChargingStationSchema);
