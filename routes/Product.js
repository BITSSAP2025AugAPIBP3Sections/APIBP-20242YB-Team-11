const express = require("express");
const router = express.Router();
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  getMyOffers,
  getOffersByFilter,
  searchOffers,
} = require("../controllers/Offers");
const { protect, authorize } = require("../middleware/authMiddleware");

// Retailer routes
router.post("/", protect, authorize("retailer"), createOffer);
router.put("/:id", protect, authorize("retailer"), updateOffer);
router.delete("/:id", protect, authorize("retailer"), deleteOffer);
router.get("/mine", protect, authorize("retailer"), getMyOffers);

// Public routes
router.get("/", getAllOffers);
router.get("/filter", getOffersByFilter);
router.get("/search", searchOffers);
router.get("/:id", getOfferById);

module.exports = router;
