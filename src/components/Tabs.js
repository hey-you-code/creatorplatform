import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import { dataToBackend, imageUrls } from "../store/recreateSilce";
import TabContents from "./TabContents";
import productDetails from "../store/data/products.json";
import {
  fetch_board_with_id,
  send_outfit_board,
  updateBoard,
  updateSearchAndUrl,
  update_board,
} from "../store/recreateLookSlice";

function Tabs({
  outfitboard,
  fetch_board_with_id,
  data,
  send_outfit_board,
  setDone,
}) {
  const dataFromBackend = useSelector(dataToBackend);
  console.log(dataFromBackend);
  const [clickedTab, setClickedTab] = useState("");
  const [doneCliked, setDoneCliked] = useState(false);
  // const productData = useSelector(imageUrls);
  // const [content, setContent] = useState(
  //   productData.filter((val) => val.searchContext.category === "tops")
  // );
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [imageList, setImageList] = useState(null);

  useEffect(() => {
    setClickedTab(data[0].category);
    const productdata = productDetails.filter(
      (val) => val.product_url === data[0].url
    );
    console.log("data :", productdata);

    // if (productdata.length !== 0) {
    setTitle(
      outfitboard[0].products[data[0].category][0].title ||
        productdata[0]?.Title
    );
    setPrice(
      outfitboard[0].products[data[0].category][0].price ||
        productdata[0]?.Price
    );
    setBrand(
      outfitboard[0].products[data[0].category][0].brand ||
        productdata[0]?.brand
    );
    setImageList(productdata[0]?.Image_List);
    setPrimaryImage(productdata[0]?.product_url || data[0].url);
    // } else {
    //   setTitle(outfitboard[0].products[data[0].category][0].title);
    //   setPrice(outfitboard[0].products[data[0].category][0].price);
    //   setBrand(outfitboard[0].products[data[0].category][0].brand);
    //   setImageList(null);
    //   setPrimaryImage(data[0].url);
    // }
  }, []);

  const handleClick = (item) => {
    setClickedTab(item.category);
    // setContent(
    //   productData.filter((val) => val.searchContext.category === item.category)
    // );
    // const details = productData.filter((item) => item.response.url == item.url);

    const productdata = productDetails.filter(
      (val) => val.product_url === item.url
    );
    console.log("data :", productdata);

    // if (productdata.length !== 0) {

    // } else {
    //   setTitle(outfitboard[0].products[item.category][0].title);
    //   setPrice(outfitboard[0].products[item.category][0].price);
    //   setBrand(outfitboard[0].products[item.category][0].brand);
    //   setImageList(null);
    //   setPrimaryImage(item.url);
    // }

    // if (doneCliked && clickedTab === item.category) {
    setTitle(
      outfitboard[0].products[item.category][0]?.title ||
        productdata[0]?.Title ||
        ""
    );
    setPrice(
      outfitboard[0].products[item.category][0]?.price ||
        productdata[0]?.Price ||
        ""
    );
    setBrand(
      outfitboard[0].products[item.category][0]?.brand ||
        productdata[0]?.brand ||
        ""
    );
    setImageList(null);
    setPrimaryImage(
      outfitboard[0].products[item.category][0]?.url[0] || item.url
    );
    // } else {
    //   setTitle(productdata[0]?.Title);
    //   setPrice(productdata[0]?.Price);
    //   setBrand(productdata[0]?.brand);
    //   setImageList(productdata[0]?.Image_List);
    //   setPrimaryImage(productdata[0]?.product_url || item.url);
    // }

    console.log(outfitboard[0].products[item.category][0]);
  };

  const handleDone = () => {
    send_outfit_board(
      clickedTab.toLowerCase(),
      title,
      price,
      brand,
      primaryImage
    );
    setDoneCliked(true);
    // setTitle(outfitboard[0].products[clickedTab][0].title);
    // setPrice(outfitboard[0].products[clickedTab][0].price);
    // setBrand(outfitboard[0].products[clickedTab][0].brand);
  };

  // useEffect(() => {
  //   fetch_board_with_id();
  // }, []);

  console.log("outfitboard", outfitboard);
  console.log("data", data);

  // console.log(content);
  console.log("Title:", title);
  return (
    <div className="">
      <div className="space-x-2 flex w-screen justify-center">
        {/* <button
          className="absolute left-10 font-semibold"
          onClick={() => {
            setDone(false);
          }}
        >
          Back
        </button> */}
        {data?.map((item) => (
          <>
            <button
              onClick={() => handleClick(item)}
              key={item.category}
              className={
                clickedTab === item.category
                  ? "px-5 py-2 border-[1px] text-white font-semibold border-black/8 bg-black"
                  : " px-5 py-2  border-[1px] font-semibold border-black/8 "
              }
            >
              {item.category.toUpperCase()}
            </button>
          </>
        ))}
      </div>
      {/* {title} */}
      {/* <TabContents
        // content={content}
        clickedTab={clickedTab}
        title={title}
        price={price}
        brand={brand}
        imageList={imageList}
        primaryImage={primaryImage}
        setTitle={setTitle}
        setPrice={setPrice}
        setBrand={setBrand}
        setImageList={setImageList}
        setPrimaryImage={setPrimaryImage}
      /> */}
      <div className=" w-screen h-full m-4 p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-5 max-w-7xl h-full  mx-auto">
          <div className="mr-2 space-y-4 col-span-2">
            <div className="grid grid-cols-3  gap-y-4">
              <span className="text-3xl items-center font-semibold">Title</span>
              <input
                value={title}
                type="text"
                className="outline-none  px-1 py-2 border-[1px] border-black/10 col-span-2 "
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="text-3xl font-semibold"> Brand</span>
              <input
                value={brand}
                type="text"
                className="outline-none px-1 py-2 border-[1px] border-black/10 col-span-2 "
                onChange={(e) => setBrand(e.target.value)}
              />
              <span className="text-3xl font-semibold">Price</span>
              <input
                value={price}
                type="text"
                className="outline-none px-1 py-2 border-[1px] border-black/10 col-span-2"
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="text-2xl font-semibold">Primary Image</span>
              <input
                value={primaryImage}
                type="text"
                className="outline-none px-1 py-2 border-[1px] border-black/10 col-span-2"
                onChange={(e) => setPrimaryImage(e.target.value)}
              />
              <div></div>

              <button
                className="text-2xl border-[1px] border-black/10 my-[100px]  bg-black text-white text-semibold"
                onClick={handleDone}
              >
                Done
              </button>

              <div></div>

              
            </div>
          </div>
          <div className="col-span-3 overflow-y-auto h-screen mb-4">
            <div className="grid grid-cols-4 gap-x-[2px] gap-y-[2px]">
              <img
                src={primaryImage}
                alt=""
                className="object-cover  rounded-xl row-span-2 col-span-2"
              />
              {imageList?.map((item, index) => (
                <img
                  onClick={() => setPrimaryImage(item)}
                  src={item}
                  key={index}
                  className="object-cover  rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        {/* Images */}
      </div>

      {/* Content */}
      {/* Form */}
      {/* Images */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  outfitboard: state.recreateLook.outfitboard,
  data: state.recreateLook.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetch_board_with_id: () => dispatch(fetch_board_with_id()),
  send_outfit_board: (category, title, price, brand, primaryImage) =>
    dispatch(send_outfit_board(category, title, price, brand, primaryImage)),
  // update_board: (category) => dispatch(update_board(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
