import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  error: "",
};

export const getAllLists = createAsyncThunk(
  "auth/getAllLists",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`/api/user/${id}/lists`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLists.fulfilled, (state, action) => {
      //state.lists = action.payload;
      return action.payload;
    });
    builder.addCase(getAllLists.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default listSlice.reducer;
