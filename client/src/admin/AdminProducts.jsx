import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/AdminProducts.css";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/admin/all");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Fetch Products");
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted Successfully");

      // Refresh Products List
      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to Delete Product"
      );
    }
  };

  // Edit Product
  const editProduct = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className="admin-products">
      <h2>All Products</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                   src={`/images/${product.images[0]}`}
                    alt={product.title}
                    className="product-img"
                  />
                </td>

                <td>{product.title}</td>

                <td>{product.brand}</td>

                <td>₹{product.price}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => editProduct(product._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;