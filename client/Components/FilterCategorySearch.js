import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

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
  "Himalayan/Nepalese",
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

const FilterCategorySearch = () => {
  const auth = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterCategorySearch = () => {
    console.log("hi");
  };
  return (
    <form id="category-form" onSubmit={filterCategorySearch}>
      <p>Filter by category</p>
      <section>
        {/* <input type="checkbox" className="filter-category-checkbox" />
      <label>meat</label> */}
      </section>
      <button>+ show all</button>
    </form>
  );
};

export default FilterCategorySearch;
