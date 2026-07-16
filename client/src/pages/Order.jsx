import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Order.css";

const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Choose Payment Method");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await API.post("/orders", {
      user: user._id,

      products: [
        {
          product: product._id,
          quantity: 1,
          selectedVariant: product.variants[0],
        },
      ],

      shippingAddress: {
        fullName: name,
        phone: mobile,
        address,
        city,
        pincode,
      },

      paymentMethod,
      totalPrice: product.price,
    });

    alert("Order Placed Successfully!");

    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Order Failed");
  }
};

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="modal">
      <div className="modal-box">

        <span
          className="close"
          onClick={() => navigate(-1)}
        >
          &times;
        </span>

        <h2>Checkout</h2>

        {/* Product Details */}

        <div className="order-product">

          <img
            src={`/images/${product.images[0]}`}
            alt={product.title}
            className="order-image"
          />

          <div className="order-info">
            <h3>{product.title}</h3>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>

          </div>

        </div>

        <h3>Delivery Details</h3>

        <input type="text" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)}/>

        <div className="row">

          <input type="text" placeholder="Mobile" value={mobile}
           onChange={(e) => setMobile(e.target.value)}/>
          <input type="email" placeholder="Email" value={email}
           onChange={(e) => setEmail(e.target.value)}/>

        </div>

        <div className="row">
         
         <input type="text" placeholder="Address" value={address}
         onChange={(e) => setAddress(e.target.value)}/>
         <input type="text" placeholder="City" value={city}
           onChange={(e) => setCity(e.target.value)}/>
         <input type="text" placeholder="Pincode" value={pincode}
           onChange={(e) => setPincode(e.target.value)}/>
        </div>

        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Choose Payment Method</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Cash on Delivery</option>
        </select>

        <div className="buttons">

          <button
            className="cancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

         <button className="confirm" onClick={handlePlaceOrder}>
            Place Order
        </button>

        </div>

      </div>
    </div>
  );
};

export default Order;