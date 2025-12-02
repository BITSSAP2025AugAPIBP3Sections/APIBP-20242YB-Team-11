require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { createYoga, createSchema } = require("graphql-yoga");
const { typeDefs, resolvers } = require("./graphql/schema");
const logger = require("./utils/logger");
const app = express();
const port = process.env.PORT || 8080;

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

app.use(express.json());
app.use(cors());

// Morgan HTTP logging → forwarded into Winston
const stream = {
  write: (message) => logger.info(message.trim()),
};
app.use(morgan("combined", { stream }));

// Load Routes
const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Products");
const offerRoutes = require("./routes/Offers");

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: ({ request }) => {
    const auth = request.headers.get("authorization") || "";
    let user = null;

    if (auth.startsWith("Bearer ")) {
      const token = auth.replace("Bearer ", "");
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {}
    }

    return { user };
  },
});

app.use("/api/v1/graphql", yoga);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    logger.error("MongoDB connection error", { error: err.message });
  });

app.get("/api/v1/", (req, res) => {
  res.send("Welcome to OfferZone API");
  logger.info("Root endpoint accessed");
});

// API Routes
app.use("/api/v1/offerzone/auth", userRoutes);
app.use("/api/v1/offerzone/products", productRoutes);
app.use("/api/v1/offerzone/offers", offerRoutes);

// Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error("Unhandled API Error", {
    message: err.message,
    route: req.originalUrl,
    stack: err.stack,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`Server started on port ${port}`);
});
