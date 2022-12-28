import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import Modal from "../components/Modal";
import { finalColor, finalizedFile } from "../store/pictureSlice";

function PhotoPage() {
  const { id } = useParams();
  const modalRef = useRef();
  const finalFiles = useSelector(finalizedFile);
  const finalColors = useSelector(finalColor);
  return (
    <div className="h-screen w-screen p-4 m-4 ">
      <div className=" mb-4">
        <img
          src={finalFiles?.filter((items) => items.id === id)[0].url}
          className="h-[400px] w-[400px] object-contain bg-gray-400 rounded-xl"
        />
      </div>
      <button
        className="font-bold text-xl bg-black hover:opacity-80 text-white p-2 rounded-full"
        onClick={() => modalRef.current.open()}
      >
        Pick Color
      </button>
      <Modal ref={modalRef}>
        <ColorPicker modalRef={modalRef} />
      </Modal>
      {finalColors ? (
        <div className="flex space-x-2 items-center mt-4">
          <div
            style={{
              backgroundColor: `${finalColors}`,
              // color: `${selectedColor}`,
            }}
            className="w-8 h-8 rounded-md "
          ></div>
          <h1
            style={
              {
                // color: `${finalColors}`
              }
            }
            className="text-xl font-bold "
          >
            {finalColors}
          </h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PhotoPage;
