import React from "react";
import { useRef } from "react";
import Modal from "./Modal";
import UploadSection from "./UploadSection";

function UploadPhotos() {
  const modalRef = useRef();
  return (
    <div className="flex p-4 justify-center">
      <button
        className="p-4 bg-blue-500 mt-4 text-white rounded-xl shadow-lg"
        onClick={() => modalRef.current.open()}
      >
        Uplaod Photos
      </button>
      <Modal ref={modalRef}>
        <UploadSection modalRef={modalRef} />
      </Modal>
    </div>
  );
}

export default UploadPhotos;
