import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  renderAllRestaurants,
  getSingleRestaurant,
  getAllRestaurants,
} from "../features/allRestaurantsSlice";
import AllRestaurants from "./AllRestaurants";
import FilterCategorySearch from "./FilterCategorySearch";
import {
  setRestaurant,
  setLocation,
  searchState,
  resetAll,
} from "../features/searchSlice";

const Search = () => {
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);
  const dispatch = useDispatch();
  const searchInfo = useSelector(searchState);

  const [search, setSearch] = useState({ restaurant: "", location: "" });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (search.location.length === 0) {
      const setRestaurants = async () => {
        try {
          await dispatch(
            getAllRestaurants({
              token: auth.token,
              location: auth.user.city,
            })
          );
          dispatch(setLocation(auth.user.city));
        } catch (error) {
          console.log(error);
        }
      };
      setRestaurants();
    }
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
        dispatch(setRestaurant(search.restaurant));
      }
      dispatch(setLocation(search.location));
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

  const resetFilters = () => {
    dispatch(resetAll(true));
    // e.target.reset();
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
              placeholder={search.location || auth.user.city}
              value={search.location}
              name="location"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button">
            search
          </button>
        </form>
      </section>
      <section id="search-filter-containers">
        <FilterPriceSearch />
        <div></div>
        <p>Filter by category</p>
        <button className="openModalBtn" onClick={() => setModalOpen(true)}>
          show all
        </button>
        {modalOpen && <FilterCategorySearch openModal={setModalOpen} />}
      </section>
      {searchInfo.categories.length > 0 || searchInfo.price.length > 0 ? (
        <section id="searched-filters">
          <p>current filters: </p>
          <p> filter container here</p>
          <button onClick={resetFilters}>clear all</button>
        </section>
      ) : (
        <p></p>
      )}
      {restaurants?.businesses?.length > 1 ? (
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
        <p>no restaurants matched that search</p>
      )}
      {/* { restaurants ? (
            <AllRestaurants
              key={restaurant.id}
              restaurant={restaurants}
              auth={auth}
            />
          ) : (
            <p>no restaurants matched that search</p>
          )} */}
    </div>
  );
};

export default Search;
