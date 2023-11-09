import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import listReducer from "./features/listSlice";
import singleListReducer from "./features/singleListSlice";
import allRestaurantsReducer from "./features/allRestaurantsSlice";
import searchReducer from "./features/searchSlice";
import FriendsReducer from "./features/FriendsSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    list: singleListReducer,
    search: searchReducer,
    friends: FriendsReducer,
    restaurants: allRestaurantsReducer,
  },
  middleware: [thunk, logger],
});

export default store;
