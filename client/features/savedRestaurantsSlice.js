import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  savedRestaurants: [],
  error: "",
};

export const getSavedRestaurants = createAsyncThunk(
  "savedRestaurants/getSavedRestaurants",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`/api/user/list/${id}`, {
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

const savedRestaurantsSlice = createSlice({
  name: "savedRestaurants",
  initialState,
  reducers: {
    loggoutSavedRestos: (state) => {
      state.savedRestaurants = [];
      state.error = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSavedRestaurants.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSavedRestaurants.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { loggoutSavedRestos } = savedRestaurantsSlice.actions;

export default savedRestaurantsSlice.reducer;
