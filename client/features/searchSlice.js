import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurant: "",
    location: "",
    price: [],
    categories: [],
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers:{
setRestaurant: (state, input) => {
	state.restaurant = input.payload
},
setLocation: (state, input) => {
	state.location = input.payload
},
setPrice: (state, input) => {
	state.price = input.payload
},
setCategories: (state, input) => {
	state.categories = input.payload
},
	}
})

export const { setRestaurant, setLocation, setPrice, setCategories } = searchSlice.actions

export const searchState = (state) => state.search;

export default searchSlice.reducer;
