const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require("../controllers/Products");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("retailer"), createProduct);
router.get("/", getAllProducts);
router.get("/mine", protect, authorize("retailer"), getMyProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, authorize("retailer"), updateProduct);
router.delete("/:id", protect, authorize("retailer"), deleteProduct);


module.exports = router;
