import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const recreateLookSlice = createSlice({
  name: "recreateLook",
  initialState: {
    outfitboard: {},
  },
  reducers: {
    fetchBoardStarted: (state, action) => { },
    fetchBoardSuccess: (state, action) => {
      state.outfitboard = action.payload.server_response.data.objectCopy;
      console.log(
        "serverResponse",
        action.payload.server_response.data.objectCopy
      );
    },
    fetchBoardFailed: (state, action) => { },
    updateBoard: (state, action) => {
      // var outfitBoard = JSON.parse(JSON.stringify(state.outfitboard));
      // state.outfitboard[0].products.tops[0].search_query = "HEY WAASSuP";
      // outfitBoard[0].unique_name = "Bishal";
      console.log(state.outfitBoard);
      // state.outfitBoard[0] = action.payload;
    },
    updateSearchAndUrl: (state, action) => {
      state.outfitboard = action.payload.outfit_board;
    },
    updateSearchAndUrlSuccess: (state, action) => { },
    updateSearchAndUrlFailed: (state, action) => { },
  },
});

export const {
  fetchBoardStarted,
  fetchBoardSuccess,
  fetchBoardFailed,
  updateBoard,
  updateSearchAndUrl,
  updateSearchAndUrlSuccess,
  updateSearchAndUrlFailed,
} = recreateLookSlice.actions;

export default recreateLookSlice.reducer;

export const fetch_board_with_id = () => (dispatch, getState) => {
  console.log("fetch Board Called");
  return dispatch(
    apiCallBegan({
      url: "/recreate",
      method: "get",
      data_to_server: {},
      data: {},
      onStart: fetchBoardStarted.type,
      onSuccess: fetchBoardSuccess.type,
      onFailed: fetchBoardFailed.type,
    })
  );
};

export const update_board =
  (category, product_url, search_query) => (dispatch, getState) => {
    var outfit_board = getState().recreateLook.outfitboard;
    var outfitBoard = JSON.parse(JSON.stringify(outfit_board));
    var outfit_board_category = outfitBoard[0]?.products[category];
    outfitBoard[0].unique_name = "Bishal";

    outfit_board_category[0].url[0] = product_url;
    outfit_board_category[0].search_query = search_query;

    console.log("updated_board", outfit_board_category);

    return dispatch({
      type: updateSearchAndUrl.type,
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
