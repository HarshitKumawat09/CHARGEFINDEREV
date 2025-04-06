const express = require("express");
const { getStations, searchStations, addReview, getStationById, getStationReviews} = require("../controllers/stationController");
const router = express.Router();

// Get all charging stations
router.get("/", getStations);
router.get("/search", searchStations);
router.get("/:id", getStationById);
router.get("/:id/reviews", getStationReviews);
router.post("/:id/reviews", addReview); // New endpoint for reviews

 // New endpoint for getting a station by ID

module.exports = router;
