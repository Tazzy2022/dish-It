import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurant: "",
  location: "",
  price: [],
  categories: [],
  resetAll: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setRestaurant: (state, input) => {
      state.restaurant = input.payload;
    },
    setLocation: (state, input) => {
      state.location = input.payload;
    },
    setPrice: (state, input) => {
      state.price = input.payload;
    },
    setCategories: (state, input) => {
      state.categories = input.payload;
    },
    resetAll: (state, bool) => {
      state.resetAll = bool.payload;
      if (bool.payload === true) {
        (state.categories = []),
          (state.restaurant = ""),
          (state.price = []);
      }
      state.resetAll = false;
    },
  },
});

export const { setRestaurant, setLocation, setPrice, setCategories, resetAll } =
  searchSlice.actions;

export const searchState = (state) => state.search;

export default searchSlice.reducer;
