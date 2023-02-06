import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import UploadPhotos from "../components/UploadPhotos";
// import productData from "../components/products.json";
import {
  dataToBackend,
  imageUrls,
  image_to_recreate,
  searchedCategories,
  selectedCategories,
  sendDataToBackend,
  setSelectedCategories,
  updateCategories,
  updateImageUrls,
} from "../store/recreateSilce";
import Modal from "../components/Modal";
import UploadSection from "../components/UploadSection";
import ColorPicker from "../components/ColorPicker";
import { Chip } from "@mui/material";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
// import { CategoriesData } from "../components/CategoriesData";
import productData from "../store/data/products.json";
import {
  fetch_board_with_id,
  sendData,
  update_board,
  clearData,
} from "../store/recreateLookSlice";

function RecreateLook({
  fetch_board_with_id,
  outfitboard,
  update_board,
  data,
  setDone,
}) {
  const navigate = useNavigate();
  const images = useSelector(image_to_recreate);
  const selectedCategory = useSelector(selectedCategories);
  const categoriesSelected = useSelector(searchedCategories);
  const imageUrl = useSelector(imageUrls);
  const dataForBackend = useSelector(dataToBackend);
  const dispatch = useDispatch();
  console.log(images);
  const modalRef = useRef();
  const pickcolorRef = useRef();
  const searchRef = useRef();

  const [clickedCategory, setClickedCategory] = useState(null);
  const CategoriesData = [
    "Tops",
    "Bottoms",
    "Outerwear",
    "Dresses",
    "Bag",
    "Footwear",
    "Accessories",
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch_board_with_id("aesthetic_board_outfits_jan16_1_16_01_2023_sakshi");
  }, []);

  console.log("outfitboard", outfitboard);
  const handleClick = () => {
    // for (var product in outfitboard[0]?.products) {
    //   var category = outfitboard[0]?.products[product];
    //   if (
    //     category[0]?.url.length !== 0
    //     //  &&
    //     // data.map(
    //     //   (item) => item.url == category[0]?.url[0] && item.category == product
    //     // ).length == 0
    //   ) {
    //     // console.log({ category: product, url: category[0]?.url[0] });
    //     dispatch(sendData({ category: product, url: category[0]?.url[0] }));
    //   }
    // }
    console.log("data send", data);
    // setDone(true);
    navigate("/finalPage");
  };
  console.log("data send", data);

  console.log(dataForBackend);

  return (
    <div className="bg-white overflow-hidden flex justify-center  p-4 w-screen h-screen">
      <div className="flex">
        <div>
          <button
            onClick={() => {
              modalRef.current.open();
              // fetch_board_with_id();
            }}
            className="text-blue-500 font-semibold text-xl shadow-md rounded-full p-2 hover:opacity-80"
          >
            {!images ? "Upload Photo" : "Update Photo"}
          </button>
          <Modal ref={modalRef}>
            <UploadSection modalRef={modalRef} />
          </Modal>
          <div className="m-4 flex">
            {images && (
              <img
                src={images?.url}
                alt=""
                className="h-[400px] w-[400px] rounded-xl object-contain shadow-xl hover:opacity-90 cursor-pointer"
                onClick={() => pickcolorRef.current.open()}
              />
            )}
          </div>
          <Modal ref={pickcolorRef}>
            <ColorPicker id={images?.id} />
          </Modal>
        </div>
        <div>
          {images ? (
            <div className="inline-grid grid-cols-4 gap-4 mt-4 p-4 text-center ">
              {CategoriesData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      data?.filter((val) => val.category === item.toLowerCase())
                        .length !== 0
                        ? // selectedCategory?.includes(item)
                          "rounded-full p-1  flex items-center justify-center font-semibold cursor-pointer hover:opacity-80 shadow-xl bg-green-500 text-white"
                        : "rounded-full p-1  flex items-center justify-center font-semibold cursor-pointer hover:opacity-80 shadow-xl"
                    }
                    onClick={() => {
                      setClickedCategory(item);
                      // if (data.length !== 0) {
                      // dispatch(
                      //   clearData(
                      //     data?.filter(
                      //       (val) => val.category !== item.toLowerCase()
                      //     )
                      //   )
                      // );
                      dispatch(clearData(item.toLowerCase()));
                      // }
                      searchRef.current.open();
                      // update_board(item.toLowerCase());
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <Modal ref={searchRef}>
            <Search
              id={images?.id}
              clickedCategory={clickedCategory}
              setClickedCategory={setClickedCategory}
              url={images?.url}
              searchRef={searchRef}
              setProducts={setProducts}
            />
          </Modal>
          {images && (
            <div className="w-[400px] flex justify-center mt-4">
              <button
                className="bg-blue-500 px-4 py-2  text-white text-xl rounded-full text-center font-semibold hover:opacity-90"
                onClick={handleClick}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  outfitboard: state.recreateLook.outfitboard,
  data: state.recreateLook.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetch_board_with_id: (id) => dispatch(fetch_board_with_id(id)),
  update_board: (category) => dispatch(update_board(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecreateLook);
