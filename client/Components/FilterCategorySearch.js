import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, searchState, setPrice } from "../features/searchSlice";
import {
  getRestaurantLocationCat,
  getRestLocationPriceCat,
} from "../features/allRestaurantsSlice";

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
  "cajun & creole",
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
  "himalayan & nepalese",
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

  const getCategorySearch = async (e) => {
    e.preventDefault();
    openModal(false);
    try {
      if (pricing.length === 0) {
        await dispatch(
          getRestaurantLocationCat({
            token: auth.token,
            location: searchInfo.location,
            categories: category,
          })
        );
      } else {
        await dispatch(
          getRestLocationPriceCat({
            token: auth.token,
            location: searchInfo.location,
            categories: category,
            price: pricing,
          })
        );
      }
      dispatch(setCategories(category));
      dispatch(setPrice(pricing));
      //dispatch(filterSearch())
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
        <div className="cat-body">
          {categories.map((category, index) => {
            return (
              <section key={index} className="each-checkbox">
                <input
                  type="checkbox"
                  name={category}
                  value={category}
                  onChange={handleChange}
                />
                <label>{category}</label>
              </section>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default FilterCategorySearch;
