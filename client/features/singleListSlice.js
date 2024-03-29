import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  restaurantIdArray: [],
  listName: "",
  id: "",
  notes: "",
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
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createList = createAsyncThunk(
  "list/createList",
  async ({ id, token, listName }) => {
    try {
      const response = await axios.post(
        `/api/user/createlist/${id}`,
        listName,
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

export const createListAndAdd = createAsyncThunk(
  "list/createListAndAdd",
  async ({ userId, token, listName, restaurantId, notes }) => {
    try {
      const response = await axios.post(
        `/api/user/createPopList/${userId}/${listName}`,
        { restaurantId, notes },
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

export const copyList = createAsyncThunk(
  "list/copyList",
  async ({
    id,
    token,
    listName,
    restaurantIdArray,
    image,
    restaurantNotes,
  }) => {
    try {
      const response = await axios.post(
        `/api/user/copied/${id}/${listName}`,
        {
          restaurantIdArray: restaurantIdArray,
          image: image,
          restaurantNotes: restaurantNotes,
        },
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

export const addRestoToList = createAsyncThunk(
  "list/addRestoToList",
  async ({ userId, token, listName, restaurantId, notes }) => {
    try {
      const response = await axios.put(
        `/api/user/${userId}/${listName}`,
        { restaurantId, notes },
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

export const updateNotes = createAsyncThunk(
  "list/updateNotes",
  async ({ token, listId, restaurantId, personalNotes }) => {
    try {
      const response = await axios.put(
        `/api/user/lists/${listId}/${restaurantId}`,
        { personalNotes },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const removeRestaurantFromList = createAsyncThunk(
  "list/removeRestaurantFromList",
  async ({ listId, token, restaurantId }) => {
    try {
      const response = await axios.delete(
        `/api/user/${listId}/${restaurantId}`,
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
    builder.addCase(createListAndAdd.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(createListAndAdd.fulfilled, (state, action) => {
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
      return action.payload;
    });
    builder.addCase(updateNotes.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateNotes.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeRestaurantFromList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(removeRestaurantFromList.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(copyList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(copyList.fulfilled, (state, action) => {
      state.singlelist = action.payload;
    });
  },
});

export const { loggoutSingleList } = singleListSlice.actions;

export default singleListSlice.reducer;
