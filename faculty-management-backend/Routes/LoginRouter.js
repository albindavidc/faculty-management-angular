import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Models/UserModels.js";

export default router.post("/newLogin", async (req, res) => {
  const { userName, password } = req.body;

  console.log("this is from the backend",req.body)
  const user = await User.findOne({ username: userName });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});
