const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const { body, validationResult } = require("express-validator");

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

      if (!userData) {
        return res.status(401).json({ error: "Incorrect credentials" });
      }

      if (!(userData.password === req.body.password))
        return res.status(401).json({ error: "Incorrect credentials" });
      return res.json({
        success: true,
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
