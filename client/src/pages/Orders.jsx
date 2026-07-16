import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../Styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const cancelOrder = async (id) => {

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;

  try {

    const token = localStorage.getItem("token");

    await API.put(
      `/orders/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order Cancelled Successfully");

    fetchOrders();

  } catch (error) {

    console.log(error.response?.data);

    alert("Unable to Cancel Order");

  }

};

  return (
    <div className="orders-container">

      <h1 className="orders-heading">My Orders</h1>

      {orders.length === 0 ? (
        <h2 className="no-orders">No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            {order.products.map((item) => (
              <div className="order-item" key={item.product._id}>

                {/* Product Image */}

                <div className="image-section">

                  <img
                    src={`/images/${item.product.images[0]}`}
                    alt={item.product.title}
                    className="order-image"
                  />

                </div>

                {/* Product Details */}

                <div className="order-details">

                  <h2>{item.product.title}</h2>

                  <p className="description">
                    {item.product.description}
                  </p>

                  <div className="info-row">

                    <span>
                      <strong>Size:</strong> {item.selectedVariant}
                    </span>

                    <span>
                      <strong>Quantity:</strong> {item.quantity}
                    </span>

                    <span>
                      <strong>Price:</strong> ₹{item.product.price}
                    </span>

                    <span>
                      <strong>Payment:</strong> {order.paymentMethod}
                    </span>

                  </div>

                  <div className="info-row">

                    <span>
                      <strong>Address:</strong>{" "}
                      {order.shippingAddress?.address}
                    </span>

                    <span>
                      <strong>Pincode:</strong>{" "}
                      {order.shippingAddress?.pincode}
                    </span>

                    <span>
                      <strong>Ordered:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                  </div>

                  <p className="status-text">
                    <strong>Order Status:</strong>{" "}
                    {order.orderStatus}
                  </p>

                  {order.orderStatus === "Pending" && (
                    <button className="cancel-btn"  onClick={() => cancelOrder(order._id)}>
                      Cancel
                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>
        ))
      )}

    </div>
  );
};

export default Orders;