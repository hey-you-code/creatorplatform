import React, { useEffect, useState } from "react";
import productData from "../store/data/products.json";

function TabContents({
  // content,
  clickedTab,
  title,
  price,
  brand,
  setTitle,
  setPrice,
  setBrand,
  imageList,
  setImageList,
  primaryImage,
  setPrimaryImage,
}) {
  // const [data, setData] = useState(null);
  const [newtitle, setNewTitle] = useState(null);
  const [newprice, setNewPrice] = useState(null);
  const [newbrand, setNewBrand] = useState(null);
  // useEffect(() => {
  //   console.log(
  //     productData?.filter((item) => item.product_url == content[0].response.url)
  //   );

  //   const productDetails = productData?.filter(
  //     (item) => item.product_url == content[0].response.url
  //   );

  //   setTitle(productDetails[0]?.Title);
  //   setPrice(productDetails[0]?.Price);
  //   setBrand(productDetails[0]?.brand);
  //   setImageList(productDetails[0]?.Image_List);
  //   setPrimaryImage(productDetails[0]?.product_url);
  // }, []);

  const handleClick = () => {
    // setNewTitle(title);
    const data = {
      category: clickedTab,
      title: title,
      price: price,
      brand: brand,
      primaryImage: primaryImage,
      imageList: imageList,
    };

    console.log(data);
  };

  // console.log(data);
  console.log(imageList);

  return (
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
              onClick={handleClick}
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
  );
}

export default TabContents;
