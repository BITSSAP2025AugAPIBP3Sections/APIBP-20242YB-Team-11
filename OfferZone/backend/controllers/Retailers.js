const mongoose = require("mongoose");
const Retailer = require("../models/Retailer");
const User = require("../models/User");

/**
 * Create a new retailer
 * @route POST /api/retailers
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
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
    const requiredFields = ['retailerCode', 'shopName', 'ownerName', 'businessType', 'description', 'address'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields.",
        missingFields,
        required: requiredFields
      });
    }

    // Validate business type
    const validBusinessTypes = ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"];
    if (!validBusinessTypes.includes(businessType)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid business type.",
        providedType: businessType,
        validTypes: validBusinessTypes
      });
    }

    // Validate string lengths
    if (retailerCode.length < 3 || retailerCode.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Retailer code must be between 3 and 20 characters."
      });
    }

    if (shopName.length < 2 || shopName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Shop name must be between 2 and 100 characters."
      });
    }

    // Validate products and offers arrays if provided
    if (products && Array.isArray(products)) {
      for (const [index, productId] of products.entries()) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ 
            success: false,
            message: `Invalid product ID at index ${index} in products array.`,
            invalidId: productId
          });
        }
      }
    }

    if (offers && Array.isArray(offers)) {
      for (const [index, offerId] of offers.entries()) {
        if (!mongoose.Types.ObjectId.isValid(offerId)) {
          return res.status(400).json({ 
            success: false,
            message: `Invalid offer ID at index ${index} in offers array.`,
            invalidId: offerId
          });
        }
      }
    }

    // Validate time format if provided
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (openingTime && !timeRegex.test(openingTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid opening time format. Use HH:MM format (e.g., 09:00)."
      });
    }

    if (closingTime && !timeRegex.test(closingTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid closing time format. Use HH:MM format (e.g., 21:00)."
      });
    }

    // Validate owner ID format and existence
    if (!mongoose.Types.ObjectId.isValid(ownerName)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid owner ID format.",
        providedId: ownerName
      });
    }

    const owner = await User.findById(ownerName);
    if (!owner) {
      return res.status(404).json({ 
        success: false,
        message: "Owner user not found.",
        ownerId: ownerName
      });
    }

    // Validate that the user has retailer role
    if (owner.role !== "retailer") {
      return res.status(400).json({ 
        success: false,
        message: "User must have retailer role to own a shop.",
        currentRole: owner.role,
        requiredRole: "retailer"
      });
    }

    // Additional security: Check if authenticated user matches owner (optional enhancement)
    if (req.user && req.user.id !== ownerName) {
      // Allow if user is admin or the same user
      if (req.user.role !== "admin" && req.user.id !== ownerName) {
        return res.status(403).json({
          success: false,
          message: "You can only create retailers for yourself.",
          authenticatedUser: req.user.id,
          requestedOwner: ownerName
        });
      }
    }

    // Prevent duplicate shopName or retailerCode
    const existing = await Retailer.findOne({
      $or: [{ shopName }, { retailerCode }],
    });
    
    if (existing) {
      const duplicateField = existing.shopName === shopName ? 'shopName' : 'retailerCode';
      const duplicateValue = existing.shopName === shopName ? shopName : retailerCode;
      
      return res.status(409).json({ 
        success: false,
        message: `Retailer with same ${duplicateField} already exists.`,
        duplicateField,
        duplicateValue,
        existingRetailerId: existing._id
      });
    }

    // Create retailer with validated data
    const retailerData = {
      retailerCode: retailerCode.trim(),
      shopName: shopName.trim(),
      ownerName,
      businessType,
      description: description.trim(),
      address: address.trim(),
      products: products || [],
      offers: offers || [],
    };

    // Add optional fields if provided
    if (openingTime) retailerData.openingTime = openingTime;
    if (closingTime) retailerData.closingTime = closingTime;

    const retailer = new Retailer(retailerData);
    const saved = await retailer.save();

    // Return success response with populated data
    const populatedRetailer = await Retailer.findById(saved._id)
      .populate("ownerName", "name email role")
      .populate("products")
      .populate("offers");

    return res.status(201).json({
      success: true,
      message: "Retailer created successfully.",
      data: populatedRetailer,
      retailerId: saved._id
    });

  } catch (err) {
    console.error("createRetailer error:", err);
    
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
        value: e.value
      }));
      
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: validationErrors
      });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `Duplicate ${duplicateField} value.`,
        field: duplicateField,
        value: err.keyValue[duplicateField]
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal server error while creating retailer.",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
}

/**
 * Get list of retailers with optional filters and pagination
 * @route GET /api/retailers
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * Query params: page, limit, businessType, ownerId, q (search shopName)
 */
