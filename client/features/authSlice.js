import axios from "axios";
//import download from 'downloadjs';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  // image: {},
  error: "",
  token: "",
};

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  try {
    console.log("USER in thunk params", user)
    const response = await axios.post(`/auth/login`, user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (userInfo) => {
    try {
      const { data: updated } = await axios.put(
        `/api/users/${userInfo.id}`,
        userInfo,
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );
      return updated;
    } catch (error) {
      return error.message;
    }
  }
);

// export const getUserImage = createAsyncThunk(
//   "auth/getUserImage",
//   async ({ id, token }) => {
//     console.log("ID", id, token);
//     try {
//       const response = await axios.get(
//         `/api/users/${id}/image`,
//         {
//           headers: {
//             authorization: token,
//           },
//         },
//         { responseType: "blob" }
//       );
//       console.log("response.data", response.data);

// const split = response.data.file_path.split('/');
// const filename = split[split.length - 1];
// response.send(download(response.data, filename, response.data.file_mimetype));
//return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userInfo) => {
    try {
      console.log("userInfo", userInfo);
      const { data: updated } = await axios.post(
        `/api/users/${userInfo.userId}/avatar`,
        userInfo.avatar,
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );
      return updated;
    } catch (error) {
      return error.message;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo) => {
    console.log("USERINFO", userInfo);
    try {
      const response = await axios.post("/auth/signup", userInfo);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Logout action
    loggedoutUser: (state) => {
      state.user = {};
      // state.error = "";
      // state.token = "";
    },
  },
  //extraReducers handle axios calls - unlike "reducers:{}"
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updatePhoto.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return action.error.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { loggedoutUser } = authSlice.actions;

export default authSlice.reducer;
