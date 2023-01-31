import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetch_board_with_id,
  updateBoard,
  update_board,
} from "../store/recreateLookSlice";
import {
  imageUrls,
  sendDataToBackend,
  setImageUrls,
} from "../store/recreateSilce";
import { sendInfo, setProduct_url, updateContext } from "../store/searchSlice";
import { ImageUrls } from "./ImageUrls";

function SearchModal({
  pickedColor,
  clickedCategory,
  searchModalRef,
  setSearchInput,
  results,
  updateContext,
  product_url,
  sendInfo,
  fetch_board_with_id,
  update_board,
}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(null);

  //   console.log(
  //     "urls:",
  //     ImageUrls.filter((item) => item.category === "Top")
  //   );

  const [imageUrl, setImageUrl] = useState([]);

  const [url, setUrl] = useState(null);

  console.log("Final url:", url);

  const handleSearch = () => {
    setImageUrl(ImageUrls.filter((item) => item.category === clickedCategory));
    console.log(searchQuery);

    updateContext(clickedCategory, searchQuery, pickedColor);
    // fetch_board_with_id();
    dispatch(updateBoard());
  };

  console.log("results", results);

  // useEffect(() => {
  //   fetch_board_with_id();
  // }, []);

  const handleDone = () => {
    // if (
    //   imageUrlList.filter((item) => item.category === clickedCategory).length ==
    //   0
    // ) {
    dispatch(setProduct_url(url));
    // dispatch(updateBoard(url));
    setSearchInput(url);
    sendInfo(clickedCategory, searchQuery, pickedColor, url);
    searchModalRef.current.close();
    update_board(clickedCategory.toLowerCase(), url, searchQuery);
  };

  console.log("urls:", product_url);
  return (
    <div
      className=" w-full p-4 space-y-8"
      style={{
        height: (3 / 4) * window.innerHeight,
      }}
    >
      <div className="flex justify-center space-x-4 items-center">
        <div className="text-2xl font-semibold ">{clickedCategory}</div>
        <div className="text-2xl flex space-x-2">
          <div
            className="h-8 w-8 rounded-xl"
            style={{
              backgroundColor: pickedColor,
            }}
          ></div>
          <div>{pickedColor}</div>
        </div>

        {/* <div className="space-y-2 flex-col"> */}
      </div>
      <div className="flex space-x-4 justify-center items-center">
        <input
          type="text"
          className="max-w-lg px-5 py-2 rounded-full border-gray-400 border-2 hover:shadow-lg focus-within:shadow-lg outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 rounded-full bg-gray-300"
        >
          Search
        </button>
      </div>

      {results?.map((item, index) => (
        <div key={index} className="flex justify-center items-center space-x-4">
          <input
            type="radio"
            name="url"
            value={item.url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-6 w-6 text-green-500"
          />
          <img src={item?.url} alt="" className="h-[80px] rounded-xl" />
          <h2 className="text-xl" onClick={() => {}}>
            {item?.url.slice(0, 50) + `...`}
          </h2>
          <h6>{item?.price}</h6>
        </div>
      ))}

      {imageUrl.length != 0 ? (
        <button
          className={
            !url
              ? "opacity-40 bg-gray-200 font-semibold text-xl shadow-md rounded-full p-2"
              : "text-blue-500 font-semibold text-xl shadow-md rounded-full p-2 hover:opacity-80"
          }
          disabled={!url}
          onClick={handleDone}
        >
          Done
        </button>
      ) : (
        <></>
      )}

      {/* </div> */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  results: state.search.results,
  product_url: state.search.product_url,
});

const mapDispatchToProps = (dispatch) => ({
  updateContext: (category, search_query, color) =>
    dispatch(updateContext(category, search_query, color)),
  sendInfo: (category, search_query, color, product_url) =>
    dispatch(sendInfo(category, search_query, color, product_url)),
  fetch_board_with_id: () => dispatch(fetch_board_with_id()),
  update_board: (search_query, category, product_url) =>
    dispatch(update_board(search_query, category, product_url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
