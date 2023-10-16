import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCategorySearch from "./FilterCategorySearch";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  renderAllRestaurants,
  getAllRestaurants,
} from "../features/allRestaurantsSlice";
import AllRestaurants from "./AllRestaurants";

const Search = () => {
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);
  const dispatch = useDispatch();

  const [search, setSearch] = useState({ restaurant: "", location: "" });
  // const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    const setRestaurants = async () => {
      try {
        await dispatch(
          getAllRestaurants({
            token: auth.token,
            location: auth.user.city,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    setRestaurants();
  }, []);

  const getSearch = async (event) => {
    event.preventDefault();
    try {
      if (search.restaurant.length === 0) {
        await dispatch(
          getAllRestaurants({
            token: auth.token,
            location: search.location,
          })
        );
      } else {
        await dispatch(
          getSingleRestaurant({
            token: auth.token,
            name: search.restaurant,
            location: search.location,
          })
        );
      }
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
      <section id="form-section">
        <form id="search-form" onSubmit={getSearch}>
          <div className="search-label-input">
            <label>search by name (optional)</label>
            <input
              placeholder="restaurant name"
              value={search.restaurant}
              name="restaurant"
              onChange={handleChange}
            />
          </div>
          <div className="search-label-input">
            <label>and / or by location:</label>
            <input
              placeholder="city, state"
              value={search.location}
              name="location"
              onChange={handleChange}
            />
          </div>
          <button className="button">search</button>
        </form>
      </section>
      <section id="search-filter-containers">
        <FilterPriceSearch className="price-search-container" />
        <div></div>
        <FilterCategorySearch className="category-search-container" />
      </section>
      {restaurants?.businesses?.length > 0 ? (
        restaurants?.businesses?.map((restaurant) => {
          return (
            <AllRestaurants
              key={restaurant.id}
              restaurant={restaurant}
              auth={auth}
            />
          );
        })
      ) : (
        <p>no restaurants matched your search criteria</p>
      )}
    </div>
  );
};

export default Search;
