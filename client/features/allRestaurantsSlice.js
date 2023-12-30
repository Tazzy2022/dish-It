import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

const refactorCategories = (categories) => {
  let newCategory = [];
  categories.forEach((cat) => {
    if (cat.includes("&")) {
      newCategory.push(cat.replace(" & ", "_"));
    } else if (cat.includes(" ")) {
      newCategory.push(cat.replace(/\s/g, ""));
    } else {
      newCategory.push(cat);
    }
  });
  return newCategory;
};

export const filterSearch = createAsyncThunk(
  "allRestaurants/filterSearch",
  async (searchObj) => {
    try {
      //console.log("searchObj", searchObj);
      if (searchObj.restaurant.length > 0) {
        const loc = searchObj.location.replaceAll(",", "");
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
        const loc = searchObj.location.replaceAll(",", "");
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
        const loc = searchObj.location.replaceAll(",", "");
        const cat = refactorCategories(searchObj.categories);
        const allCategories = "&categories=" + cat.join("&categories=");
        const pricing = "&price=" + searchObj.price.join("&price=");
        const response = await axios.get(
          `/api/restaurants/allFilters/${loc}/${allCategories}/${pricing}`,
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
        const loc = searchObj.location.replaceAll(",", "");
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
        const loc = searchObj.location.replaceAll(",", "");
        const cat = refactorCategories(searchObj.categories);
        const category = "&term=" + cat.join(" ");
        const response = await axios.get(
          `/api/restaurants/catPrice/${category}/${loc}`,
          {
            headers: {
              authorization: searchObj.token,
            },
          }
        );
        console.log("response?.data", response?.data);
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
      const loc = location.replaceAll(",", "");
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

export const getRestaurantsLocationPrice = createAsyncThunk(
  "allRestaurants/getRestaurantsLocationPrice",
  async ({ token, location, price }) => {
    try {
      const loc = location.replaceAll(",", "");
      const pricing = "&price=" + price.join("&price=");
      const response = await axios.get(
        `/api/restaurants/price/${pricing}/${loc}`,
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
    try {
      const loc = location.replaceAll(",", "");
      const cat = refactorCategories(categories);
      const category = "&term=" + cat.join(" ");
      const response = await axios.get(
        `/api/restaurants/catPrice/${category}/${loc}`,
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
      const loc = location.replaceAll(",", "");
      const cat = refactorCategories(categories);
      const allCategories = "&categories=" + cat.join("&categories=");
      const pricing = "&price=" + price.join("&price=");
      const response = await axios.get(
        `/api/restaurants/allFilters/${loc}/${allCategories}/${pricing}`,
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
      const loc = location.replaceAll(",", "");
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
    builder.addCase(filterSearch.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { clearRestos } = allRestaurantsSlice.actions;

export const renderAllRestaurants = (state) => state.restaurants;

export default allRestaurantsSlice.reducer;
