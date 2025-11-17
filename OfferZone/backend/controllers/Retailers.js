const mongoose = require("mongoose");
const Retailer = require("../models/Retailer");
const User = require("../models/User");

/**
 * Create a new retailer
 */
async function createRetailer(req, res) {
  try {
    const {
      retailerCode,
      shopName,
      ownerName,
      businessType,
      description,
      address,
      openingTime,
      closingTime,
      products,
      offers,
    } = req.body;

    // Validate required fields
    if (!retailerCode || !shopName || !ownerName || !businessType || !description || !address) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate business type
    const validBusinessTypes = ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"];
    if (!validBusinessTypes.includes(businessType)) {
      return res.status(400).json({ message: "Invalid business type." });
    }

    // Validate products and offers arrays if provided
    if (products && Array.isArray(products)) {
      for (const productId of products) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ message: "Invalid product ID in products array." });
        }
      }
    }

    if (offers && Array.isArray(offers)) {
      for (const offerId of offers) {
        if (!mongoose.Types.ObjectId.isValid(offerId)) {
          return res.status(400).json({ message: "Invalid offer ID in offers array." });
        }
      }
    }

    // Validate owner ID format and existence
    if (!mongoose.Types.ObjectId.isValid(ownerName)) {
      return res.status(400).json({ message: "Invalid owner ID format." });
    }

    const owner = await User.findById(ownerName);
    if (!owner) {
      return res.status(404).json({ message: "Owner user not found." });
    }

    // Validate that the user has retailer role
    if (owner.role !== "retailer") {
      return res.status(400).json({ message: "User must have retailer role to own a shop." });
    }

    // prevent duplicate shopName or retailerCode
    const existing = await Retailer.findOne({
      $or: [{ shopName }, { retailerCode }],
    });
    if (existing) return res.status(409).json({ message: "Retailer with same shopName or retailerCode already exists." });

    const retailer = new Retailer({
      retailerCode,
      shopName,
      ownerName,
      businessType,
      description,
      address,
      openingTime,
      closingTime,
      products: products || [],
      offers: offers || [],
    });

    const saved = await retailer.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("createRetailer:", err);
    return res.status(500).json({ message: "Server error." });
  }
}

/**
 * Get list of retailers with optional filters and pagination
 * Query params: page, limit, businessType, ownerId, q (search shopName)
 */
async function getRetailers(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 20, 1);
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Validate and apply businessType filter
    if (req.query.businessType) {
      const validBusinessTypes = ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"];
      if (validBusinessTypes.includes(req.query.businessType)) {
        filter.businessType = req.query.businessType;
      }
    }
    
    // Validate and apply owner filter
    if (req.query.ownerId) {
      if (mongoose.Types.ObjectId.isValid(req.query.ownerId)) {
        filter.ownerName = req.query.ownerId;
      }
    }
    
    // Apply search filter for shop name
    if (req.query.q && req.query.q.trim()) {
      filter.shopName = { $regex: req.query.q.trim(), $options: "i" };
    }

    const [items, total] = await Promise.all([
      Retailer.find(filter)
        .populate("ownerName", "name email")
        .populate("products")
        .populate("offers")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Retailer.countDocuments(filter),
    ]);

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: items,
    });
  } catch (err) {
    console.error("getRetailers:", err);
    return res.status(500).json({ message: "Server error." });
  }
}

/**
 * Get single retailer by id
 */
async function getRetailerById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id." });

    const retailer = await Retailer.findById(id)
      .populate("ownerName", "name email")
      .populate("products")
      .populate("offers");

    if (!retailer) return res.status(404).json({ message: "Retailer not found." });
    return res.json(retailer);
  } catch (err) {
    console.error("getRetailerById:", err);
    return res.status(500).json({ message: "Server error." });
  }
}

/**
 * Update retailer by id (partial updates supported)
 */
async function updateRetailer(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id." });

    const updates = { ...req.body };
    // Validate owner ID if being updated
    if (updates.ownerName) {
      if (!mongoose.Types.ObjectId.isValid(updates.ownerName)) {
        return res.status(400).json({ message: "Invalid owner ID format." });
      }
      
      const owner = await User.findById(updates.ownerName);
      if (!owner) {
        return res.status(404).json({ message: "Owner user not found." });
      }
      
      if (owner.role !== "retailer") {
        return res.status(400).json({ message: "User must have retailer role to own a shop." });
      }
    }

    // prevent updating to duplicate shopName or retailerCode
    if (updates.shopName || updates.retailerCode) {
      const orConditions = [];
      if (updates.shopName) orConditions.push({ shopName: updates.shopName });
      if (updates.retailerCode) orConditions.push({ retailerCode: updates.retailerCode });
      
      if (orConditions.length > 0) {
        const conflict = await Retailer.findOne({
          _id: { $ne: id },
          $or: orConditions,
        });
        if (conflict) {
          return res.status(409).json({ message: "Another retailer with same shopName or retailerCode exists." });
        }
      }
    }

    const updated = await Retailer.findByIdAndUpdate(id, updates, { new: true })
      .populate("ownerName", "name email")
      .populate("products")
      .populate("offers");

    if (!updated) return res.status(404).json({ message: "Retailer not found." });
    return res.json(updated);
  } catch (err) {
    console.error("updateRetailer:", err);
    return res.status(500).json({ message: "Server error." });
  }
}

/**
 * Delete retailer by id
 */
async function deleteRetailer(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id." });

    const deleted = await Retailer.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Retailer not found." });
    return res.json({ message: "Retailer deleted.", id: deleted._id });
  } catch (err) {
    console.error("deleteRetailer:", err);
    return res.status(500).json({ message: "Server error." });
  }
}

module.exports = {
  createRetailer,
  getRetailers,
  getRetailerById,
  updateRetailer,
  deleteRetailer,
};