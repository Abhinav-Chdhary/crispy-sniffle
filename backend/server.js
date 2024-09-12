const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongoDB = require("./db");

mongoDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("An error occured");
  });
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
