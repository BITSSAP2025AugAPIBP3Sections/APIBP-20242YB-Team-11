require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Products");
const offerRoutes = require("./routes/Offers");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connected) => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Welcome to OfferZone API");
});

app.use("/offerzone/auth", userRoutes);
app.use("/offerzone/products", productRoutes);
app.use("/offerzone/offers", offerRoutes);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
