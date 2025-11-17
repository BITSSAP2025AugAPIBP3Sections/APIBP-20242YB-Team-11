const Offer = require("../models/Offers");
const Product = require("../models/Product");

const sendError = (res, code, message) =>
  res.status(code).json({ success: false, message });

exports.createOffer = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0)
      return sendError(res, 400, "Request body is empty.");

    const {
      product,
      title,
      description,
      discountPercent,
      originalPrice,
      offerPrice,
      validFrom,
      validTill,
      city,
      area,
      isPremium,
    } = req.body;
    if (
      !product ||
      !title ||
      !discountPercent ||
      !originalPrice ||
      !offerPrice ||
      !validFrom ||
      !validTill ||
      !city ||
      !area
    )
      return sendError(res, 400, "All required fields must be provided.");

    const offer = await Offer.create({
      product,
      retailer: req.user._id,
      title,
      description,
      discountPercent,
      originalPrice,
      offerPrice,
      validFrom,
      validTill,
      city,
      area,
      isPremium,
    });

    res.status(201).json({ success: true, message: "Offer created", offer });
  } catch (err) {
    console.error("Create Offer Error:", err.message);
    sendError(res, 500, "Error creating offer.");
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.city) filters.city = req.query.city;
    if (req.query.area) filters.area = req.query.area;

    const offers = await Offer.find(filters)
      .populate("product", "name brand category")
      .populate("retailer", "name email");

    res.status(200).json({ success: true, count: offers.length, offers });
  } catch (err) {
    console.error("Get Offers Error:", err.message);
    sendError(res, 500, "Error fetching offers.");
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("product", "name brand category")
      .populate("retailer", "name email");
    if (!offer) return sendError(res, 404, "Offer not found.");
    res.status(200).json({ success: true, offer });
  } catch (err) {
    console.error("Get Offer Error:", err.message);
    sendError(res, 500, "Error fetching offer.");
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return sendError(res, 404, "Offer not found.");
    if (offer.retailer.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized.");

    Object.assign(offer, req.body);
    await offer.save();
    res.status(200).json({ success: true, message: "Offer updated", offer });
  } catch (err) {
    console.error("Update Offer Error:", err.message);
    sendError(res, 500, "Error updating offer.");
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return sendError(res, 404, "Offer not found.");
    if (offer.retailer.toString() !== req.user._id.toString())
      return sendError(res, 403, "Unauthorized.");

    await offer.deleteOne();
    res.status(200).json({ success: true, message: "Offer deleted" });
  } catch (err) {
    console.error("Delete Offer Error:", err.message);
    sendError(res, 500, "Error deleting offer.");
  }
};

exports.getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ retailer: req.user._id }).populate(
      "product",
      "name brand category"
    );
    if (!offers.length) return sendError(res, 404, "No offers found.");
    res.status(200).json({ success: true, count: offers.length, offers });
  } catch (err) {
    console.error("Get My Offers Error:", err.message);
    sendError(res, 500, "Error fetching retailer offers.");
  }
};

exports.getOffersByFilter = async (req, res) => {
  try {
    const { city, area, category, brand, product } = req.query;

    if (!city) return sendError(res, 400, "City is required.");

    // Base filters for offers
    const offerFilters = {
      city: new RegExp(`^${city}$`, "i"),
    };
    if (area) offerFilters.area = new RegExp(`^${area}$`, "i");

    // Build product filters dynamically
    const productFilters = {};
    if (category) productFilters.category = new RegExp(`^${category}$`, "i");
    if (brand) productFilters.brand = new RegExp(`^${brand}$`, "i");
    if (product) productFilters.name = new RegExp(`^${product}$`, "i");

    let matchedProductIds = [];

    if (Object.keys(productFilters).length > 0) {
      const matchedProducts = await Product.find(productFilters).select("_id");
      matchedProductIds = matchedProducts.map((p) => p._id);

      if (!matchedProductIds.length)
        return sendError(res, 404, "No products found for given filters.");

      offerFilters.product = { $in: matchedProductIds };
    }

    const offers = await Offer.find(offerFilters)
      .populate("product", "name brand category")
      .populate("retailer", "name email");

    if (!offers.length)
      return sendError(res, 404, "No offers found for given filters.");

    res.status(200).json({
      success: true,
      count: offers.length,
      offers,
    });
  } catch (err) {
    console.error("Get Offers By Filter Error:", err.message);
    sendError(res, 500, "Error fetching offers.");
  }
};


exports.searchOffers = async (req, res) => {
  try {
    const { city, query } = req.params;
    const { area } = req.query;

    if (!query || !city)
      return sendError(res, 400, "City and search query are required.");

    const filters = { city: new RegExp(city, "i") };
    if (area) filters.area = new RegExp(area, "i");

    const offers = await Offer.find(filters)
      .populate({
        path: "product",
        match: {
          $or: [
            { name: new RegExp(query, "i") },
            { brand: new RegExp(query, "i") },
            { category: new RegExp(query, "i") },
          ],
        },
        select: "name brand category",
      })
      .populate("retailer", "name email");

    const filteredOffers = offers.filter((o) => o.product);
    if (!filteredOffers.length)
      return sendError(res, 404, "No matching offers found.");

    res
      .status(200)
      .json({
        success: true,
        count: filteredOffers.length,
        offers: filteredOffers,
      });
  } catch (err) {
    console.error("Search Offers Error:", err.message);
    sendError(res, 500, "Error searching offers.");
  }
};
