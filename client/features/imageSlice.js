import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const updatePhoto = createAsyncThunk(
//   "auth/updatePhoto",
//   async (userInfo) => {
//     try {
//       const { data: updated } = await axios.post(
//         `/api/users/${userInfo.userId}/avatar`,
//         userInfo.avatar,
//         {
//           headers: {
//             authorization: userInfo.token,
//           },
//         }
//       );
//       return updated;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

const initialState = {
  image: null,
    uploadStatus: 'idle',
    error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    // setCroppedImage: (state, action) => {
    //   state.croppedImage = action.payload;
    // },
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  // setCroppedImage,
  setUploadStatus, setError } = imageSlice.actions;
// export const selectCroppedImage = (state) => state.image.croppedImage;
export const selectUploadStatus = (state) => state.image.uploadStatus;
export const selectError = (state) => state.image.error;

export default imageSlice.reducer;
