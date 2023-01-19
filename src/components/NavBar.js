import React from "react";
import { useNavigate } from "react-router-dom";
import PhotoGallery from "./PhotoGallery";
import { NavBarData } from "./NavBarData";
import UploadPhotos from "./UploadPhotos";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="flex w-screen  p-4 items-center">
      <div className="flex-1 text-2xl font-bold">Creator Platform</div>
      {NavBarData.map((item, index) => {
        return (
          <div
            className={
              window.location.pathname == item.link
                ? "p-4   rounded-xl  text-blue-500 font-semibold text-xl cursor-pointer flex justify-center"
                : "p-4   rounded-xl  text-black font-semibold text-xl cursor-pointer flex justify-center"
            }
            onClick={() => navigate(`${item.link}`)}
            key={index}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default NavBar;
