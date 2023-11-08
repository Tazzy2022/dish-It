// import axios from "axios";

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   friend: {},
//   friendLists: [],
//   message: "",
//   error: "",
// };

// export const getSingleFriendLists = createAsyncThunk(
//   "singleFriend/getSingleFriendLists",
//   async ({ token, friendEmail }) => {
//     try {
//       const response = await axios.get(`/api/user/${friendEmail}/lists`, {
//         headers: {
//           authorization: token,
//         },
//       });
//       return response?.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

// const singleFriendSlice = createSlice({
//   name: "singleFriendLists",
//   initialState,
//   reducers: {
//     loggoutFriendLists: (state) => {
// 			friend = {}
//       friendLists = [];
//       state.error = "";
//       state.token = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getSingleFriendLists.rejected, (state, action) => {
//       state.error = action.error.message;
//     });
//     builder.addCase(getSingleFriendLists.fulfilled, (state, action) => {
//       state.friendLists = action.payload
//     });
//   },
// });

// export const { loggoutFriendLists } = singleFriendSlice.actions;

// export default singleFriendSlice.reducer;
