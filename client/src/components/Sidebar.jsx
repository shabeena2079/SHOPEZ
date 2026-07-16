import React from "react";

const Sidebar = ({selectedCategory, setSelectedCategory,selectedGender, setSelectedGender,sortBy,setSortBy,}) => {
  console.log(setSelectedCategory);

  const handleCategoryChange = (category) => {

  if(selectedCategory.includes(category)){

    setSelectedCategory(
      selectedCategory.filter(
        (item)=> item !== category
      )
    );

  }else{

    setSelectedCategory([
      ...selectedCategory,
      category
    ]);

  }

};
const handleGenderChange = (gender)=>{

  if(selectedGender.includes(gender)){

    setSelectedGender(
      selectedGender.filter(
        item=>item !== gender
      )
    );

  }
  else{

    setSelectedGender([
      ...selectedGender,
      gender
    ]);

  }

};
  return (
    <div className="Sidebar">
      <h2>Filters</h2>

      <ul>
        <li>
  <h3>Sort By</h3>

  <div>
    <input
      type="radio"
      name="sort"
      value="popular"
      checked={sortBy === "popular"}
      onChange={(e) => setSortBy(e.target.value)}
    />
    Popular
  </div>

  <div>
    <input
      type="radio"
      name="sort"
      value="low"
      checked={sortBy === "low"}
      onChange={(e) => setSortBy(e.target.value)}
    />
    Price (Low to High)
  </div>

  <div>
    <input
      type="radio"
      name="sort"
      value="high"
      checked={sortBy === "high"}
      onChange={(e) => setSortBy(e.target.value)}
    />
    Price (High to Low)
  </div>

  <div>
    <input
      type="radio"
      name="sort"
      value="discount"
      checked={sortBy === "discount"}
      onChange={(e) => setSortBy(e.target.value)}
    />
    Discount
  </div>
</li>

        <li>
          <h3>Categories</h3>
          <div>
               <input
                  type="checkbox"
                  checked={selectedCategory.includes("Men")}
                  onChange={() => handleCategoryChange("Men")}
               />  Men
          </div>

          <div>
           <input
              type="checkbox"
              checked={selectedCategory.includes("Women")}
              onChange={() => handleCategoryChange("Women")}
           /> Women
          </div>

            <div>
             <input
                 type="checkbox"
                 checked={selectedCategory.includes("Mobiles")}
                 onChange={() => handleCategoryChange("Mobiles")}
             /> Mobiles
           </div>

            <div>
              <input
                type="checkbox"
                checked={selectedCategory.includes("Electronics")}
                onChange={() => handleCategoryChange("Electronics")}
             /> Electronics
            </div>

            <div>
              <input
                type="checkbox"
               checked={selectedCategory.includes("Accessories")}
                onChange={() => handleCategoryChange("Accessories")}
               /> Accessories
            </div>

            <div>
              <input
                type="checkbox"
                checked={selectedCategory.includes("Beauty")}
                onChange={() => handleCategoryChange("Beauty")}
              /> Beauty
           </div>

            <div>
              <input
              type="checkbox"
              checked={selectedCategory.includes("Groceries")}
               onChange={() => handleCategoryChange("Groceries")}
              /> Groceries
            </div>

             <div>
                <input
                 type="checkbox"
                 checked={selectedCategory.includes("Sports")}
                  onChange={() => handleCategoryChange("Sports")}
               /> Sports
              </div>

        </li>

        <li>
          <h3>Gender</h3>
          <div>
          <input
            type="checkbox"
            checked={selectedGender.includes("Male")}
            onChange={()=>handleGenderChange("Male")}
          />Male
          </div>

          <div>
          <input
            type="checkbox"
            checked={selectedGender.includes("Female")}
            onChange={()=>handleGenderChange("Female")}
          /> Female
            </div>

          <div>
          <input
             type="checkbox"
             checked={selectedGender.includes("Unisex")}
             onChange={()=>handleGenderChange("Unisex")}
         />Unisex
           </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;