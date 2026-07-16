const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

const {
  getBanner,
  updateBanner
} = require("../controllers/bannerController");

// Get Banner
router.get("/", getBanner);

// Update Banner (Admin)
router.put("/", protect, adminProtect, updateBanner);

module.exports = router;