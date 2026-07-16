import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../Styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <h3 className="empty-cart">Your cart is empty.</h3>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img
              src={`/images/${item.product.images[0]}`}
              alt={item.product.title}
              className="cart-image"
            />

            <div className="cart-details">
              <h3>{item.product.title}</h3>

              <p>
                <strong>Brand:</strong> {item.product.brand}
              </p>

              <p>
                <strong>Variant:</strong> {item.selectedVariant}
              </p>

              <p>
                <strong>Price:</strong> ₹{item.product.price}
              </p>

              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;