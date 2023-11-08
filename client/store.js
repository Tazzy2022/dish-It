import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import listReducer from "./features/listSlice";
import singleRestaurantReducer from "./features/singleRestaurantSlice";
import singleListReducer from "./features/singleListSlice";
import allRestaurantsReducer from "./features/allRestaurantsSlice";
import searchReducer from "./features/searchSlice";
import FriendsReducer from "./features/FriendsSlice";
import singleFriendReducer from "./features/singleFriendSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    list: singleListReducer,
    search: searchReducer,
    friends: FriendsReducer,
    singleFriend: singleFriendReducer,
    // restaurant: singleRestaurantReducer,
    restaurants: allRestaurantsReducer,
  },
  middleware: [thunk, logger],
});

export default store;
