import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  error: "",
  token: "",
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

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async ({ listId, token }) => {
    try {
      await axios.delete(`/api/user/${listId}`, {
        headers: {
          authorization: token,
        },
      });
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
    removeList: (state, listId) => {
      console.log(listId);
      state.lists.filter((list) => list.id !== listId);
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

export const { loggoutUserLists, removeList } = listSlice.actions;

export default listSlice.reducer;
