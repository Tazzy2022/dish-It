import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurantsAPI: [],
  error: "",
  token: "",
};

export const getRestaurantsByLocation = createAsyncThunk(
  "restaurantsAPI/getRestaurantsByLocation",
  async ({ token, location }) => {
    try {
      const response = await axios.get(
        `/api/restaurants/location/${location}}`,
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

export const getRestaurantsByNameLocation = createAsyncThunk(
  "restaurantsAPI/getRestaurantsByNameLocation",
  async ({ token, name, location }) => {
    try {
      const response = await axios.get(
        "/api/restaurants/name/location",
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

const restaurantAPISlice = createSlice({
  name: "restaurantsAPI",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsByLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getRestaurantsByLocation.fulfilled, (state, action) => {
      //state.lists = action.payload.lists;
      return action.payload
    });
		builder.addCase(getRestaurantsByNameLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getRestaurantsByNameLocation.fulfilled, (state, action) => {
      //state.lists = action.payload.lists;
      return action.payload
    });
  },
});

export default restaurantAPISlice.reducer;
