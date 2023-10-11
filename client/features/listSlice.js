import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  error: "",
};

export const getAllLists = createAsyncThunk(
  "lists/getAllLists",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`/api/user/${id}/lists`, {
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

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    loggoutUserLists: (state) => {
      state.lists = [];
      state.error = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLists.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getAllLists.fulfilled, (state, action) => {
      //state.lists = action.payload.lists;
      return action.payload;
    });
  },
});

export const { loggoutUserLists } = listSlice.actions;

export default listSlice.reducer;
