import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function RecreateLook() {
  const navigate = useNavigate();
  const images = useSelector(image_to_recreate);
  const selectedCategory = useSelector(selectedCategories);
  const categoriesSelected = useSelector(searchedCategories);
  const imageUrl = useSelector(imageUrls);
  const dataForBackend = useSelector(dataToBackend)
  const dispatch = useDispatch();
  console.log(images);
  const modalRef = useRef();
  const pickcolorRef = useRef();
  const searchRef = useRef();
  const [clickedCategory, setClickedCategory] = useState(null);
  const CategoriesData = [
    "Top",
    "Bottom",
    "Outerwear",
    "Dresses",
    "Bag",
    "Footwear",
    "Accessories",
  ];

  const [products, setProducts] = useState([]);

  // const [dataToBackend, setDataToBackened] = useState([]);

  //   const [selectedChips, setSelectedChips] = useState([]);

  //   useEffect(() => {
  //     dispatch(setSelectedCategories([...selectedChips]));
  //   }, [selectedChips]);

  //   console.log(selectedCategory);
  // console.log(categoriesSelected);
  // categoriesSelected?.map((val) => console.log(val?.part));
  // console.log(products);
  const handleClick = () => {
    // const data = {
    //   context: {
    //     image: images?.url.slice(0, 100) + "...",
    //     Title: "LET'S MAKE A SEXY OUTFIT",
    //   },
    //   Products: imageUrl,
    // };
    // const jsonData = JSON.stringify(data);
    // console.log(jsonData);

    // imageUrl.map((item) => {
    //   console.log(item.response.url);
    //   console.log(item.searchContext.category);
    // });

    // imageUrl.map((item) => {

    // });

    navigate("/finalPage");
  };

  console.log(dataForBackend);

  return (
    <div className="bg-white overflow-hidden flex justify-center  p-4 w-screen h-screen">
      <div className="flex">
        <div>
          <button
            onClick={() => modalRef.current.open()}
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
                      selectedCategory?.includes(item)
                        ? 
                          "rounded-full p-1  flex items-center justify-center font-semibold cursor-pointer hover:opacity-80 shadow-xl bg-green-500 text-white"
                        : "rounded-full p-1  flex items-center justify-center font-semibold cursor-pointer hover:opacity-80 shadow-xl"
                    }
                    onClick={() => {
                      setClickedCategory(item);
                      searchRef.current.open();
    
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

export default RecreateLook;
