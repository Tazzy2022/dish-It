import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  image: "",
  friendImages: [],
  error: "",
};

//consider sending the dummy image here
export const getPhoto = createAsyncThunk(
  "image/getPhoto",
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

export const getFriendsPhotos = createAsyncThunk(
  "image/getFriendsPhotos",
  async ({ token, friendEmail }) => {
    console.log("friendEmail in axios call", friendEmail);
    try {
      const response = await axios.put(`/api/user/friendImages`, friendEmail, {
        headers: {
          authorization: token,
        },
      });
      console.log("response", response);
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
    builder.addCase(getFriendsPhotos.fulfilled, (state, action) => {
      state.friendImages = action.payload;
    });
    builder.addCase(getFriendsPhotos.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { logoutImage } = imageSlice.actions;

export default imageSlice.reducer;
