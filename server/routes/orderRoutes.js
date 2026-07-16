const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// User Routes
router.post("/", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

// Admin Routes
router.get("/admin/all", protect, adminProtect, getAllOrders);

router.put("/:id", protect, adminProtect, updateOrderStatus);

router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;