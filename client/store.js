import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import listReducer from "./features/listSlice";
import singleRestaurantReducer from "./features/singleRestaurantSlice";
import singleListReducer from "./features/singleListSlice";
import allRestaurantsReducer from "./features/allRestaurantsSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    list: singleListReducer,
    // restaurant: singleRestaurantReducer,
    // restaurants: allRestaurantsReducer,
  },
  middleware: [logger, thunk],
});

export default store;
