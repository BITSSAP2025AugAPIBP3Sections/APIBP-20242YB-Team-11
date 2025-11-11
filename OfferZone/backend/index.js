require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;mongoose
  .connect(process.env.MONGODB_URI)
  .then((connected) => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Welcome to OfferZone API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
