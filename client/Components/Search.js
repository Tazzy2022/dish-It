import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCategorySearch from "./FilterCategorySearch";
import FilterPriceSearch from "./FilterPriceSearch";
import {
  renderAllRestaurants,
  getAllRestaurants,
} from "../features/allRestaurantsSlice";
import {
  getSingleRestaurant,
  renderSingleRestaurant,
} from "../features/singleRestaurantSlice";
import SingleRestaurant from "./SingleRestaurant";
import AllRestaurants from "./AllRestaurants";

const Search = () => {
  const auth = useSelector((state) => state.auth);
  // const restaurants = useSelector(renderAllRestaurants);
  // const restaurant = useSelector(renderSingleRestaurant);
  const dispatch = useDispatch();

  const [search, setSearch] = useState({ restaurant: "", location: "" });
  //const [restaurant, setSingleRestaurant] = useState([]);
  const [restaurants, setAllRestaurants] = useState([]);

  const getSearch = async (event) => {
    event.preventDefault();
    try {
      if (search.restaurant.length === 0) {
        const allRest = await dispatch(
          getAllRestaurants({
            token: auth.token,
            location: search.location,
          })
        );
        //console.log("allRest", allRest.payload.businesses);
        setAllRestaurants(allRest);
      } else {
        const singleRest = await dispatch(
          getSingleRestaurant({
            token: auth.token,
            name: search.restaurant,
            location: search.location,
          })
        );
        //console.log("singleRest", singleRest.payload);
        setAllRestaurants(singleRest);
        //setSingleRestaurant(singleRest);
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
      {restaurants?.payload?.businesses?.length > 0 ? (
        restaurants?.payload?.businesses?.map((restaurant) => {
          return (
            <AllRestaurants
              key={restaurant.id}
              restaurant={restaurant}
              auth={auth}
            />
          );
        })
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Search;

// <main className="restaurant-list-container">
//   <section className="list-card">
//     <img
//       className="card-img"
//       src={restaurant.image_url}
//       alt="restaurant image"
//     />
//     <p>{restaurant.name}</p>
//     <p>{restaurant.address1}</p>
//     <p>
//       {restaurant.location.city}, {restaurant.location.state},{" "}
//       {restaurant.location.zip_code}
//     </p>
//     <p>phone: {restaurant.display_phone}</p>
//     <p>price: {restaurant.price}</p>
//     <Link className="yelp-link" to={restaurant.url}>
//       yelp link
//     </Link>
//     <p>food category:</p>
//     {restaurant.categories.map((cat, index) => {
//       return <p>{cat[index]}</p>;
//     })}
//     <p>+ add to list</p>
//   </section>
//   ;
// </main>
// )}
