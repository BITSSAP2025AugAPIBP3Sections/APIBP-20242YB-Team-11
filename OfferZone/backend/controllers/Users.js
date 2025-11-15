require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message || "Something went wrong",
  });
};

// POST /offerzone/auth → signup
exports.signup = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return errorResponse(res, 400, "Request body is empty.");

    const { name, email, password, role, city } = req.body;

    if (!name || !email || !password || !role)
      return errorResponse(res, 400, "Missing required fields.");

    if (!["retailer", "customer"].includes(role))
      return errorResponse(
        res,
        400,
        "Invalid role. Use 'retailer' or 'customer'."
      );

    const existing = await User.findOne({ email });
    if (existing)
      return errorResponse(res, 409, "User already exists with this email.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      city,
    });

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        city: user.city,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    return errorResponse(res, 500, "Internal server error during signup.");
  }
};

// POST /offerzone/auth/session → login
exports.login = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return errorResponse(res, 400, "Request body is empty.");

    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, 400, "Both email and password are required.");

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found.");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return errorResponse(res, 401, "Invalid credentials.");

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        city: user.city,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return errorResponse(res, 500, "Internal server error during login.");
  }
};

// GET /offerzone/auth/me → current user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return errorResponse(res, 401, "Unauthorized access.");

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return errorResponse(res, 404, "User not found.");

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get Current User Error:", err.message);
    return errorResponse(res, 500, "Error fetching user details.");
  }
};
