import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, searchState, setPrice } from "../features/searchSlice";
import {
  getRestaurantLocationCat,
  getRestLocationPriceCat,
} from "../features/allRestaurantsSlice";

// const categories = [
//   "African",
//   "American (New)",
//   "American (Traditional)",
//   "Asian Fusion",
//   "Bagels",
//   "Bakeries",
//   "Barbeque",
//   "Brazilian",
//   "Breakfast & Brunch",
//   "Buffets",
//   "Bubble Tea",
//   "Burgers",
//   "Burmese",
//   "Cafes",
//   "Cajun/Creole",
//   "Caribbean",
//   "Chicken Wings",
//   "Chinese",
//   "Coffee & Tea",
//   "Colombian",
//   "Comfort Food",
//   "Creperies",
//   "Cuban",
//   "Delis",
//   "Desserts",
//   "Diners",
//   "Dim Sum",
//   "Dominican",
//   "Fast Food",
//   "Fish & Chips",
//   "French",
//   "Falafel",
//   "Gastropubs",
//   "Gluten-Free",
//   "Greek",
//   "Halal",
//   "Himalayan/Nepalese",
//   "Ice Cream & Frozen Yogurt",
//   "Indian",
//   "Irish",
//   "Italian",
//   "Japanese",
//   "Juice Bars & Smoothies",
//   "Korean",
//   "Kosher",
//   "Latin American",
//   "Mediterranean",
//   "Mexican",
//   "Middle Eastern",
//   "Pizza",
//   "Ramen",
//   "Salad",
//   "Sandwiches",
//   "Seafood",
//   "Soul Food",
//   "Spanish",
//   "Steakhouses",
//   "Sushi Bars",
//   "Tacos",
//   "Tex-Mex",
//   "Thai",
//   "Vegan",
//   "Vegetarian",
//   "Vietnamese",
// ];

const categories = [
  "african",
  "american (new)",
  "american (traditional)",
  "asian fusion",
  "bagels",
  "bakeries",
  "barbeque",
  "brazilian",
  "breakfast & brunch",
  "buffets",
  "bubble tea",
  "burgers",
  "burmese",
  "cafes",
  "cajun/creole",
  "caribbean",
  "chicken wings",
  "chinese",
  "coffee & tea",
  "colombian",
  "comfort food",
  "creperies",
  "cuban",
  "delis",
  "desserts",
  "diners",
  "dim sum",
  "dominican",
  "fast food",
  "fish & chips",
  "french",
  "falafel",
  "gastropubs",
  "gluten-free",
  "greek",
  "halal",
  "himalayan/nepalese",
  "ice cream & frozen yogurt",
  "indian",
  "irish",
  "italian",
  "japanese",
  "juice bars & smoothies",
  "korean",
  "kosher",
  "latin american",
  "mediterranean",
  "mexican",
  "middle eastern",
  "pizza",
  "ramen",
  "salad",
  "sandwiches",
  "seafood",
  "soul food",
  "spanish",
  "steakhouses",
  "sushi bars",
  "tacos",
  "tex-mex",
  "thai",
  "vegan",
  "vegetarian",
  "vietnamese",
];

const FilterCategorySearch = ({ openModal }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const searchInfo = useSelector(searchState);

  const [category, updateCategory] = useState([]);
  const [pricing, updatePricing] = useState([]);

  const handlePriceChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      updatePricing([...pricing, value]);
    } else {
      updatePricing(pricing.filter((e) => e !== value));
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      updateCategory([...category, value]);
    } else {
      updateCategory(category.filter((e) => e !== value));
    }
  };

  const refactorCategories = (categories) => {
    let newCategory = [];
    categories.forEach((cat) => {
      if (cat.includes("&")) {
        newCategory.push(cat.replace(" & ", "_"));
      } else if (cat.includes(" ")) {
        newCategory.push(cat.replace(/\s/g, ""));
      } else {
        newCategory.push(cat);
      }
    });
    return newCategory;
  };

  const getCategorySearch = async (e) => {
    e.preventDefault();
    openModal(false);
    let updatedCat = refactorCategories(category);
    try {
      if (pricing.length === 0) {
        await dispatch(
          getRestaurantLocationCat({
            token: auth.token,
            location: searchInfo.location,
            categories: updatedCat,
          })
        );
      } else {
        await dispatch(
          getRestLocationPriceCat({
            token: auth.token,
            location: searchInfo.location,
            categories: updatedCat,
            price: pricing,
          })
        );
      }
      dispatch(setCategories(updatedCat));
      dispatch(setPrice(pricing));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modalBackground">
      <form onSubmit={getCategorySearch} className="catContainer">
        <div className="cat-buttons">
          <button type="submit">update</button>
          <button onClick={() => openModal(false)}>X</button>
        </div>
        <section id="price-filter">
          <h2>price:</h2>
          {["$", "$$", "$$$", "$$$$"].map((price, index) => {
            return (
              <div key={index} className="checkbox-container">
                <input
                  type="checkbox"
                  name={price}
                  value={price.length}
                  className="filter-price-checkbox"
                  onChange={handlePriceChange}
                />
                <label>{price}</label>
              </div>
            );
          })}
        </section>
        <div></div>
        <main className="cat-body">
          {categories.map((category, index) => {
            return (
              <div key={index} className="each-checkbox">
                <input
                  type="checkbox"
                  name={category}
                  value={category}
                  className="filter-category-checkbox"
                  onChange={handleChange}
                />
                <label>{category}</label>
              </div>
            );
          })}
        </main>
      </form>
    </div>
  );
};

export default FilterCategorySearch;
