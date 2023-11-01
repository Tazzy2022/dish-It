import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  friendInvited: {},
  friendRequests: [],
  message: "",
  error: "",
};

export const getFriendsList = createAsyncThunk(
  "friends/getFriendsList",
  async ({ token, id }) => {
    try {
      const response = await axios.get(`/api/user/${id}/friends`, {
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
  async ({ token, id, userId }) => {
    try {
      const response = await axios.post(`/api/user/${id}/friendReq`, userId, {
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

export const getPendingFriends = createAsyncThunk(
  "friends/getPendingFriends",
  async ({ token, id }) => {
    try {
      const response = await axios.get(`/api/user/${id}/pendingfollowers`, {
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

export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  async ({ token, id, friendId }) => {
    try {
      const response = await axios.put(`/api/user/${id}/addfriend`, friendId, {
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

export const deleteFriend = createAsyncThunk(
  "friends/deleteFriend",
  async ({ token, id, friendId }) => {
    try {
      const response = await axios.put(`/api/user/${id}/deleteFriend`, friendId, {
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
      state.message = "your friend request has been sent"
    });
    builder.addCase(sendFriendRequest.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getPendingFriends.fulfilled, (state, action) => {
      state.friendRequests = action.payload;
    });
    builder.addCase(getPendingFriends.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.message = "added new friend"
    });
    builder.addCase(acceptFriendRequest.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      state.message = "that friend was removed from your list"
    });
    builder.addCase(deleteFriend.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//export const { loggedoutUser } = authSlice.actions;

export default FriendsSlice.reducer;
