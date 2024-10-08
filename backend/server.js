const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongoDB = require("./db");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://crispy-sniffle.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

mongoDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("An error occured");
  });
app.use(express.json());

// to create a new user
app.use("/api", require("./Routes/createNewUser"));
// login a user
app.use("/api", require("./Routes/loginUser"));
// update high score
app.use("/api", require("./Routes/updateHighScore"));
// validate token
app.use("/api", require("./Routes/validateToken"));
// get leader board
app.use("/api", require("./Routes/leaderboardList"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
