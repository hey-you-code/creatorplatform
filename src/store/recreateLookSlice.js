import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const recreateLookSlice = createSlice({
  name: "recreateLook",
  initialState: {
    id: null,
    outfitboard: {},
    data: [],
  },
  reducers: {
    fetchBoardStarted: (state, action) => {},
    fetchBoardSuccess: (state, action) => {
      // state.id = action.payload;
      state.outfitboard = action.payload.server_response.data.objectCopy;
      console.log(
        "serverResponse",
        action.payload.server_response.data.objectCopy
      );
    },
    fetchBoardFailed: (state, action) => {},
    updateBoard: (state, action) => {
      // var outfitBoard = JSON.parse(JSON.stringify(state.outfitboard));
      // state.outfitboard[0].products.tops[0].search_query = "HEY WAASSuP";
      // outfitBoard[0].unique_name = "Bishal";
      // console.log(state.outfitBoard);
      // state.outfitBoard[0] = action.payload;
    },
    updateSearchAndUrl: (state, action) => {
      state.outfitboard = action.payload["outfit_board"];
    },
    sendData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    clearData: (state, action) => {
      state.data = state.data.filter(
        (item) => item.category !== action.payload
      );
      // state.data = action.payload;
    },
    sendOutfitBoard: (state, action) => {
      state.outfitboard = action.payload["outfit_board"];
    },
  },
});

export const {
  fetchBoardStarted,
  fetchBoardSuccess,
  fetchBoardFailed,
  updateBoard,
  updateSearchAndUrl,
  sendData,
  clearData,
  sendOutfitBoard,
} = recreateLookSlice.actions;

export default recreateLookSlice.reducer;

export const fetch_board_with_id = (id) => (dispatch, getState) => {
  console.log("fetch Board Called");
  return dispatch(
    apiCallBegan({
      url: "/recreate",
      method: "post",
      data_to_server: { id: id },
      data: { id: id },
      onStart: fetchBoardStarted.type,
      onSuccess: fetchBoardSuccess.type,
      onFailed: fetchBoardFailed.type,
    })
  );
};

export const update_board =
  (category, product_url, search_query, color) => (dispatch, getState) => {
    var outfit_board = getState().recreateLook.outfitboard;
    var outfitBoard = JSON.parse(JSON.stringify(outfit_board));
    var outfit_board_category = outfitBoard[0]?.products[category];
    // outfitBoard[0].unique_name = "Bishal";

    outfit_board_category[0].url[0] = product_url;
    outfit_board_category[0].search_query = search_query;
    outfit_board_category[0].color = color;

    console.log("updated_board", outfit_board_category);

    return dispatch({
      type: updateSearchAndUrl.type,
      payload: { outfit_board: outfitBoard },
    });
  };

export const send_outfit_board =
  (category, title, price, brand, primaryImage) => (dispatch, getState) => {
    var outfit_board = getState().recreateLook.outfitboard;
    var outfitBoard = JSON.parse(JSON.stringify(outfit_board));
    var outfit_board_category = outfitBoard[0]?.products[category];
    // outfitBoard[0].unique_name = "Bishal";

    outfit_board_category[0].url[0] = primaryImage;
    outfit_board_category[0].brand = brand;
    outfit_board_category[0].price = price;
    outfit_board_category[0].title = title;

    console.log("updated_board", outfit_board_category);

    return dispatch({
      type: sendOutfitBoard.type,
      payload: { outfit_board: outfitBoard },
    });
  };

//   Stuck to make the below function

// export const update_search_And_Url = (category, search_query, product_url) => (dispatch, getState) => {
//   var outfit_board = getState().recreateLook.outfitboard;
//   var outfitBoard = JSON.parse(JSON.stringify(outfit_board));

//   if (
//     outfitBoard[0]?.products[category] == Action.payload.category_outfit_board
//   ) {

//   }
// };
