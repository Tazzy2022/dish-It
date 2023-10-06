import { configureStore } from "@reduxjs/toolkit";
//import userReducer from "./features/userSlice";
//import registerReducer from "./features/register";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    // auth: userReducer,
    // register: registerReducer,
  },
  middleware: [logger, thunk],
});

export default store;
