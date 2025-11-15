const Retailer = require("../models/Retailer");
const User = require("../models/User");

const sendError = (res, code, message) =>
  res.status(code).json({ success: false, message });

// Create a new retailer
exports.createRetailer = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return sendError(res, 400, "Request body is empty.");

    const {
      retailerCode,
      shopName,
      ownerName,
      businessType,
      description,
      address,
      openingTime,
      closingTime,
    } = req.body;

    if (
      !retailerCode ||
      !shopName ||
      !ownerName ||
      !businessType ||
      !description ||
      !address
    )
      return sendError(res, 400, "All required fields must be provided.");

    // Check if retailer code already exists
    const existingRetailer = await Retailer.findOne({ retailerCode });
    if (existingRetailer)
      return sendError(res, 400, "Retailer code already exists.");

    // Check if shop name already exists
    const existingShop = await Retailer.findOne({ shopName });
    if (existingShop)
      return sendError(res, 400, "Shop name already exists.");

    // Verify owner exists and has retailer role
    const owner = await User.findById(ownerName);
    if (!owner)
      return sendError(res, 404, "Owner not found.");
    if (owner.role !== "retailer")
      return sendError(res, 400, "Owner must have retailer role.");

    const retailer = await Retailer.create({
      retailerCode,
      shopName,
      ownerName,
      businessType,
      description,
      address,
      openingTime,
      closingTime,
    });

    res.status(201).json({
      success: true,
      message: "Retailer created successfully",
      retailer,
    });
  } catch (err) {
    console.error("Create Retailer Error:", err.message);
    sendError(res, 500, "Error creating retailer.");
  }
};

// Get all retailers
exports.getAllRetailers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.businessType) filters.businessType = req.query.businessType;
    if (req.query.city) {
      // Get retailers in a specific city by checking owner's city
      const usersInCity = await User.find({ city: req.query.city }).select("_id");
      const userIds = usersInCity.map(user => user._id);
      filters.ownerName = { $in: userIds };
    }

    const retailers = await Retailer.find(filters)
      .populate("ownerName", "name email city")
      .populate("products", "name brand category")
      .populate("offers", "title discountPercent validFrom validTill");

    res.status(200).json({
      success: true,
      count: retailers.length,
      retailers,
    });
  } catch (err) {
    console.error("Get Retailers Error:", err.message);
    sendError(res, 500, "Error fetching retailers.");
  }
};

// Get retailer by ID
exports.getRetailerById = async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id)
      .populate("ownerName", "name email city")
      .populate("products", "name brand category price")
      .populate("offers", "title discountPercent validFrom validTill");

    if (!retailer) return sendError(res, 404, "Retailer not found.");

    res.status(200).json({ success: true, retailer });
  } catch (err) {
    console.error("Get Retailer Error:", err.message);
    sendError(res, 500, "Error fetching retailer.");
  }
};

// Get retailer by retailer code
exports.getRetailerByCode = async (req, res) => {
  try {
    const retailer = await Retailer.findOne({ retailerCode: req.params.code })
      .populate("ownerName", "name email city")
      .populate("products", "name brand category price")
      .populate("offers", "title discountPercent validFrom validTill");

    if (!retailer) return sendError(res, 404, "Retailer not found.");

    res.status(200).json({ success: true, retailer });
  } catch (err) {
    console.error("Get Retailer By Code Error:", err.message);
    sendError(res, 500, "Error fetching retailer.");
  }
};

// Update retailer
exports.updateRetailer = async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) return sendError(res, 404, "Retailer not found.");

    // Check if user is authorized to update (owner of the retailer)
    if (req.user && retailer.ownerName.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized to update this retailer.");

    // If updating retailer code, check if it already exists
    if (req.body.retailerCode && req.body.retailerCode !== retailer.retailerCode) {
      const existingRetailer = await Retailer.findOne({ retailerCode: req.body.retailerCode });
      if (existingRetailer)
        return sendError(res, 400, "Retailer code already exists.");
    }

    // If updating shop name, check if it already exists
    if (req.body.shopName && req.body.shopName !== retailer.shopName) {
      const existingShop = await Retailer.findOne({ shopName: req.body.shopName });
      if (existingShop)
        return sendError(res, 400, "Shop name already exists.");
    }

    Object.assign(retailer, req.body);
    await retailer.save();

    res.status(200).json({
      success: true,
      message: "Retailer updated successfully",
      retailer,
    });
  } catch (err) {
    console.error("Update Retailer Error:", err.message);
    sendError(res, 500, "Error updating retailer.");
  }
};

// Delete retailer
exports.deleteRetailer = async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) return sendError(res, 404, "Retailer not found.");

    // Check if user is authorized to delete (owner of the retailer)
    if (req.user && retailer.ownerName.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized to delete this retailer.");

    await retailer.deleteOne();
    res.status(200).json({
      success: true,
      message: "Retailer deleted successfully",
    });
  } catch (err) {
    console.error("Delete Retailer Error:", err.message);
    sendError(res, 500, "Error deleting retailer.");
  }
};

// Get retailers by business type
exports.getRetailersByBusinessType = async (req, res) => {
  try {
    const { businessType } = req.params;

    const validBusinessTypes = ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"];
    if (!validBusinessTypes.includes(businessType))
      return sendError(res, 400, "Invalid business type.");

    const retailers = await Retailer.find({ businessType })
      .populate("ownerName", "name email city")
      .populate("products", "name brand category")
      .populate("offers", "title discountPercent validFrom validTill");

    if (!retailers.length)
      return sendError(res, 404, "No retailers found for this business type.");

    res.status(200).json({
      success: true,
      count: retailers.length,
      retailers,
    });
  } catch (err) {
    console.error("Get Retailers By Business Type Error:", err.message);
    sendError(res, 500, "Error fetching retailers.");
  }
};

// Search retailers by name or business type
exports.searchRetailers = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query)
      return sendError(res, 400, "Search query is required.");

    const retailers = await Retailer.find({
      $or: [
        { shopName: new RegExp(query, "i") },
        { businessType: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    })
      .populate("ownerName", "name email city")
      .populate("products", "name brand category")
      .populate("offers", "title discountPercent validFrom validTill");

    if (!retailers.length)
      return sendError(res, 404, "No matching retailers found.");

    res.status(200).json({
      success: true,
      count: retailers.length,
      retailers,
    });
  } catch (err) {
    console.error("Search Retailers Error:", err.message);
    sendError(res, 500, "Error searching retailers.");
  }
};

// Get my retailer (for logged-in retailer users)
exports.getMyRetailer = async (req, res) => {
  try {
    if (!req.user)
      return sendError(res, 401, "Authentication required.");

    const retailer = await Retailer.findOne({ ownerName: req.user._id })
      .populate("ownerName", "name email city")
      .populate("products", "name brand category price")
      .populate("offers", "title discountPercent validFrom validTill");

    if (!retailer)
      return sendError(res, 404, "No retailer profile found for this user.");

    res.status(200).json({ success: true, retailer });
  } catch (err) {
    console.error("Get My Retailer Error:", err.message);
    sendError(res, 500, "Error fetching retailer profile.");
  }
};