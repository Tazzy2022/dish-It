import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  image: "",
  error: "",
};

export const getPhoto = createAsyncThunk(
  "auth/getPhoto",
  async ({ token, email }) => {
    try {
      const response = await axios.get(`/api/users/image/${email}`, {
        headers: {
          authorization: token,
        },
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    logoutImage: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhoto.fulfilled, (state, action) => {
      state.image = action.payload;
    });
    builder.addCase(getPhoto.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { logoutImage } = imageSlice.actions;

export default imageSlice.reducer;
