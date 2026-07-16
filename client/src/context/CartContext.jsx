import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart when application starts
  useEffect(() => {
    fetchCart();
  }, []);

  // Get cart items
  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");

      setCartItems(response.data);

    } catch (error) {
      console.log("Fetch Cart Error:");
      console.log(error.response?.data);
      console.log(error.response?.status);
    }
  };


  // Add product to cart
  const addToCart = async (cartData) => {
    try {

      console.log("Sending Cart Data:", cartData);

      const response = await API.post("/cart", cartData);

      console.log("Cart Added Successfully:");
      console.log(response.data);

      await fetchCart();

      return response.data;

    } catch (error) {

      console.log("Add Cart Error:");
      console.log(error.response?.data);
      console.log(error.response?.status);

      throw error;
    }
  };


  // Remove product from cart
  const removeFromCart = async (id) => {
    try {

      await API.delete(`/cart/${id}`);

      await fetchCart();

    } catch (error) {

      console.log("Delete Cart Error:");
      console.log(error.response?.data);
      console.log(error.response?.status);

    }
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};