const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Models/userSchema");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/userLogin",
  [
    body("email").isEmail(),
    body("password", "Password should be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const emailId = req.body.email;
      const userData = await User.findOne({ emailId });

      if (!userData || userData.password !== req.body.password) {
        return res.status(401).json({ error: "Incorrect credentials" });
      }

      // Create JWT token with username and high score
      const tokenPayload = {
        username: userData.username,
        highScore: userData.highScore,
      };
      // sign and set an expiration (e.g. 1 hour)
      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "2h" });

      return res.json({
        success: true,
        token, // send the token to the client
        username: userData.username,
        highScore: userData.highScore,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
