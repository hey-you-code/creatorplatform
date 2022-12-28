import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
    finalizedFile,
  selectedFile,
  setFinalFile,
  setSelectedFile,
  updateFile,
} from "../store/pictureSlice";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

function UploadSection({ modalRef }) {
  const filePickerRef = useRef();
  
  const dispatch = useDispatch();
  //   const [selectedFile, setSelectedFile] = useState([]);
  const selectFiles = useSelector(selectedFile);
  const finalFiles = useSelector(finalizedFile)
  const addImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      if (e.target.files[i]) {
        reader.readAsDataURL(e.target.files[i]);
      }

      reader.onload = (readerEvent) => {
        dispatch(
          setSelectedFile({
            id: uuid(),
            url: readerEvent.target.result,
          })
        );
      };
    }
  };

  const handleDelete = (item) => {
    dispatch(updateFile(selectFiles.filter((items) => items.id !== item.id)));
  };

  const handleSubmit = (e) => {
    modalRef.current.close();
    dispatch(setFinalFile([...finalFiles, ...selectFiles]));
    dispatch(updateFile([]));
  };

  console.log(selectedFile);
  return (
    <div className="flex-col overflow-hidden p-4 relative w-full">
      <div className="flex justify-center">
        {/* <h1 className="font-bold text-red-600 flex justify-center bg-black p-2 w-32 hover:bg-red-600 hover:text-black active:bg-violet-700 rounded-full cursor-pointer">
        Upload
      </h1> */}
        <button
          type="button"
          className="inline-block px-6 py-4 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => filePickerRef.current.click()}
        >
          Upload
        </button>
        <input
          type="file"
          hidden
          multiple
          ref={filePickerRef}
          onChange={addImage}
        />
      </div>

      <div className="flex  justify-center mb-8">
        <div className="inline-grid grid-cols-3 gap-4 mt-4  max-w-3xl p-4">
          {selectFiles?.map((item, index) => (
            <div key={index} className="w-full relative object-cover">
              <CancelIcon
                className="text-red-600 text-lg absolute font-bold right-0 cursor-pointer"
                onClick={() => {
                  handleDelete(item);
                }}
              />
              <img
                
                src={item.url}
                className="h-32 w-32 object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
      {selectFiles.length != 0 ? (
        <div className="w-full flex justify-center mt-4">
          <button
            type="button"
            className="inline-block px-6 py-4 bg-black text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out "
            onClick={handleSubmit}
          >
            Finalize Selection
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UploadSection;
