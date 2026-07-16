import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import API from "../api/axios";

import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);

      setProduct(response.data);
      setSelectedVariant(response.data.variants[0]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-details">
      {/* LEFT SIDE */}
      <div className="left-section">
        <div className="small-images">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`/images/${img}`}
              alt="product"
              className={currentImage === index ? "active" : ""}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        <div className="main-image">
          <button
            className="arrow left"
            onClick={() =>
              setCurrentImage(
                (currentImage - 1 + product.images.length) %
                  product.images.length
              )
            }
          >
            ❮
          </button>

          <img
            src={`/images/${product.images[currentImage]}`}
            alt={product.title}
          />

          <button
            className="arrow right"
            onClick={() =>
              setCurrentImage(
                (currentImage + 1) % product.images.length
              )
            }
          >
            ❯
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <h3 className="brand-d">{product.brand}</h3>

        <h2 className="product-title">{product.title}</h2>

        <p className="short-description">{product.description}</p>

        {/* VARIANT */}
        <div className="option">
          <label>Choose Variant</label>

          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {product.variants.map((variant, index) => (
              <option
                key={index}
                value={variant}
              >
                {variant}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        <div className="option">
          <label>Quantity</label>

          <select
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          >
            {[1, 2, 3, 4].map((q) => (
              <option
                key={q}
                value={q}
              >
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className="price">
          <span className="price-label">Price:</span>

          <span className="new-price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{product.oldPrice}
          </span>

          <span className="discount">
            ({product.discount}% OFF)
          </span>
        </div>

        <p className="delivery">
          Free Delivery in 5 days
        </p>

        {/* BUTTONS */}
        <div className="buttons">
          <button
            className="buy-btn"
            onClick={() =>
              navigate(`/order/${product._id}`)
            }
          >
            Buy Now
          </button>

          <button
            className="cart-btn"
            onClick={async () => {
              try {
                const userId = localStorage.getItem("userId");
                console.log(userId);
                if (!userId) {
                  alert("Please login first.");
                  return;
                }

                await addToCart({
                  user: userId,
                  product: product._id,
                  selectedVariant,
                  quantity,
                });

                alert("Product added to cart successfully!");
              } catch (error) {
                alert("Failed to add product.");

                console.log(error);
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;