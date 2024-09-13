const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");

// Route to get top 10 users by high score
router.get("/leaderboardList", async (req, res) => {
  try {
    const topUsers = await User.find({})
      .sort({ highScore: -1 }) // Sort users by highScore in descending order
      .limit(10) // Limit to top 10 users
      .select("username highScore -_id");
    res.json(topUsers);
  } catch (error) {
    console.error("Failed to fetch top scores:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
