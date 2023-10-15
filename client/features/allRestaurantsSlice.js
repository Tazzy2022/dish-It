import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
//   error: "",
//   token: "",
};

export const getAllRestaurants = createAsyncThunk(
  "allRestaurants/getAllRestaurants",
  async ({ token, location }) => {
    try {
      const response = await axios.get(
        `/api/restaurants/location/${location}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response?.data;
    } catch (error) {
      return error.message;
    }
  }
);

const allRestaurantsSlice = createSlice({
  name: "allRestaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRestaurants.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
      return action.payload;
      //state.restaurants = action.payload;
    });
  },
});

export const renderAllRestaurants = (state) => state.restaurants;

export default allRestaurantsSlice.reducer;
