import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataToBackend, imageUrls } from "../store/recreateSilce";
import TabContents from "./TabContents";
import productDetails from "../store/data/products.json";

function Tabs() {
  const dataFromBackend = useSelector(dataToBackend);
  console.log(dataFromBackend);
  const [clickedTab, setClickedTab] = useState("Top");
  const productData = useSelector(imageUrls);
  const [content, setContent] = useState(
    productData.filter((val) => val.searchContext.category === "Top")
  );
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState(null);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [imageList, setImageList] = useState(null);

  const handleClick = (item) => {
    setClickedTab(item.category);
    setContent(
      productData.filter((val) => val.searchContext.category === item.category)
    );
    const details = productData.filter((item) => item.response.url == item.url);

    const data = productDetails.filter((val) => val.product_url == item.url);
    setTitle(data[0]?.Title);
    setPrice(data[0]?.Price);
    setBrand(data[0]?.brand);
    setImageList(data[0]?.Image_List);
    setPrimaryImage(data[0]?.product_url);
  };

  console.log(content);
  console.log("Title:", title);
  return (
    <div className="">
      <div className="space-x-2 flex w-screen justify-center">
        {dataFromBackend?.map((item) => (
          <button
            onClick={() => handleClick(item)}
            key={item.category}
            className={
              clickedTab === item.category
                ? "px-5 py-2 border-[1px] text-white font-semibold border-black/8 bg-black"
                : " px-5 py-2  border-[1px] font-semibold border-black/8 "
            }
          >
            {item.category}
          </button>
        ))}
      </div>
      {/* {title} */}
      <TabContents
        content={content}
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
      />

      {/* Content */}
      {/* Form */}
      {/* Images */}
    </div>
  );
}

export default Tabs;
