const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");

router.put("/updateHighScore", async (req, res) => {
  const { username, highScore } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.highScore = highScore;
    await user.save();
    res.status(200).json({
      success: true,
      highScore: user.highScore,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
