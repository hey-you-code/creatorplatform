import React, { useState } from "react";

function ProductForms() {
  const products = [
    {
      category: "Top",
      brand: "ONLY",
      Title: "Women Black & Pink Striped Sweater",
      price: 400,
      primaryImage:
        "https://assets.myntassets.com/q_90/v1/assets/images/15706194/2022/9/27/fa17cfc0-8922-46b9-8321-469cd587059c1664272901794ONLYWomenBlackPinkStripedSweater1.jpg",

      imageLists: [
        "https://assets.myntassets.com/q_90/v1/assets/images/15706194/2022/9/27/fa17cfc0-8922-46b9-8321-469cd587059c1664272901794ONLYWomenBlackPinkStripedSweater1.jpg",
        "https://assets.myntassets.com/q_90/v1/assets/images/15706194/2022/9/27/023c303a-78aa-4c31-ac3c-ce3ec895b0191664272901804ONLYWomenBlackPinkStripedSweater2.jpg",
        "https://assets.myntassets.com/q_90/v1/assets/images/15706194/2022/9/27/c590be40-c3cd-4fb0-8212-2dc7af45696f1664272901813ONLYWomenBlackPinkStripedSweater3.jpg",
        "https://assets.myntassets.com/q_90/v1/assets/images/15706194/2022/9/27/fa17cfc0-8922-46b9-8321-469cd587059c1664272901794ONLYWomenBlackPinkStripedSweater1.jpg",
      ],
    },
  ];

  const [urls, setUrls] = useState({
    brand: products?.filter((items) => items.category == "Top")[0].brand,
    title: products?.filter((items) => items.category == "Top")[0].Title,
    price: products?.filter((items) => items.category == "Top")[0].price,
  });

  const { brand, title, price } = urls;

  return (
    <div className="flex">
      <div className=" mt-4 space-y-4 max-w-3xl justify-center bg-gray-100 p-4">
        <div className="flex space-x-4 items-center">
          <div className="text-xl font-bold">Product Url</div>
          <input
            value={brand}
            type="text"
            onChange={(e) => setUrls(e.target.value)}
            className="px-4 py-3 border-gray-400 border-[1px] hover:shadow-lg focus-within:shadow-lg outline-none rounded-full"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-xl font-bold">Title</div>
          <input
            value={title}
            type="text"
            className="px-4 py-3 border-gray-400 border-2 hover:shadow-lg focus-within:shadow-lg outline-none rounded-full"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-xl font-bold">Brand</div>
          <input
            value={price}
            type="text"
            className="px-4 py-3 border-gray-400 border-2 hover:shadow-lg focus-within:shadow-lg outline-none rounded-full"
          />
        </div>
      </div>
      <div className="flex">
        <img
          src={
            products?.filter((items) => items.category == "Top")[0].primaryImage
          }
          alt=""
          className="w-[400px] h-[400px] object-contain"
        />
        <div className="inline-grid grid-cols-3 gap-1">
          {products
            ?.filter((items) => items.category == "Top")[0]
            .imageLists.map((item, index) => (
              <img src={item} className="w-[200px] h-[200px] object-contain" />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductForms;
