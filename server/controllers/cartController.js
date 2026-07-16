const Cart = require("../models/Cart");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json({
      message: "Product Added To Cart Successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Cart Items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("product")
      .populate("user");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Updated Successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      message: "Cart Item Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};