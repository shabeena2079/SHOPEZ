import "../Styles/Sidebar.css";
import "../Styles/Category.css";
import "../Styles/Main.css";

import Sidebar from "../components/Sidebar";
import Products from "../components/Products";

import { useEffect, useState } from "react";
import API from "../api/axios";

import men from "../assets/men.jpg";
import women from "../assets/women.jpg";
import mobiles from "../assets/mobiles.jpg";
import electronics from "../assets/electronics.jpg";
import accessories from "../assets/accessories.jpg";
import beauty from "../assets/beauty.jpg";
import groceries from "../assets/groceries.jpg";
import sports from "../assets/sports.jpg";

function Home({ search }) {
  const [banner, setBanner] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
  fetchBanner();
}, []);

const fetchBanner = async () => {
  try {
    const res = await API.get("/banner");
    setBanner(res.data.image);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      {banner && (
      <img src={banner} className="main" alt="Banner" />
      )}
      <div className="category">

        <div className="card" onClick={() =>{setSelectedCategory(["Men"]); setPageTitle("Men");}}>
          <img src={men} alt="Men" />
          <h2 className="names">Men</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Women"]); setPageTitle("Women");}}>
          <img src={women} alt="Women" />
          <h2 className="names">Women</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Mobiles"]); setPageTitle("Mobiles");}}>
          <img src={mobiles} alt="Mobiles" />
          <h2 className="names">Mobiles</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Electronics"]); setPageTitle("Electronics");}}>
          <img src={electronics} alt="Electronics" />
          <h2 className="names">Electronics</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Accessories"]); setPageTitle("Accessories");}}>
          <img src={accessories} alt="Accessories" />
          <h2 className="names">Accessories</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Beauty"]); setPageTitle("Beauty");}}>
          <img src={beauty} alt="Beauty" />
          <h2 className="names">Beauty</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Groceries"]); setPageTitle("Groceries");}}>
          <img src={groceries} alt="Groceries" />
          <h2 className="names">Groceries</h2>
        </div>

        <div className="card" onClick={() =>{ setSelectedCategory(["Sports"]); setPageTitle("Sports");}}>
          <img src={sports} alt="Sports" />
          <h2 className="names">Sports</h2>
        </div>
      </div>

       {pageTitle !== "" && (
        <h1 className="page-title">
          {pageTitle}
        </h1>
       )}

      <div className="products-container">

        <Sidebar  
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              sortBy={sortBy}
              setSortBy={setSortBy}
       />

        <div className="products-section">
          <h2 className="products-heading">All Products</h2>

          <Products 
                search={search}  
                selectedCategory={selectedCategory}
                selectedGender={selectedGender}
                sortBy={sortBy}
          />

        </div>
      </div>
    </>
  );
}

export default Home;