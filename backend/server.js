const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongoDB = require("./db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Include the allowed methods
  next();
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
