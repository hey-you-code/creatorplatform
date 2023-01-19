import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    category: "",
    search_query: "",
    color: "",
    results: [],
    product_url: "",
  },
  reducers: {
    updateContextStarted: (state, action) => { },
    updateContextSuccess: (state, action) => {
      let response = action.payload.server_response.data;
      state.category = action.payload.data.category;
      state.search_query = action.payload.data.search_query;
      state.color = action.payload.data.color;
      console.log("Server results returned:", action.payload.server_response.data.results);
      state.results = action.payload.server_response.data.results;
    },
    updateContextFailed: (state, action) => { },
  },
});

export const {
  updateContextStarted,
  updateContextSuccess,
  updateContextFailed,
} = searchSlice.actions;

export default searchSlice.reducer;

export const updateContext =
  (category, search_query, color) => (dispatch, getState) => {
    console.log("updateContext called");
    return dispatch(
      apiCallBegan({
        url: "/recreate/search",
        method: "post",
        data_to_server: {
          category: category,
          search_query: search_query,
          color: color,
        },
        data: {
          category: category,
          search_query: search_query,
          color: color,
        },
        onStart: updateContextStarted.type,
        onSuccess: updateContextSuccess.type,
        onFailed: updateContextFailed.type,
      })
    );
  };
