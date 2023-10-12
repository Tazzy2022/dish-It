import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCategorySearch from "./FilterCategorySearch";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  getRestaurantsByLocation,
  getRestaurantsByNameLocation,
} from "../features/restaurantAPISlice";

const Search = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [search, setSearch] = useState({ restaurant: "", location: "" });

  const getSearch = async (event) => {
    event.preventDefault();
    try {
      if (event.target.value === "restaurant") {
        //just dispatch location search
        dispatch(
          getRestaurantsByLocation({
            token: auth.token,
            search,
          })
        );
        setSearch({ restaurant: "", location: "" });
      }
      //otherwise search resto name and location
      dispatch(
        getRestaurantsByNameLocation({
          token: auth.token,
          search,
        })
      );
      setSearch({ restaurant: "", location: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSearch((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="search-container">
      <form id="search-form" onSubmit={getSearch}>
        <label>search by name and / or by restaurant:</label>
        <input
          placeholder="restaurant name"
          value={restaurant}
          name="resturant"
          onChange={handleChange}
        />
        <input
          placeholder="city, state"
          value={location}
          name="location"
          onChange={handleChange}
        />
        <button className="button">search</button>
      </form>
      <section className="price-search-container">
        <FilterPriceSearch />
      </section>
      <section className="category-search-container">
        <FilterCategorySearch />
      </section>
      <p>map through cards</p>
    </div>
  );
};

export default Search;
