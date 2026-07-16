import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import "../Styles/LoginPage.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Try User Login
      const response = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userId", response.data.user._id);

      window.dispatchEvent(
        new Event("storage")
      );

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      try {
        // If User Login Fails, Try Admin Login
        const response = await API.post("/admin/login", {
          email,
          password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.admin));

        alert(response.data.message);

        navigate("/admin");

      } catch (adminError) {

        alert("Invalid Email or Password");

      }

    }
  };

  return (
    <div className="loginpage-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="signIn-btn" onClick={handleLogin}>
        Sign In
      </button>

      <p>
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;