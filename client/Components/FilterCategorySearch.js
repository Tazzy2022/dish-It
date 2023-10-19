import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, searchState } from "../features/searchSlice";

const categories = [
  "African",
  "American (New)",
  "American (Traditional)",
  "Asian Fusion",
  "Bagels",
  "Bakeries",
  "Barbeque",
  "Brazilian",
  "Breakfast & Brunch",
  "Buffets",
  "Bubble Tea",
  "Burgers",
  "Burmese",
  "Cafes",
  "Cajun/Creole",
  "Caribbean",
  "Chicken Wings",
  "Chinese",
  "Coffee & Tea",
  "Colombian",
  "Comfort Food",
  "Creperies",
  "Cuban",
  "Delis",
  "Desserts",
  "Diners",
  "Dim Sum",
  "Dominican",
  "Fast Food",
  "Fish & Chips",
  "French",
  "Falafel",
  "Gastropubs",
  "Gluten-Free",
  "Greek",
  "Halal",
  "Himalayan / Nepalese",
  "Ice Cream & Frozen Yogurt",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Juice Bars & Smoothies",
  "Korean",
  "Kosher",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Pizza",
  "Ramen",
  "	Salad",
  "Sandwiches",
  "Seafood",
  "Soul Food",
  "Spanish",
  "Steakhouses",
  "Sushi Bars",
  "Tacos",
  "Tex-Mex",
  "Thai",
  "Vegan",
  "Vegetarian",
  "Vietnamese",
];

const FilterCategorySearch = ({ openModal }) => {
  const auth = useSelector((state) => state.auth);
  const searchInfo = useSelector(searchState);

  return (
    <div className="modalBackground">
      <div className="catContainer">
        <div className="cat-title">
          <div className="cat-header">
            <div>
              <h1>Categories:</h1>
            </div>
            <div className="cat-buttons">
              <button onClick={() => openModal(false)}>cancel</button>
              <button>update search</button>
            </div>
          </div>
        </div>
        <main className="cat-body">
          {categories.map((category, index) => {
            return (
              <div key={index} className="each-checkbox">
                <input
                  type="checkbox"
                  name={category}
                  value={category}
                  className="filter-category-checkbox"
                  // onChange={handleChange}
                />
                <label>{category}</label>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default FilterCategorySearch;
