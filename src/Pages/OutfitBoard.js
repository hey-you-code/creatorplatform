import React, { useState } from "react";
import IntrestingItems from "../components/IntrestingItems";

function OutfitBoard() {
  const buttons = ["Intresting Items", "Fetch Inspiration"];

  const [clickedTab, setClickedTab] = useState(null);

  const handleClick = (item) => {
    setClickedTab(item);
  };
  return (
    <div>
      <div className="flex w-screen justify-center space-x-4">
        {buttons.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={
              clickedTab === item
                ? "px-5 py-2 border-[1px] text-white font-semibold border-black/8 bg-blue-500"
                : " px-5 py-2  border-[1px] font-semibold border-black/8 "
            }
          >
            {item}
          </button>
        ))}
      </div>
      {clickedTab === "Intresting Items" ? <IntrestingItems /> : <></>}
    </div>
  );
}

export default OutfitBoard;
