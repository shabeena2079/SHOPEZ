const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

// Get all cart items
router.get("/", protect, getCartItems);

// Add item to cart
router.post("/", protect, addToCart);

// Update cart item
router.put("/:id", protect, updateCartItem);

// Delete cart item
router.delete("/:id", protect, deleteCartItem);

module.exports = router;