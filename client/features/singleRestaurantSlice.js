import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {},
//   error: "",
//   token: "",
};

export const getSingleRestaurant = createAsyncThunk(
  "singleRestaurant/getSingleRestaurant",
  async ({ name, location, token }) => {
    try {
      const nameLocation = name + "-" + location;
      const search = nameLocation.split(" ").join("-");
      const response = await axios.get(`/api/restaurants/${search}`, {
        headers: {
          authorization: token,
        },
      });
      return response?.data;
    } catch (error) {
      return error.message;
    }
  }
);

const singleRestaurantSlice = createSlice({
  name: "singleRestaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleRestaurant.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleRestaurant.fulfilled, (state, action) => {
      return action.payload;
      //state.restaurant = action.payload
    });
  },
});

export const renderSingleRestaurant = (state) => state.restaurant;

export default singleRestaurantSlice.reducer;
