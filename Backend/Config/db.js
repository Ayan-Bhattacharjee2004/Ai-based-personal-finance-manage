require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected to Atlas database");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

module.exports = ConnectDB;
