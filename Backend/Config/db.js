// require("dotenv").config();
// const mongoose = require("mongoose");
// const MONGO_URL = process.env.MONGO_URI;

// const ConnectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Successfully connected to Atlas database");
//   } catch (error) {
//     console.log("Database connection failed", error);
//   }
// };

// module.exports = ConnectDB;
const mongoose = require('mongoose');

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;