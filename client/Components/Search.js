import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const searchInfo = useSelector((state) => state.search);
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);

  const [search, setSearch] = useState({
    restaurant: "",
    location: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   if (search.location.length === 0) {
  //     const setRestaurants = async () => {
  //       try {
  //         await dispatch(
  //           getAllRestaurants({
  //             token: auth.token,
  //             location: auth.user.city,
  //           })
  //         );
  //         console.log("searchInfo in use effect", searchInfo);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     setRestaurants();
  //     dispatch(setLocation(auth.user.city));
  //   }
  // }, []);

  useEffect(() => {
    console.log("searchInfo in useEffect", searchInfo);
    try {
      dispatch(
        getAllRestaurants({
          token: auth.token,
          location: searchInfo.location,
        })
      );
    } catch (error) {
      console.log(error);
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

  const resetFilters = async () => {
    setSearch({
      restaurant: "",
      location: "",
    });
    dispatch(resetAll(true));
    await dispatch(
      getAllRestaurants({
        token: auth.token,
        location: auth.user.city,
      })
    );
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
          <button type="submit" className="button search">
            search
          </button>
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            Add filters
          </button>
        </form>
      </section>
      <section id="search-filter-containers">
        {modalOpen && <FilterCategorySearch openModal={setModalOpen} />}
      </section>
      {searchInfo.categories.length > 0 || searchInfo.price.length > 0 ? (
        <section id="searched-filters">
          <p>current filters: </p>
          {searchInfo.categories &&
            searchInfo.categories.map((category, index) => {
              return <p key={index}> {category}, </p>;
            })}
          <p> location: {searchInfo.location}</p>
          {searchInfo.price &&
            searchInfo.price.map((price, index) => {
              return <p key={index}> {price}, </p>;
            })}
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
