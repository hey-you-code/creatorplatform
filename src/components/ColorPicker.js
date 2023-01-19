import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useMatch, useMatches, useParams } from "react-router-dom";
import { finalizedFile, setFinalColor } from "../store/pictureSlice";
import { image_to_recreate, setColor } from "../store/recreateSilce";

function ColorPicker({ modalRef, id, pickcolorRef }) {
  // const match = useMatches();
  // console.log(match);
  const finalFiles = useSelector(finalizedFile);
  const images = useSelector(image_to_recreate);
  const dispatch = useDispatch();
  const canvas = useRef(null);
  const color = useRef(null);
  const [colorcode, setColorcode] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [values, setValues] = useState({
    x: window.innerWidth / 8,
    y: window.innerHeight / 8,
    targetX: 0,
    targetY: 0,
  });

  const { x, y, targetX, targetY } = values;
  console.log("windowx startX:", window.innerWidth / 8);
  console.log("windowx startY:", y);
  const [image, setImage] = useState(null);
  const [coordinate, setCoordinate] = useState({
    xcoordinate: 0,
    ycoordinate: 0,
  });

  //   console.log(finalFiles?.filter((items) => items.id === id)[0]?.url);

  //   useEffect(() => {
  //     //     const img = new Image();
  //     //     const imageSrc = finalFiles?.filter((items) => items.id === id)[0].url;
  //     //     console.log("src:",imageSrc);
  //     //     img.src = {imageSrc};
  //     // img.onload = () =>
  //       setImage(finalFiles?.filter((items) => items.id === id)[0]?.url);
  //     //   img.crossOrigin = "Anonymous";
  //   }, []);

  //   console.log(image);

  useEffect(() => {
    if (canvas) {
      // canvas.current.width=600;
      // canvas.current.height=400;
      const img = new Image();
      if (window.location.pathname == "/recreate") {
        img.src = images?.url;
        console.log("image src:", img.src);
      } else {
        img.src = finalFiles?.filter((items) => items.id === id)[0]?.url;
      }

      const ctx = canvas.current.getContext("2d");
      //   ctx.fillStyle = "black";
      //   ctx.fillRect(0, 0, 400, 256 + 80);
      img.onload = () => {
        // let w = canvas.current.width;
        // console.log("w:", w);
        // let nw = img.naturalWidth;
        // let nh = img.naturalHeight;
        // let aspect = nw / nh;
        // let h = w / aspect;
        // console.log("h:", h);

        // canvas.current.height = h;
        // canvas.current.width = w;

        ctx.drawImage(img, 0, 0, 400, 400);
        // console.log("canvas height:", canvas.current.height);
        // console.log("canvas width:", canvas.current.width);
      };
      img.crossOrigin = "Anonymous";

      setValues({
        ...values,
        x: x + canvas.current.offsetLeft,
        y: y + canvas.current.offsetTop,
      });
    }
  }, [canvas]);

  console.log("x=", x);
  console.log("y=", y);
  const convertToHex = (value) => {
    var hex = value.toString(16);
    if (value < 16) {
      hex = "0" + hex;
    }
    return hex;
  };

  const mouseMove = (e) => {
    setValues({
      ...values,
      targetX: e.pageX - window.innerWidth / 8,
      targetY: e.pageY - window.innerHeight / 8,
    });
    setCoordinate({ xcoordinate: targetX, ycoordinate: targetY });
    // console.log(e.pageX-x, e.pageY-y);
    // console.log(x, y)
    const context = e.target.getContext("2d");
    const pixelData = context.getImageData(targetX, targetY, 1, 1).data;
    const hex =
      "#" +
      convertToHex(pixelData[0]) +
      convertToHex(pixelData[1]) +
      convertToHex(pixelData[2]);
    // console.log(hex);

    setColorcode(hex);
    color.current.style.backgroundColor = hex;
  };

  return (
    <div className="h-full w-full lg:flex lg:space-x-8">
      <div className="">
        <canvas
          id="canvas"
          ref={canvas}
          width={400}
          height={400}
          onMouseMove={mouseMove}
          onClick={() => {
            navigator.clipboard.writeText(colorcode);
            setSelectedColor(colorcode);
          }}
          className=" cursor-crosshair rounded-xl"
        />

        {/* <div className="w-full relative object-cover">
        <img
          src={finalFiles?.filter((items) => items.id === id)[0].url}
          className="h-[200px] w-[200px] cursor-pointer hover:opacity-80 object-contain bg-gray-200 rounded-xl"
        />
      </div> */}
        {/* x and y coordinate of the mouse in the current state */}
        {/* <div>
        <h2>x: {coordinate.xcoordinate}</h2>
        <h2>y: {coordinate.ycoordinate}</h2>
      </div> */}

        <div className="font-bold text-xl lg:text-3xl absolute top-0 right-0 m-4">
          Pick Color
        </div>

        <div className="p-4 m-2 flex  items-center space-x-2">
          <div ref={color} className="w-8 h-8 rounded-md"></div>
          <div className="text-black text-xl font-bold">{colorcode}</div>
        </div>
      </div>
      <div className="h-full w-full  flex m-4 justify-center">
        <div className="">
          <h1 className="font-semibold text-2xl mb-1.5">Color Selected</h1>
          {selectedColor ? (
            <div className="flex space-x-2 justify-center">
              <div
                style={{
                  backgroundColor: `${selectedColor}`,
                  // color: `${selectedColor}`,
                }}
                className="w-8 h-8 rounded-md "
              ></div>
              <h2
                style={
                  {
                    // backgroundColor: `${selectedColor}`,
                    // color: `${selectedColor}`,
                  }
                }
                className="font-bold text-lg"
              >
                {selectedColor}
              </h2>
            </div>
          ) : (
            <div className="font-bold text-lg">none</div>
          )}

          <div
            className="mt-4 text-xl font-semibold bg-blue-500 flex justify-center p-1.5 rounded-full hover:opacity-90 text-white cursor-pointer "
            onClick={() => {
              if (window.location.pathname == "/recreate") {
                pickcolorRef.current.close();
                dispatch(setColor(selectedColor));
              }
              if (window.location.pathname == `/pickcolor/${id}`) {
                modalRef.current.close();
                dispatch(setFinalColor(selectedColor));
              }
              // if (match && matchPath === "/pickcolor/:id") {
              //   modalRef.current.close();
              //   dispatch(setFinalColor(selectedColor));
              // }
            }}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
