import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Products.css";

const Products = ({ search, selectedCategory, selectedGender,sortBy }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {

    const searchMatch =
      product.title
        .toLowerCase()
        .includes((search || "").toLowerCase());

    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);

    const genderMatch =
      selectedGender.length === 0 ||
      selectedGender.includes(product.gender);

    console.log({
      title: product.title,
      productCategory: product.category,
      selectedCategory,
      categoryMatch,
      productGender: product.gender,
      selectedGender,
      genderMatch
    });

    return (
      searchMatch &&
      categoryMatch && genderMatch
    );
  });
filteredProducts.sort((a, b) => {

  if (sortBy === "low") {
    return a.price - b.price;
  }

  if (sortBy === "high") {
    return b.price - a.price;
  }

  if (sortBy === "discount") {
    return b.discount - a.discount;
  }

  if (sortBy === "popular") {
    return b.rating - a.rating;
  }

  return 0;

});
  return (
    <div className="products-grid">

      {filteredProducts.map((product) => (

        <Link
          key={product._id}
          to={`/product/${product._id}`}
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >

          <div className="product-card">

            <img
              src={`/images/${product.images[0]}`}
              alt={product.title}
            />

            <h4 className="brand">
              {product.brand}
            </h4>

            <h3 className="product-name">
              {product.title}
            </h3>

            <div className="price-section">

              <span className="price">
                ₹{product.price.toLocaleString()}
              </span>

              <span className="old-price">
                ₹{product.oldPrice.toLocaleString()}
              </span>

              <span className="discount">
                {product.discount}% off
              </span>

            </div>

            <p className="variants">
              Variant :
              <b> {product.variants.join(", ")}</b>
            </p>

            {product.fewLeft && (
              <p className="fewLeft">
                Only few left!
              </p>
            )}

          </div>

        </Link>

      ))}

    </div>
  );
};

export default Products;