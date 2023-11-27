import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

export const getAllRestaurants = createAsyncThunk(
  "allRestaurants/getAllRestaurants",
  async ({ token, location }) => {
    try {
      const response = await axios.get(`/api/restaurants/city/${location}`, {
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

export const getRestaurantsLocationPrice = createAsyncThunk(
  "allRestaurants/getRestaurantsLocationPrice",
  async ({ token, location, price }) => {
    try {
      const pricing = "&price=" + price.join("&price=");
      const response = await axios.get(
        `/api/restaurants/price/${pricing}/${location}`,
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

export const getRestaurantLocationCat = createAsyncThunk(
  "allRestaurants/getRestaurantLocationCat",
  async ({ token, location, categories }) => {
    const category = "&categories=" + categories.join("&categories=");
    try {
      const response = await axios.get(
        `/api/restaurants/catPrice/${category}/${location}`,
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

export const getRestLocationPriceCat = createAsyncThunk(
  "allRestaurants/getRestLocationPriceCat",
  async ({ token, location, price, categories }) => {
    try {
      const pricing = "&price=" + price.join("&price=");
      const allCategories = "&categories=" + categories.join("&categories=");
      const response = await axios.get(
        `/api/restaurants/allFilters/${location}/${allCategories}/${pricing}`,
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
    });
    builder.addCase(getSingleRestaurant.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleRestaurant.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getRestaurantsLocationPrice.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getRestaurantsLocationPrice.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getRestLocationPriceCat.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getRestLocationPriceCat.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getRestaurantLocationCat.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getRestaurantLocationCat.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const renderAllRestaurants = (state) => state.restaurants;

export default allRestaurantsSlice.reducer;
