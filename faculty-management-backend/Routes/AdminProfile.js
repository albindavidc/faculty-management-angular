import express from "express";
import User from "../Models/UserModels.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
