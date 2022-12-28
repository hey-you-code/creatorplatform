import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
  name: "picture",
  initialState: {
    selectedFile: [],
    finalizedFile: [],
    finalColor: null,
  },

  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = [...state.selectedFile, action.payload];
    },
    updateFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setFinalFile: (state, action) => {
      state.finalizedFile = action.payload;
    },
    setFinalColor: (state, action) => {
      state.finalColor = action.payload;
    },
  },
});

export const { setSelectedFile, updateFile, setFinalFile, setFinalColor } =
  pictureSlice.actions;

export const selectedFile = (state) => state.picture.selectedFile;

export const finalizedFile = (state) => state.picture.finalizedFile;

export const finalColor = (state) => state.picture.finalColor;

export default pictureSlice.reducer;
