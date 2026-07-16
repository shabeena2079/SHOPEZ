import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="admin-navbar">

      <h2>ShopEZ (Admin)</h2>

      <div className="admin-links">

        <Link to="/admin">Home</Link>

        <Link to="/admin/users">Users</Link>

        <Link to="/admin/orders">Orders</Link>

        <Link to="/admin/products">Products</Link>

        <Link to="/admin/add-product">New Product</Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>

  );

};

export default AdminNavbar;