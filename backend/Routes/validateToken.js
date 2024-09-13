const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Endpoint to validate the JWT token
router.get("/validateToken", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    // Find user by ID stored in token
    const user = await User.findOne({username}).select("-password"); // Exclude password from the result
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user details
    res.json({
      success: true,
      username: user.username,
      highScore: user.highScore,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
  }
});

module.exports = router;
