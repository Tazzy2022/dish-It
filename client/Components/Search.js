import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCategorySearch from "./FilterCategorySearch";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  getSingleRestaurant,
  renderSingleRestaurant,
} from "../features/singleRestaurantSlice";
import {
  renderAllRestaurants,
  getAllRestaurants,
} from "../features/allRestaurantsSlice";
import SingleRestaurant from "./SingleRestaurant";

const Search = () => {
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector(renderAllRestaurants);
  const restaurant = useSelector(renderSingleRestaurant);
  const dispatch = useDispatch();

  const [search, setSearch] = useState({ restaurant: "", location: "" });

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
  console.log("****", restaurant);
  return (
    <div className="search-container">
      <form id="search-form" onSubmit={getSearch}>
        <label>search by name and / or by restaurant:</label>
        <input
          placeholder="restaurant name"
          value={search.restaurant}
          name="restaurant"
          onChange={handleChange}
        />
        <input
          placeholder="city, state"
          value={search.location}
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
      {restaurant?.length > 0 && (
        <main className="restaurant-list-container">
          <section className="list-card">
            <img
              className="card-img"
              src={restaurant.image_url}
              alt="restaurant image"
            />
            <p>{restaurant.name}</p>
            <p>{restaurant.address1}</p>
            <p>
              {restaurant.location.city},{" "}
              {restaurant.location.state},{" "}
              {restaurant.location.zip_code}
            </p>
            <p>phone: {restaurant.display_phone}</p>
            <p>price: {restaurant.price}</p>
            <Link className="yelp-link" to={restaurant.url}>
              yelp link
            </Link>
            <p>food category:</p>
            {restaurant.categories.map((cat, index) => {
              return <p>{cat[index]}</p>;
            })}
     <p>+ add to list</p>
          </section>
          ;
        </main>
      )}
      {restaurants?.businesses?.length > 0 &&
        restaurants?.businesses?.map((restaurant) => {
          return (
            <SingleRestaurant
              key={restaurant.id}
              restaurant={restaurant}
              auth={auth}
            />
          );
        })}
    </div>
  );
};

export default Search;
