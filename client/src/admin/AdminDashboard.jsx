import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Admin.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  
    const [banner, setBanner] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const res = await API.get("/dashboard");
    setData(res.data);
    const bannerRes = await API.get("/banner");
    setBanner(bannerRes.data.image);
  } catch (err) {
    console.log(err);
  }
};

const updateBanner = async () => {
  try {

    const token = localStorage.getItem("token");
    await API.put(
      "/banner",
      {
        image: banner
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    alert("Banner Updated Successfully");
  } catch (error) {
    console.log(error);
    alert("Unable to Update Banner");
  }
};

  return (
    <div className="dashboard">

      <div className="dashboard-cards">

        <div className="dash-card">

          <h2>Total users</h2>

          <p>{data.totalUsers}</p>

          <button onClick={() => navigate("/admin/users")}>
            View all
          </button>

        </div>

        <div className="dash-card">

          <h2>All Products</h2>

          <p>{data.totalProducts}</p>

          <button onClick={() => navigate("/admin/products")}>
            View all
          </button>

        </div>

        <div className="dash-card">

          <h2>All Orders</h2>

          <p>{data.totalOrders}</p>

          <button onClick={() => navigate("/admin/orders")}>
            View all
          </button>

        </div>

        <div className="dash-card">

          <h2>Add Product</h2>

          <p>(new)</p>

          <button onClick={() => navigate("/admin/add-product")}>
            Add now
          </button>

        </div>

      </div>

      <div className="banner-box">

        <h2>Update banner</h2>

        <input
          type="text"
          placeholder="Banner url" value={banner}
          onChange={(e) => setBanner(e.target.value)}
        />

        <button onClick={updateBanner}>
          Update
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;