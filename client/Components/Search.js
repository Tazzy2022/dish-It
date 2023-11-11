import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  renderAllRestaurants,
  getSingleRestaurant,
  getAllRestaurants,
  getRestaurantsLocationPrice,
  getRestLocationPriceCat,
} from "../features/allRestaurantsSlice";
import AllRestaurants from "./AllRestaurants";
import FilterCategorySearch from "./FilterCategorySearch";
import {
  setPrice,
  setRestaurant,
  setLocation,
  searchState,
  resetAll,
} from "../features/searchSlice";

const Search = () => {
  const dispatch = useDispatch();

  const searchInfo = useSelector(searchState);
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);

  const [search, setSearch] = useState({
    restaurant: "",
    location: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [pricing, updatePricing] = useState([]);
  const [searchPrice, setSearchPrice] = useState([]);

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

  const resetFilters = async () => {
    setSearch({
      restaurant: "",
      location: "",
    });
    updatePricing([]);
    dispatch(resetAll(true));
    await dispatch(
      getAllRestaurants({
        token: auth.token,
        location: auth.user.city,
      })
    );
  };

  const getPriceSearch = async () => {
    try {
      if (searchInfo.categories.length === 0) {
        await dispatch(
          getRestaurantsLocationPrice({
            token: auth.token,
            location: searchInfo.location,
            price: pricing,
          })
        );
      } else {
        await dispatch(
          getRestLocationPriceCat({
            token: auth.token,
            location: searchInfo.location,
            categories: searchInfo.categories,
            price: pricing,
          })
        );
      }
      dispatch(setPrice(pricing));
    } catch (error) {
      console.log(error);
    }
    // e.target.reset();
  };

  const handlePriceChange = (e) => {
    const { value, checked, name } = e.target;

    if (checked) {
      updatePricing([...pricing, value]);
      setSearchPrice([...searchPrice, name]);
    } else {
      updatePricing(pricing.filter((ele) => ele !== value));
      setSearchPrice(searchPrice.filter((ele) => ele !== name));
    }
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
        <main id="price-form">
          <p>Filter by price:</p>
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
          <button onClick={() => getPriceSearch()}>update</button>
        </main>
        <div></div>
        <div id="category-form">
          <p>Filter by category</p>
          <button className="openModalBtn" onClick={() => setModalOpen(true)}>
            show all
          </button>
        </div>
        {modalOpen && <FilterCategorySearch openModal={setModalOpen} />}
      </section>
      {searchInfo.categories.length > 0 || searchInfo.price.length > 0 ? (
        <section id="searched-filters">
          <p>current filters: </p>
          {searchInfo.categories &&
            searchInfo.categories.map((category, index) => {
              return <p key={index}>{category}, </p>;
            })}
          <p>location: {searchInfo.location}</p>
          {searchInfo.price &&
            searchPrice.map((price, index) => {
              return <span key={index}>{price}, </span>;
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
