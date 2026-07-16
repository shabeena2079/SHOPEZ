import React, { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = ({searchInput, setSearchInput, setSearch,}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const loggedUser = localStorage.getItem("user");

      if (loggedUser) {
        setUser(JSON.parse(loggedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <div className="header">

      <Link to="/" className="logo">
        <h2>ShopEZ</h2>
      </Link>

      <div className="searchBox">

        <input
          className="search"
          type="text"
          placeholder="Search Mobiles, Fashion, Electronics etc..."  value={searchInput}
           onChange={(e) => setSearchInput(e.target.value)}
        />

        <FaSearchengin className="searchIcon" onClick={() => setSearch(searchInput)}/>

      </div>

      <div className="nav-right">

        {user && (
          <Link to="/orders">
            <button className="myorders-btn">
               My Orders
            </button>
          </Link>
        )}

        <Link to="/cart" className="cart">
          <TiShoppingCart size={30} />
        </Link>

        {user ? (
          <div className="account-section">

            <MdAccountCircle
              className="account-icon"
              onClick={() => setShowProfile(!showProfile)}
            />

            <span className="username">
              {user.username}
            </span>

            {showProfile && (
              <div className="profile-box">

                <h3>My Account</h3>

                <p>
                  <strong>Name:</strong> {user.username}
                </p>

                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>Role:</strong> {user.role}
                </p>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <Link to="/login">

            <button className="login-btn">
              Login
            </button>

          </Link>
        )}

      </div>

    </div>
  );
};

export default Navbar;