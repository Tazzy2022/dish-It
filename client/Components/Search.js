import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  renderAllRestaurants,
  getSingleRestaurant,
  getAllRestaurants,
  filterSearch,
} from "../features/allRestaurantsSlice";
import AllRestaurants from "./AllRestaurants";
import FilterCategorySearch from "./FilterCategorySearch";
import { setRestaurant, setLocation, resetAll } from "../features/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchInfo = useSelector((state) => state.search);
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);

  const [search, setSearch] = useState({
    restaurant: searchInfo.restaurant || "",
    location: searchInfo.location,
  });

  const [modalOpen, setModalOpen] = useState(false);
  let isLoading;

  useEffect(() => {
    try {
      isLoading = true;
      dispatch(
        filterSearch({
          token: auth.token,
          restaurant: searchInfo.restaurant || "",
          location: searchInfo.location,
          categories: searchInfo.categories || [],
          price: searchInfo.price || [],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }, []);

  if (isLoading) {
    console.log("IS LOADING!!!!");
    return <div className="loading-p">Loading...</div>;
  }

  const getSearch = async (event) => {
    event.preventDefault();
    try {
      if (search.restaurant.length === 0) {
        dispatch(resetAll(true));
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

  const resetFilters = async () => {
    setSearch({
      restaurant: "",
      location: auth.user.city,
    });
    dispatch(resetAll(true));
    await dispatch(
      getAllRestaurants({
        token: auth.token,
        location: auth.user.city,
      })
    );
  };

  let searchCategories;
  let priceArray = [];
  let priceFilters;

  if (searchInfo.categories.length > 1) {
    searchCategories = searchInfo.categories.join(", ");
  } else if (searchInfo.categories.length > 0) {
    searchCategories = searchInfo.categories.join(" ");
  }

  if (searchInfo.price.length > 0) {
    searchInfo.price.forEach((p) => {
      let newP = "";
      let numP = p * 1;
      for (let i = 0; i < numP; i++) {
        newP += "$";
      }
      priceArray.push(newP);
    });
    priceFilters = priceArray.join(", ").toString();
  }

  return (
    <div className="search-container">
      <section id="form-section">
        <form id="search-form" onSubmit={getSearch}>
          <div className="search-label-input">
            <label>search by restaurant name (optional)</label>
            <input
              id="resto-input"
              placeholder="restaurant name"
              value={search.restaurant}
              name="restaurant"
              onChange={handleChange}
            />
          </div>
          <div className="search-label-input">
            <label>and / or by location:</label>
            <input
              id="location-input"
              placeholder={search.location || auth.user.city}
              value={search.location}
              name="location"
              onChange={handleChange}
            />
          </div>
          <div className="search-buttons">
            <button type="submit" className="search">
              search
            </button>
            <button className="openModalBtn" onClick={() => setModalOpen(true)}>
              Add filters
            </button>
          </div>
        </form>
      </section>
      <section id="search-filter-containers">
        {modalOpen && <FilterCategorySearch openModal={setModalOpen} />}
      </section>
      {searchInfo.categories.length > 0 && searchInfo.price.length > 0 && (
        <section id="searched-filters">
          <p>
            Current filters: {searchCategories}, {priceFilters} in{" "}
            {searchInfo.location}{" "}
          </p>
          <button onClick={resetFilters}>clear all</button>
        </section>
      )}
      {searchInfo.categories.length > 0 && !searchInfo.price.length > 0 && (
        <section id="searched-filters">
          <p>
            Current filters: {searchCategories} in {searchInfo.location}{" "}
          </p>
          <button onClick={resetFilters}>clear all</button>
        </section>
      )}
      {searchInfo.price.length > 0 && !searchInfo.categories.length > 0 && (
        <section id="searched-filters">
          <p>
            Current filters: {priceFilters} in {searchInfo.location}{" "}
          </p>
          <button onClick={resetFilters}>clear all</button>
        </section>
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
      ) : restaurants?.id ? (
        restaurants?.id && (
          <AllRestaurants
            key={restaurants.id}
            restaurant={restaurants}
            auth={auth}
          />
        )
      ) : (
        <p>no restaurants matched that search</p>
      )}
    </div>
  );
};

export default Search;
