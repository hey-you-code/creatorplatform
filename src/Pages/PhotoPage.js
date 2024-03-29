import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import Modal from "../components/Modal";
import { finalColor, finalizedFile } from "../store/pictureSlice";
import productData from "../store/data/products.json";

import { dataToBackend, imageUrls } from "../store/recreateSilce";
import Tabs from "../components/Tabs";

function PhotoPage({ setDone }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef();
  const finalFiles = useSelector(finalizedFile);
  const finalColors = useSelector(finalColor);
  const [val, setVal] = useState(0);
  const images = useSelector(imageUrls);
  const dataFromBackend = useSelector(dataToBackend);

  const handleSubmit = () => {
    if (!finalColors) return;
    navigate(`/search?colorPatch=${finalColors}`);
  };

  useEffect(() => {
    console.log(productData);
    console.log(images);
    console.log(dataFromBackend);
  }, []);

  const handleChange = (e, val) => {
    setVal(val);
  };

  return (
    <div className=" flex justify-center">
      <Tabs setDone={setDone} />
      <button className="text-2xl border-[1px] border-black/10 absolute bottom-10 p-2  bg-blue-500 rounded-xl text-white text-semibold ">
        Submit Data
      </button>
    </div>
  );
}

export default PhotoPage;
