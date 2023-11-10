// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getRestaurantsLocationPrice,
//   getRestLocationPriceCat,
// } from "../features/allRestaurantsSlice";
// import { resetAll, setPrice, searchState } from "../features/searchSlice";

// const FilterPriceSearch = () => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const searchInfo = useSelector(searchState);

//   const [pricing, updatePricing] = useState([]);

//   const getPriceSearch = async (e) => {
//     e.preventDefault();
//     try {
//       if (searchInfo.categories.length === 0) {
//         await dispatch(
//           getRestaurantsLocationPrice({
//             token: auth.token,
//             location: searchInfo.location,
//             price: pricing,
//           })
//         );
//       } else {
//         await dispatch(
//           getRestLocationPriceCat({
//             token: auth.token,
//             location: searchInfo.location,
//             categories: searchInfo.categories,
//             price: pricing,
//           })
//         );
//       }
//       dispatch(setPrice(pricing));
//     } catch (error) {
//       console.log(error);
//     }
//     // e.target.reset();
//   };

//   const handlePriceChange = (e) => {
//     const { value, checked } = e.target;

//     if (checked) {
//       updatePricing([...pricing, value]);
//     } else {
//       updatePricing(pricing.filter((e) => e !== value));
//     }
//   };

//   return (
//     <main id="price-form">
//       <p>Filter by price:</p>
//       {["$", "$$", "$$$"].map((price, index) => {
//         return (
//           <div key={index} className="checkbox-container">
//             <input
//               type="checkbox"
//               name="price"
//               value={price.length}
//               className="filter-price-checkbox"
//               onChange={handlePriceChange}
//             />
//             <label>{price}</label>
//           </div>
//         );
//       })}
//       <button  onClick={() => getPriceSearch()}>update</button>
//     </main>
//   );
// };

// export default FilterPriceSearch;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRestaurantsLocationPrice } from "../features/allRestaurantsSlice";

// const FilterPriceSearch = (props) => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   const [price, setPrice] = useState([]);

//   const getPriceSearch = async (e) => {
//     e.preventDefault();
//     // console.log("LOCATION", props.location);
//     // console.log("price", price);
//     try {
//       await dispatch(
//         getRestaurantsLocationPrice({
//           token: auth.token,
//           location: props.location,
//           price: price,
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//     e.target.reset();
//   };

//   const handleChange = (e) => {
//     const { value, checked } = e.target;

//     if (checked) {
//       setPrice([...price, value]);
//     } else {
//       setPrice(price.filter((e) => e !== value));
//     }
//   };

//   return (
//     <form id="price-form" onSubmit={getPriceSearch}>
//       <p>Filter by price:</p>
//       {["$", "$$", "$$$"].map((price, index) => {
//         return (
//           <div key={index} className="checkbox-container">
//             <input
//               type="checkbox"
//               name="price"
//               value={price.length}
//               className="filter-price-checkbox"
//               onChange={handleChange}
//             />
//             <label>{price}</label>
//           </div>
//         );
//       })}
//       <button>update</button>
//     </form>
//   );
// };

// export default FilterPriceSearch;
