import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Register.css";
import API from "../api/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await API.post("/users/register", {
      username,
      email,
      password,
    });

    alert(response.data.message);

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  }
};

  return (
    <div className="registerpage-container">
      <h3>Create Account</h3>

      <input type="text" placeholder="Full Name"
        value={username} onChange={(e) => setUsername(e.target.value)}/>

      <input type="email" placeholder="Email" 
        value={email} onChange={(e) => setEmail(e.target.value)}/>

      <input type="password" placeholder="Password"
         value={password} onChange={(e) => setPassword(e.target.value)}/>

      <input type="password" placeholder="Confirm Password"
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
};

export default Register;