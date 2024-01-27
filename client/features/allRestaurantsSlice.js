import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

const refactorCategories = (categories) => {
  if (categories.length > 0) {
    return categories
      .join(",")
      .replaceAll("&", "%26")
      .replaceAll(" ", "%20")
      .replaceAll(",", "%2C");
  }
};

export const filterSearch = createAsyncThunk(
  "allRestaurants/filterSearch",
  async (searchObj) => {
    const loc = searchObj.location
      .replaceAll(",", "%2C")
      .replaceAll(" ", "%20");
    const categories = searchObj.categories;
    const category = refactorCategories(searchObj.categories);
    try {
      if (searchObj.restaurant.length > 0) {
        const response = await axios.get(
          `/api/restaurants/singleResto/${loc}/${searchObj.restaurant}`,
          {
            headers: {
              authorization: searchObj.token,
            },
          }
        );
        return response?.data;
      } else if (
        searchObj.price.length === 0 &&
        searchObj.categories.length === 0
      ) {
        const response = await axios.get(`/api/restaurants/city/${loc}`, {
          headers: {
            authorization: searchObj.token,
          },
        });
        return response?.data;
      } else if (
        searchObj.price.length > 0 &&
        searchObj.categories.length > 0
      ) {
        const pricing = "&price=" + searchObj.price.join("&price=");
        const response = await axios.get(
          `/api/restaurants/allFilters/${loc}/${category}/${pricing}`,
          {
            headers: {
              authorization: searchObj.token,
            },
          }
        );
        return response?.data;
      } else if (
        searchObj.price.length > 0 &&
        searchObj.categories.length === 0
      ) {
        const pricing = "&price=" + searchObj.price.join("&price=");
        const response = await axios.get(
          `/api/restaurants/price/${pricing}/${loc}`,
          {
            headers: {
              authorization: searchObj.token,
            },
          }
        );
        return response?.data;
      } else if (
        searchObj.price.length === 0 &&
        searchObj.categories.length > 0
      ) {
        const location = searchObj.location;
        const response = await axios.get(
          `/api/restaurants/category/${categories}/${location}`,
          {
            headers: {
              authorization: searchObj.token,
            },
          }
        );
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllRestaurants = createAsyncThunk(
  "allRestaurants/getAllRestaurants",
  async ({ token, location }) => {
    try {
      const loc = location.replaceAll(",", "%2C").replaceAll(" ", "%20");
      const response = await axios.get(`/api/restaurants/city/${loc}`, {
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

export const getSingleRestaurant = createAsyncThunk(
  "singleRestaurant/getSingleRestaurant",
  async ({ name, location, token }) => {
    try {
      const loc = location.replaceAll(",", "%2C").replaceAll(" ", "%20");
      const response = await axios.get(
        `/api/restaurants/singleResto/${loc}/${name}`,
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
  reducers: {
    clearRestos: (state) => {
      return initialState;
    },
  },
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
    // builder.addCase(getRestaurantsLocationPrice.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
    // builder.addCase(getRestaurantsLocationPrice.fulfilled, (state, action) => {
    //   return action.payload;
    // });
    // builder.addCase(getRestLocationPriceCat.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
    // builder.addCase(getRestLocationPriceCat.fulfilled, (state, action) => {
    //   return action.payload;
    // });
    // builder.addCase(getRestaurantLocationCat.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
    // builder.addCase(getRestaurantLocationCat.fulfilled, (state, action) => {
    //   return action.payload;
    // });
    builder.addCase(filterSearch.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(filterSearch.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { clearRestos } = allRestaurantsSlice.actions;

export const renderAllRestaurants = (state) => state.restaurants;

export default allRestaurantsSlice.reducer;
