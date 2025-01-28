import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { MONGO_URI } = process.env;

const db = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("You have successfully connected to the MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    setTimeout(() => {
      console.log("Retrying MongoDB connection...");
      db();
    }, 5000);
  }
};

export default db;
