import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../Styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});// Store selected status for each order

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch All Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

       setOrders(res.data);
      // Save current status of every order
      const statusData = {};
      res.data.forEach((order) => {
        statusData[order._id] = order.orderStatus;
      });

      setSelectedStatus(statusData);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Fetch Orders");
    }
  };

  // Update Order Status
 const updateStatus = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/orders/${id}`,
      {
        orderStatus: selectedStatus[id],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order Status Updated Successfully");

    fetchOrders();

  } catch (error) {
    alert(error.response?.data?.message || "Unable to Update Status");
  }
};

  // Cancel Order
  const cancelOrder = async (id) => {
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

      alert("Order Cancelled");

      fetchOrders();

    } catch (error) {
      alert(error.response?.data?.message || "Unable to Cancel Order");
    }
  };

  return (
    <div className="admin-orders">

      <h2 className="orders-title">All Orders</h2>

      {orders.length === 0 ? (

        <h3 className="no-orders">No Orders Found</h3>

      ) : (

        orders.map((order) => (

          <div className="order-card" key={order._id}>

            {/* Product Image */}

            <div className="order-image">

              <img
                src={`/src/assets/${order.products[0]?.product?.images?.[0]}`}
                alt="product"
              />
            </div>

            {/* Order Details */}

            <div className="order-details">

              <h3>{order.products[0]?.product?.title}</h3>

              <p>
                <strong>Customer :</strong> {order.user?.username}
              </p>

              <p>
                <strong>Email :</strong> {order.user?.email}
              </p>

              <p>
                <strong>Price :</strong> ₹{order.totalPrice}
              </p>

              <p>
                <strong>Payment :</strong> {order.paymentMethod}
              </p>

              <p>
                <strong>Address :</strong>{" "}
                {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}
              </p>

              <p>
                <strong>Pincode :</strong>{" "}
                {order.shippingAddress?.pincode}
              </p>

            </div>

            {/* Order Actions */}

            <div className="order-actions">

              <span
                className={`status ${order.orderStatus.toLowerCase()}`}
              >
                {order.orderStatus}
              </span>

              {/* Select New Status */}

              <select
                value={selectedStatus[order._id] || order.orderStatus}
                onChange={(e) =>
                  setSelectedStatus((prev)=>({
                    ...prev,
                    [order._id]: e.target.value,
                  }))
                }
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                className="update-btn"
                onClick={() => updateStatus(order._id)}
              >
                Update
              </button>

              <button
                className="cancel-btn"
                onClick={() => cancelOrder(order._id)}
              >
                Cancel
              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default AdminOrders;