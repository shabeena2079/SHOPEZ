import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/AddProduct.css";

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    brand: "",
    title: "",
    description: "",
    images: ["", "", ""],
    variants: [],
    category: "",
    price: "",
    oldPrice: "",
    discount: "",
    stock: "",
    fewLeft: false
  });

  const [variantInput, setVariantInput] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const res = await API.get(`/products/${id}`);

      setProduct({
        brand: res.data.brand || "",
        title: res.data.title || "",
        description: res.data.description || "",
        images: res.data.images || ["", "", ""],
        variants: res.data.variants || [],
        category: res.data.category || "",
        price: res.data.price || "",
        oldPrice: res.data.oldPrice || "",
        discount: res.data.discount || "",
        stock: res.data.stock || "",
        fewLeft: res.data.fewLeft || false
      });

    } catch(error) {
      console.log(error);
      alert("Unable to Fetch Product");
    }
  };


  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };


  const handleImageChange = (index,value) => {

    const updatedImages = [...product.images];

    updatedImages[index] = value;

    setProduct({
      ...product,
      images: updatedImages
    });

  };


  const addVariant = () => {

    if(variantInput.trim()==="")
      return;

    setProduct({
      ...product,
      variants:[
        ...product.variants,
        variantInput
      ]
    });

    setVariantInput("");

  };


  const removeVariant = (variant) => {

    setProduct({
      ...product,
      variants:
      product.variants.filter(
        item => item !== variant
      )
    });

  };


  const updateProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      const productData = {
        ...product,
        price:Number(product.price),
        oldPrice:Number(product.oldPrice),
        discount:Number(product.discount),
        stock:Number(product.stock),
        fewLeft:Number(product.stock)<=5
      };


      await API.put(
        `/products/${id}`,
        productData,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      alert("Product Updated Successfully");

      navigate("/admin/products");


    } catch(error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Update Product"
      );

    }

  };


  return (

    <div className="add-product-container">

      <h2>Edit Product</h2>

      <div className="product-form">


        <div className="row2">

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
          placeholder="Main Image"
          value={product.images[0]}
          onChange={(e)=>
            handleImageChange(0,e.target.value)
          }
        />


        <div className="row2">

          <input
            placeholder="Image 2"
            value={product.images[1]}
            onChange={(e)=>
              handleImageChange(1,e.target.value)
            }
          />

          <input
            placeholder="Image 3"
            value={product.images[2]}
            onChange={(e)=>
              handleImageChange(2,e.target.value)
            }
          />

        </div>


        <h3>Product Variants</h3>


        <div className="variant-box">

          <input
            placeholder="Enter Variant"
            value={variantInput}
            onChange={(e)=>
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

          {
            product.variants.map((item,index)=>(

              <span key={index}>

                {item}

                <button
                  type="button"
                  onClick={()=>
                    removeVariant(item)
                  }
                >
                  ×
                </button>

              </span>

            ))
          }

        </div>


        <div className="row">

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

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
          onClick={updateProduct}
        >
          Update Product
        </button>


      </div>

    </div>

  );

};

export default EditProduct;