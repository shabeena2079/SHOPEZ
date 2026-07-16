import React, { useState } from "react";
import API from "../api/axios";
import "../Styles/AddProduct.css";

const AddProduct = () => {

  const [product, setProduct] = useState({
    brand: "",
    title: "",
    description: "",
    images: ["", "", ""],
    variants: [],
    category: "",
    gender: "",
    price: "",
    oldPrice: "",
    discount: "",
    stock: "",
    fewLeft: false
  });

  const [variantInput, setVariantInput] = useState("");

  // Handle normal inputs
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Handle Images
  const handleImageChange = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;

    setProduct({
      ...product,
      images: updatedImages
    });
  };

  // Add Variant
  const addVariant = () => {
    if (variantInput.trim() === "") return;

    setProduct({
      ...product,
      variants: [...product.variants, variantInput]
    });

    setVariantInput("");
  };

  // Remove Variant
  const removeVariant = (variant) => {
    setProduct({
      ...product,
      variants: product.variants.filter(
        (item) => item !== variant
      )
    });
  };

  // Add Product API
  const addProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      const productData = {
        ...product,
        price: Number(product.price),
        oldPrice: Number(product.oldPrice),
        discount: Number(product.discount),
        stock: Number(product.stock),
        fewLeft: Number(product.stock) <= 5
      };

      await API.post(
        "/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product Added Successfully");

      setProduct({
        brand: "",
        title: "",
        description: "",
        images: ["", "", ""],
        variants: [],
        category: "",
        gender: "",
        price: "",
        oldPrice: "",
        discount: "",
        stock: "",
        fewLeft: false
      });

      setVariantInput("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Add Product"
      );

    }

  };

  return (
    <div className="add-product-container">

      <h2 className="addproduct-h2">
        Add New Product
      </h2>

      <div className="product-form">

        <div className="row">

          <input
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
          />

          <input
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
        />

        <input
          placeholder="Main Image URL"
          value={product.images[0]}
          onChange={(e) =>
            handleImageChange(0, e.target.value)
          }
        />

        <div className="row">

          <input
            placeholder="Image 2 URL"
            value={product.images[1]}
            onChange={(e) =>
              handleImageChange(1, e.target.value)
            }
          />

          <input
            placeholder="Image 3 URL"
            value={product.images[2]}
            onChange={(e) =>
              handleImageChange(2, e.target.value)
            }
          />

        </div>

        <h3>Product Variants</h3>

        <div className="variant-box">

          <input
            placeholder="Example: Brown, 128GB, Large"
            value={variantInput}
            onChange={(e) =>
              setVariantInput(e.target.value)
            }
          />

          <button
            type="button"
            onClick={addVariant}
          >
            Add
          </button>

        </div>

        <div className="variant-list">

          {product.variants.map((item, index) => (

            <span key={index}>

              {item}

              <button
                type="button"
                onClick={() => removeVariant(item)}
              >
                ×
              </button>

            </span>

          ))}

        </div>

        <div className="row">

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Unisex">
              Unisex
            </option>

          </select>

          <input
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />

          <input
            name="oldPrice"
            placeholder="Old Price"
            value={product.oldPrice}
            onChange={handleChange}
          />

        </div>

        <div className="row2">

          <input
            name="discount"
            placeholder="Discount %"
            value={product.discount}
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
          />

        </div>

        <button
          className="add-btn"
          onClick={addProduct}
        >
          Add Product
        </button>

      </div>

    </div>
  );

};

export default AddProduct;