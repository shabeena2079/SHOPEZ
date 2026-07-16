import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../Styles/Admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">

      {/* Top Navbar */}

      <div className="admin-navbar">

        <div className="admin-logo">
          ShopEZ (admin)
        </div>

        <div className="admin-links">

          <NavLink to="/admin">Home</NavLink>

          <NavLink to="/admin/users">Users</NavLink>

          <NavLink to="/admin/orders">Orders</NavLink>

          <NavLink to="/admin/products">Products</NavLink>

          <NavLink to="/admin/add-product">New Product</NavLink>

          <span className="logout-btn" onClick={logout}>
            Logout
          </span>

        </div>

      </div>

      {/* Page Content */}

      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;