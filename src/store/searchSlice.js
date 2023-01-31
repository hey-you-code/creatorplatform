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
    dataForBackend: [],
  },
  reducers: {
    updateContextStarted: (state, action) => {},
    updateContextSuccess: (state, action) => {
      let response = action.payload.server_response.data;
      state.category = action.payload.data.category;
      state.search_query = action.payload.data.search_query;
      state.color = action.payload.data.color;
      console.log(
        "Server results returned:",
        action.payload.server_response.data.results
      );
      state.results = action.payload.server_response.data.results;
    },
    updateContextFailed: (state, action) => {},
    setProduct_url: (state, action) => {
      state.product_url = action.payload;
    },
    updateResults: (state, action) => {
      state.results = [];
    },
    sendInfoStarted: (state, action) => {},
    sendInfoSuccess: (state, action) => {
      state.category = action.payload.data.category;
      state.search_query = action.payload.data.search_query;
      state.color = action.payload.data.color;
      state.product_url = action.payload.data;
      console.log(
        "Server results returned:",
        action.payload.server_response.data
      );
      state.dataForBackend = [
        ...state.dataForBackend,
        action.payload.server_response.data,
      ];
    },
    sendInfoFailed: (state, action) => {},
  },
});

export const {
  updateContextStarted,
  updateContextSuccess,
  updateContextFailed,
  setProduct_url,
  updateResults,
} = searchSlice.actions;

export default searchSlice.reducer;

export const updateContext =
  (category, search_query, color) => (dispatch, getState) => {
    console.log("updateContext called");
    return dispatch(
      apiCallBegan({
        url: "/search",
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

export const sendInfo =
  (category, search_query, color, product_url) => (dispatch, getState) => {
    console.log("sendInfo called");
    return dispatch(
      apiCallBegan({
        url: "/sendInfo",
        method: "post",
        data_to_server: {
          category: category,
          search_query: search_query,
          color: color,
          product_url: product_url,
        },
        data: {
          category: category,
          search_query: search_query,
          color: color,
          product_url: product_url,
        },
        onStart: sendInfo.type,
        onSuccess: sendInfo.type,
        onFailed: sendInfo.type,
      })
    );
  };
