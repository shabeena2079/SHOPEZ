import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import "./Styles/Navbar.css";
import "./Styles/Order.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Orders from "./pages/Orders";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";

// User Layout
const UserLayout = ({ children, searchInput, setSearchInput ,search, setSearch }) => {
  return (
    <>
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={setSearch}
      />

      {children}

      <Footer />
    </>
  );
};

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  return (
    <Routes>

      {/* USER ROUTES */}

      <Route
        path="/"
        element={
          <UserLayout
            search={search}
             searchInput={searchInput}
             setSearchInput={setSearchInput}
            setSearch={setSearch}
          >
            <Home search={search} />
          </UserLayout>
        }
      />

      <Route
        path="/login"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <Login />
          </UserLayout>
        }
      />

      <Route
        path="/register"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <Register />
          </UserLayout>
        }
      />

      <Route
        path="/product/:id"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <ProductDetails />
          </UserLayout>
        }
      />

      <Route
        path="/order/:id"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <Order />
          </UserLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <Cart />
          </UserLayout>
        }
      />

      <Route
        path="/orders"
        element={
          <UserLayout
            search={search}
            setSearch={setSearch}
          >
            <Orders />
          </UserLayout>
        }
      />

      {/* ADMIN ROUTES */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Route>

    </Routes>
  );
}

export default App;