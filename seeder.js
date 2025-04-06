const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const ChargingStation = require("./models/ChargingStation");

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "123456", // Hashing needed in real implementation
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "abcdef", // Hashing needed in real implementation
  },
];


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
    lastUpdated: new Date()
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
    lastUpdated: new Date()
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
    lastUpdated: new Date()
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
    lastUpdated: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await ChargingStation.deleteMany(); // Clear existing data
    await ChargingStation.insertMany(stations);
    await User.deleteMany();
    await User.insertMany(users);
    console.log("✅ Data inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
};

seedDatabase();
