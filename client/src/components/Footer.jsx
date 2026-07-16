import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
          <h2>ShopEZ</h2>
          <p>One Destination for all your needs.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/products">All Products</a>
        </div>

        <div className="footer-column">
          <h4>Account</h4>
          <a href="/cart">Cart</a>
          <a href="/profile">Profile</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <a href="/">Electronics</a>
          <a href="/">Fashion</a>
          <a href="/">Groceries</a>
          <a href="/">Sports</a>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <a href="/">Contact Us</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        © 2026 ShopEZ. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;