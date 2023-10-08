import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
   reducer: {
    auth: authReducer,
 },
  middleware: [logger, thunk],
});

export default store;
