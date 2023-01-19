import { createSlice } from "@reduxjs/toolkit";

const recreateSlice = createSlice({
  name: "recreate",
  initialState: {
    image_to_recreate: null,
    selectedCategories: [],
    color: null,
    searchedCategories: [],
    imageUrls: [],
    dataToBackend: [],
  },
  reducers: {
    setImagerecreate: (state, action) => {
      state.image_to_recreate = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = [...state.selectedCategories, action.payload];
    },
    updateCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSearchedCategories: (state, action) => {
      state.searchedCategories = [...state.searchedCategories, action.payload];
    },
    setImageUrls: (state, action) => {
      state.imageUrls = [...state.imageUrls, action.payload];
    },
    updateImageUrls: (state, action) => {
      state.imageUrls = action.payload;
    },
    sendDataToBackend: (state, action) => {
      state.dataToBackend = [...state.dataToBackend, action.payload];
    },
  },
});

export const {
  setImagerecreate,
  setSelectedCategories,
  updateCategories,
  setColor,
  setSearchedCategories,
  setImageUrls,
  updateImageUrls,
  sendDataToBackend,
} = recreateSlice.actions;

export const image_to_recreate = (state) => state.recreate.image_to_recreate;

export const selectedCategories = (state) => state.recreate.selectedCategories;

export const color = (state) => state.recreate.color;

export const searchedCategories = (state) => state.recreate.searchedCategories;

export const imageUrls = (state) => state.recreate.imageUrls;

export const dataToBackend = (state) => state.recreate.dataToBackend;

export default recreateSlice.reducer;
