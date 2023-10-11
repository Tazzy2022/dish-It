import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import listReducer from "./features/listSlice";
// import savedRestaurantsReducer from "./features/savedRestaurantsSlice";
import singleListReducer from "./features/singleListSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    list: singleListReducer,
    // savedRestaurants: savedRestaurantsReducer,
  },
  middleware: [logger, thunk],
});

export default store;
