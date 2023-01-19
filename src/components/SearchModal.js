import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  imageUrls,
  sendDataToBackend,
  setImageUrls,
} from "../store/recreateSilce";
import { updateContext } from "../store/searchSlice";
import { ImageUrls } from "./ImageUrls";

function SearchModal({
  pickedColor,
  clickedCategory,
  searchModalRef,
  setSearchInput,
  results,
  updateContext,
}) {
  const dispatch = useDispatch();
  const imageUrlList = useSelector(imageUrls);
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
  };

  console.log("results", results);

  const handleDone = () => {
    // if (
    //   imageUrlList.filter((item) => item.category === clickedCategory).length ==
    //   0
    // ) {
    dispatch(
      setImageUrls({
        searchContext: {
          category: clickedCategory,
          color: pickedColor,
          query: searchQuery,
          // price: imageUrl[0]?.price,
          id: imageUrl[0]?.id,
        },
        response: {
          url: url,
          primary_image: url,
          title: "",
          price: "",
          brand: "",
        },
      })
    );
    dispatch(
      sendDataToBackend({
        category: clickedCategory,
        url: url,
      })
    );
    setSearchInput(url);
    searchModalRef.current.close();
  };

  console.log("urls:", imageUrl);
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

      {imageUrl?.map((item, index) => (
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
});

const mapDispatchToProps = (dispatch) => ({
  updateContext: (category, search_query, color) =>
    dispatch(updateContext(category, search_query, color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
