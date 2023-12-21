import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  image: "",
  error: "",
};

export const getPhoto = createAsyncThunk(
  "auth/getPhoto",
  async ({ token, id }) => {
    console.log("token, id", token, id);
    try {
      const response = await axios.get(`/api/users/image/${id}`, {
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
