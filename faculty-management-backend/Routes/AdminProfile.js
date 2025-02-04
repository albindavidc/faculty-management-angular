import express from "express";
const router = express.Router();
import User from "../Models/UserModels.js";
import authMiddleware from "../Middleware/authMiddleware.js";

export default router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
