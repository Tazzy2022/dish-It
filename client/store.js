import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import listReducer from "./features/listSlice";
import restaurantAPIReducer from "./features/restaurantAPISlice";
import singleListReducer from "./features/singleListSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    list: singleListReducer,
    restaurantsAPI: restaurantAPIReducer,
  },
  middleware: [logger, thunk],
});

export default store;
