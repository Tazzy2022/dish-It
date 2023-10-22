import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  singleList: {},
  error: "",
  token: "",
};

export const getSingleList = createAsyncThunk(
  "list/getSingleList",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`/api/user/list/${id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("response?.data", response?.data);
      return response?.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ id, token, listName }) => {
    console.log("!!!!", listName);
    const name = listName.listName;
    try {
      const response = await axios.post(`/api/user/${id}/list`, name, {
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

const singleListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    loggoutSingleList: (state) => {
      state.singlelist = {};
      state.error = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      //state.lists = action.payload.lists;
      return action.payload;
    });
    builder.addCase(getSingleList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleList.fulfilled, (state, action) => {
      //state.lists = action.payload.list;
      return action.payload;
    });
  },
});

export const { loggoutSingleList } = singleListSlice.actions;

export const renderSingleList = (state) => state.list;

export default singleListSlice.reducer;
