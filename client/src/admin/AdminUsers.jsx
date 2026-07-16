import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../Styles/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Fetch Users");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);

      alert("User Deleted Successfully");

      // Refresh Users List
      fetchUsers();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to Delete User"
      );
    }
  };

  return (
    <div className="admin-users">

      <h1>Users</h1>

      <table>

        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.length > 0 ? (

            users.map((user) => (

              <tr key={user._id}>

                <td>{user.username}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="4">No Users Found</td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default AdminUsers;