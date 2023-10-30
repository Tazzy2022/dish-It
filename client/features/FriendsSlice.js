import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  friendInvited: {},
  //friendEmail: {},
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
    console.log(" token ", token, "email", email.email);
    try {
      const response = await axios.get(`/api/user/friend/${email.email}`, {
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
  },
});

//export const { loggedoutUser } = authSlice.actions;

export default FriendsSlice.reducer;
