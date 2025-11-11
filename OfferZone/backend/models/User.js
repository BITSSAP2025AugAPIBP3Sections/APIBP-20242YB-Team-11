const express = require("express");
const router = express.Router();
const { signup, login, getCurrentUser } = require("../controllers/User");
const { protect } = require("../middleware/authMiddleware");

router.post("/", signupservice); 
router.post("/session", loginservice); 
router.get("/me", protect, getCurrentUserservice); 