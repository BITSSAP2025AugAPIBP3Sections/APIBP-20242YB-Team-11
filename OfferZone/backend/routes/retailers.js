const express = require('express');
const router = express.Router();
const {
  createRetailer,
  getRetailers,
  getRetailerById,
  updateRetailer,
  deleteRetailer,
} = require('../controllers/retailers');
const { protect, authorize } = require('../middleware/AuthMiddleware');

/**
 * @route   POST /api/retailers
 * @desc    Create a new retailer
 * @access  Protected (requires authentication - retailer or admin only)
 */
router.post('/', protect, authorize('retailer', 'admin'), createRetailer);

/**
 * @route   GET /api/retailers
 * @desc    Get all retailers with optional filters and pagination
 * @access  Protected (requires authentication)
 * @query   page, limit, businessType, ownerId, q (search by shopName)
 */
router.get('/', protect, getRetailers);

/**
 * @route   GET /api/retailers/:id
 * @desc    Get a single retailer by ID
 * @access  Protected (requires authentication)
 */
router.get('/:id', protect, getRetailerById);

/**
 * @route   PUT /api/retailers/:id
 * @desc    Update retailer by ID
 * @access  Protected (requires authentication - owner or admin only)
 */
router.put('/:id', protect, updateRetailer);

/**
 * @route   DELETE /api/retailers/:id
 * @desc    Delete retailer by ID
 * @access  Protected (requires authentication - owner or admin only)
 */
router.delete('/:id', protect, deleteRetailer);

module.exports = router;
