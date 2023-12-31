import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  friend: {},
  friendRequests: [],
  friendsLists: [],
  message: "",
  error: "",
};

export const getAllFriends = createAsyncThunk(
  "friends/getAllFriends",
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

//need to add clause to handle email to get user
export const findFriend = createAsyncThunk(
  "friends/findFriend",
  async ({ token, email }) => {
    try {
      const response = await axios.get(`/api/user/friend/${email}`, {
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
  async ({ token, id, userEmail }) => {
    try {
      const response = await axios.post(
        `/api/user/${id}/friendReq`,
        userEmail,
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
  async ({ token, id, friendEmail }) => {
    try {
      const response = await axios.put(
        `/api/user/addfriend/${friendEmail}`,
        id,
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

export const deleteFriend = createAsyncThunk(
  "friends/deleteFriend",
  async ({ token, id, friendEmail }) => {
    try {
      const response = await axios.put(
        `/api/user/deleteFriend/${friendEmail}`,
        id,
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

export const getSingleFriendsLists = createAsyncThunk(
  "singleFriend/getSingleFriendsLists",
  async ({ token, friendEmail }) => {
    try {
      const response = await axios.get(
        `/api/user/friend/lists/${friendEmail}`,
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

const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    logoutFriends: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
    });
    builder.addCase(getAllFriends.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(findFriend.fulfilled, (state, action) => {
      state.friend = action.payload;
    });
    builder.addCase(findFriend.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.friend = initialState;
      state.message = "your friend request has been sent";
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
      state.message = "added new friend";
    });
    builder.addCase(acceptFriendRequest.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      state.message = "friend was deleted";
    });
    builder.addCase(deleteFriend.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleFriendsLists.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getSingleFriendsLists.fulfilled, (state, action) => {
      state.friendsLists = action.payload;
    });
  },
});

export const { logoutFriends } = FriendsSlice.actions;

export default FriendsSlice.reducer;
