const Product = require("../models/Product");
const sendError = (res, code, message) =>
  res.status(code).json({ success: false, message });

exports.createProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return sendError(res, 400, "Request body is empty.");

    const { name, brand, category, description, price, city, area, image } =
      req.body;
    if (!name || !brand || !category || !price || !city || !area)
      return sendError(res, 400, "All required fields must be provided.");

    const product = await Product.create({
      name,
      brand,
      category,
      description,
      price,
      city,
      area,
      image,
      retailer: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Product created", product });
  } catch (err) {
    console.error("Create Product Error:", err.message);
    sendError(res, 500, "Error creating product.");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.city) filters.city = req.query.city;
    if (req.query.area) filters.area = req.query.area;
    if (req.query.category) filters.category = req.query.category;

    const products = await Product.find(filters).populate(
      "retailer",
      "name email"
    );
    res.status(200).json({ success: true, count: products.length, products });
  } catch (err) {
    console.error("Get Products Error:", err.message);
    sendError(res, 500, "Error fetching products.");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "retailer",
      "name email"
    );
    if (!product) return sendError(res, 404, "Product not found.");
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("Get Product Error:", err.message);
    sendError(res, 500, "Error fetching product.");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, "Product not found.");
    if (product.retailer.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized.");

    Object.assign(product, req.body);
    await product.save();
    res
      .status(200)
      .json({ success: true, message: "Product updated", product });
  } catch (err) {
    console.error("Update Product Error:", err.message);
    sendError(res, 500, "Error updating product.");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, "Product not found.");
    if (product.retailer.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized.");

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    sendError(res, 500, "Error deleting product.");
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ retailer: req.user._id });
    if (!products.length) return sendError(res, 404, "No products found.");
    res.status(200).json({ success: true, count: products.length, products });
  } catch (err) {
    console.error("Get My Products Error:", err.message);
    sendError(res, 500, "Error fetching retailer products.");
  }
};
