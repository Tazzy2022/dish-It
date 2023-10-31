import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  friendInvited: {},
  error: "",
};

export const getFriendsList = createAsyncThunk(
  "friends/getFriendsList",
  async ({ token, id }) => {
    try {
      const response = await axios.get(`/api/user/${id}/followers`, {
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

export const inviteFriends = createAsyncThunk(
  "friends/inviteFriends",
  async ({ token, email }) => {
    try {
      const response = await axios.get(`/api/user/friend/${email.email}`, {
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

export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async ({ token, email, id }) => {
    try {
      const response = await axios.put(`/api/user/friendReq/${email}`, id, {
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

//check if they exist in db, if so send back
//that user's pic, user name, city, state for possible
//follow

//if none of the above hang on to email and ask if they
//want us to email invite to them

//then handle invite

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendsList.fulfilled, (state, action) => {
      state.friends = action.payload;
    });
    builder.addCase(getFriendsList.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(inviteFriends.fulfilled, (state, action) => {
      state.friendInvited = action.payload;
    });
    builder.addCase(inviteFriends.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.friendInvited = initialState
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//export const { loggedoutUser } = authSlice.actions;

export default FriendsSlice.reducer;