async function getRetailers(req, res) {
  try {
    // Validate and sanitize pagination parameters
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100); // Max 100 items per page
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
        .populate("ownerName", "name email role")
        .populate("products")
        .populate("offers")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(), // Use lean() for better performance
      Retailer.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: "Retailers retrieved successfully.",
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      filters: {
        businessType: req.query.businessType || null,
        ownerId: req.query.ownerId || null,
        search: req.query.q || null
      },
      data: items,
      count: items.length
    });

  } catch (err) {
    console.error("getRetailers error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error while retrieving retailers.",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
}

/**
 * Get single retailer by id
 * @route GET /api/retailers/:id
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getRetailerById(req, res) {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid retailer ID format.",
        providedId: id
      });
    }

    const retailer = await Retailer.findById(id)
      .populate("ownerName", "name email role city")
      .populate("products")
      .populate("offers");

    if (!retailer) {
      return res.status(404).json({ 
        success: false,
        message: "Retailer not found.",
        retailerId: id
      });
    }

    return res.status(200).json({
      success: true,
      message: "Retailer retrieved successfully.",
      data: retailer
    });

  } catch (err) {
    console.error("getRetailerById error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error while retrieving retailer.",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
}

/**
 * Update retailer by id (partial updates supported)
 * @route PUT /api/retailers/:id
 * @access Protected (Requires authentication)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateRetailer(req, res) {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid retailer ID format.",
        providedId: id
      });
    }

    // Check if retailer exists first
    const existingRetailer = await Retailer.findById(id);
    if (!existingRetailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found.",
        retailerId: id
      });
    }

    const updates = { ...req.body };
    
    // Remove fields that shouldn't be updated
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    // Validate business type if being updated
    if (updates.businessType) {
      const validBusinessTypes = ["Grocery", "Bakery", "Salon", "Mobile", "Electronics", "Clothing", "Other"];
      if (!validBusinessTypes.includes(updates.businessType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid business type.",
          providedType: updates.businessType,
          validTypes: validBusinessTypes
        });
      }
    }
    // Validate opening and closing hours format if being updated
    if (updates.openingHours) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(updates.openingHours)) {
        return res.status(400).json({
          success: false,
          message: "Invalid opening hours format. Use HH:MM format (24-hour).",
          providedHours: updates.openingHours,
          expectedFormat: "HH:MM (e.g., 09:00, 18:30)"
        });
      }
    }

    if (updates.closingHours) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(updates.closingHours)) {
        return res.status(400).json({
          success: false,
          message: "Invalid closing hours format. Use HH:MM format (24-hour).",
          providedHours: updates.closingHours,
          expectedFormat: "HH:MM (e.g., 09:00, 18:30)"
        });
      }
    }

    // Security check: Only allow owner to update their own retailer
    if (existingRetailer.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own retailer profile.",
        retailerId: id
      });
    }

    // Validate owner ID if being updated (admin functionality)
    if (updates.ownerName && req.user.role === 'admin') {
      if (!mongoose.Types.ObjectId.isValid(updates.ownerName)) {
        return res.status(400).json({
          success: false,
          message: "Invalid owner ID format.",
          providedId: updates.ownerName
        });
      }
      
      const owner = await User.findById(updates.ownerName);
      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Owner user not found.",
          ownerId: updates.ownerName
        });
      }
      
      if (owner.role !== "retailer") {
        return res.status(400).json({
          success: false,
          message: "User must have retailer role to own a shop.",
          userRole: owner.role,
          requiredRole: "retailer"
        });
      }
    } else {
      // Don't allow owner updates for non-admin users
      delete updates.ownerName;
    }

    // Prevent updating to duplicate shopName or retailerCode
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
          const conflictField = conflict.shopName === updates.shopName ? 'shopName' : 'retailerCode';
          const conflictValue = conflictField === 'shopName' ? conflict.shopName : conflict.retailerCode;
          return res.status(409).json({
            success: false,
            message: `A retailer with this ${conflictField} already exists.`,
            field: conflictField,
            value: conflictValue,
            existingRetailerId: conflict._id
          });
        }
      }
    }

    const updated = await Retailer.findByIdAndUpdate(
      id, 
      updates, 
      { 
        new: true, 
        runValidators: true 
      }
    )
      .populate("ownerName", "name email role")
      .populate("products")
      .populate("offers");

    return res.status(200).json({
      success: true,
      message: "Retailer updated successfully.",
      retailer: updated,
      updatedFields: Object.keys(updates)
    });

  } catch (err) {
    console.error("updateRetailer error:", err);

    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
        value: e.value
      }));
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validationErrors
      });
    }

    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      const duplicateValue = err.keyValue[duplicateField];
      return res.status(400).json({
        success: false,
        message: `A retailer with this ${duplicateField} already exists.`,
        field: duplicateField,
        value: duplicateValue
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

/**
 * Delete retailer by id
 * @route DELETE /api/retailers/:id
 * @access Protected (Requires authentication - Owner or Admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteRetailer(req, res) {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid retailer ID format.",
        providedId: id
      });
    }

    // Check if retailer exists first
    const existingRetailer = await Retailer.findById(id);
    if (!existingRetailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found.",
        retailerId: id
      });
    }

    // Security check: Only allow owner or admin to delete
    if (existingRetailer.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own retailer profile or must be an admin.",
        retailerId: id
      });
    }

    const deleted = await Retailer.findByIdAndDelete(id);
    
    return res.status(200).json({
      success: true,
      message: "Retailer deleted successfully.",
      deletedRetailer: {
        id: deleted._id,
        shopName: deleted.shopName,
        retailerCode: deleted.retailerCode
      }
    });

  } catch (err) {
    console.error("deleteRetailer error:", err);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

module.exports = {
  createRetailer,
  getRetailers,
  getRetailerById,
  updateRetailer,
  deleteRetailer,
};