import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { finalizedFile } from "../store/pictureSlice";

function PhotoGallery() {
  const finalFiles = useSelector(finalizedFile);
  console.log(finalFiles);
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center">
      <div className="inline-grid grid-cols-3 gap-4 mt-4  max-w-3xl p-4">
        {finalFiles?.map((item, index) => (
          <div key={index} className="w-full relative object-cover">
            <img
              src={item.url}
              className="h-[200px] w-[200px] cursor-pointer hover:opacity-80 object-contain shadow-xl rounded-xl"
              onClick={() => {
                navigate(`/pickcolor/${item.id}`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
