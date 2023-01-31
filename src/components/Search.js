import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  color,
  imageUrls,
  searchedCategories,
  setSearchedCategories,
  setSelectedCategories,
  updateImageUrls,
} from "../store/recreateSilce";
import { sendInfo, updateResults } from "../store/searchSlice";
import ColorPicker from "./ColorPicker";
import Modal from "./Modal";
import SearchModal from "./SearchModal";

function Search({
  id,
  url,
  clickedCategory,
  setClickedCategory,
  searchRef,
  setProducts,
  sendInfo,
  dataForBackend,
}) {
  const dispatch = useDispatch();
  const imageUrl = useSelector(imageUrls);
  const pickcolorRef = useRef();
  const pickedColor = useSelector(color);
  // const [pickedColor, setPickedColor] = useState(null);
  const [searchInput, setSearchInput] = useState(
    imageUrl?.filter((item) => item.category == clickedCategory)[0]?.url
  );
  const categoriesSelected = useSelector(searchedCategories);
  const searchModalRef = useRef();

  console.log(
    "iurl:",
    imageUrl?.filter(
      (item) => item.searchContext.category == clickedCategory
    )[0]?.price
  );

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-full flex justify-center h-full ">
      <div className="space-y-4 justify-center text-center">
        <div className="text-3xl font-bold">Search {clickedCategory}</div>
        <button
          onClick={() => pickcolorRef.current.open()}
          className="font-semibold text-xl p-2 rounded-full text-blue-500 shadow-lg"
        >
          Pick Color
        </button>
        {pickedColor && (
          <div className="flex space-x-2 justify-center items-center text-center">
            <div
              className="h-8 w-8 rounded-lg"
              style={{
                backgroundColor: pickedColor,
              }}
            ></div>
            <div className="text-lg font-semibold">{pickedColor}</div>
          </div>
        )}
        <div className="space-y-4">
          <div className="flex space-x-2 items-center">
            {searchInput ? (
              <img
                src={searchInput}
                className="w-[50px] h-[50px] object-contain"
                alt=""
              />
            ) : (
              <img
                src="https://reactjs.org/logo-og.png"
                className="w-[50px] h-[50px] object-contain"
                alt=""
              />
            )}

            <input
              type="text"
              className="border-[1px] border-gray-100 p-2 rounded-lg outline-none shadow-lg "
              placeholder="Search...."
              value={searchInput}
              onChange={handleChange}
            />
            {/* <button
              onClick={() => {
                setSearchInput(null);
              }}
              className=" px-1 h-6 flex items-center text-blue-500 text-xl"
            >
              Edit
            </button> */}
          </div>

          <div
            className="bg-green-500 text-white text-semibold rounded-full py-1 cursor-pointer px-2"
            onClick={() => {
              if (
                imageUrl.filter(
                  (item) => item.searchContext.category === clickedCategory
                ).length != 0
              ) {
                dispatch(
                  updateImageUrls(
                    imageUrl.filter(
                      (item) => item.searchContext.category != clickedCategory
                    )
                  )
                );
              }
              dispatch(updateResults());
              searchModalRef.current.open();
            }}
          >
            Search Products
          </div>
        </div>
        <Modal ref={pickcolorRef}>
          <ColorPicker id={id} pickcolorRef={pickcolorRef} />
        </Modal>
        <Modal ref={searchModalRef}>
          <SearchModal
            pickedColor={pickedColor}
            searchModalRef={searchModalRef}
            clickedCategory={clickedCategory}
            setSearchInput={setSearchInput}
          />
        </Modal>

        <button
          onClick={() => {
            dispatch(setSelectedCategories(clickedCategory));
            // sendInfo();
            console.log("data",dataForBackend);
            searchRef.current.close();
          }}
          className="bg-blue-500 px-4 py-2 text-white text-xl font-semibold "
        >
          Done
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  dataForBackend: state.search.dataForBackend,
});

const mapDispatchToProps = (dispatch) => ({
  // sendInfo: () => dispatch(sendInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
