import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/UserModels.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = 12;

router.post("/newSignup", async (req, res) => {
  console.log("Received Signup Request:", req.body);

  try {
    const { firstName, lastName, userName, password } = req.body;
    console.log("these are the users", req.body);

    const existingUser = await User.findOne({ email: userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ first_name: firstName, last_name: lastName, username: userName, email: userName, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: userName }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up", error });
  }
});

export default router;
