require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("You have successfully connected to the MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    setTimeout(() => {
      console.log("Retrying MongoDB connection...");
      exports.connect();
    }, 5000);
  }
};
