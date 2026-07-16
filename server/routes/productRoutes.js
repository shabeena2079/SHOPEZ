const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/admin/all", getAllProducts);

router.get("/:id", getProductById);

router.post("/", protect, adminProtect, addProduct);

router.put("/:id", protect, adminProtect, updateProduct);

router.delete("/:id", protect, adminProtect, deleteProduct);

module.exports = router;