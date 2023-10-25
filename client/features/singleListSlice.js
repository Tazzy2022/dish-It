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
      return response?.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createList = createAsyncThunk(
  "list/createList",
  async ({ id, token, listName }) => {
    try {
      const response = await axios.post(`/api/user/${id}/list`, listName, {
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

export const addRestoToList = createAsyncThunk(
  "list/addRestoToList",
  async ({ userId, token, listName, restaurantId }) => {
    try {
      const response = await axios.put(
        `/api/user/${userId}/${listName}`,
        restaurantId,
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
      return action.payload;
    });
    builder.addCase(getSingleList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleList.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addRestoToList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(addRestoToList.fulfilled, (state, action) => {
      //state.list = action.payload;
      return action.payload;
    });
  },
});

export const { loggoutSingleList } = singleListSlice.actions;

export const renderSingleList = (state) => state.list;

export default singleListSlice.reducer;
