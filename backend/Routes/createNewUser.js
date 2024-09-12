const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const { body, validationResult } = require("express-validator");

//for creating new User
router.post(
  "/addNewUser",
  [
    body("username").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      await User.create({
        username: req.body.username,
        emailId: req.body.email,
        password: req.body.password,
      });
      res.json({ success: true });
    } catch (err) {
      if (err.code === 11000) {
        res
          .status(400)
          .json({ success: false, message: "duplicate key error" });
      } else {

        res.status(500).json({ success: false, message: {err} });
      }
    }
  }
);

module.exports = router;
