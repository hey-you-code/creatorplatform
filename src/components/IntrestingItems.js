import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CategoriesData } from "./CategoriesData";
import intrestingData from "../store/data/IntrestingItemsData.json";

function IntrestingItems() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClick = () => {
    setImage(intrestingData.filter((item) => item.category == category));
  };

  console.log(image);

  return (
    <div className="p-4 space-y-4 flex justify-center max-w-7xl h-screen w-screen mx-auto">
      <div className="grid grid-cols-5 w-screen">
        <div className="col-span-1">
          <div>
            <FormControl variant="standard" className="w-[200px]">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {CategoriesData.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <button
            //   disabled={!category}
            className="font-semibold px-5 py-2 text-xl border-[1px] border-black/10 mt-[50px] hover:bg-black hover:text-white "
            onClick={handleClick}
          >
            Fetch Intresting
          </button>
          {selectedImage ? (
            <button
              className="font-semibold px-5 py-2 text-xl border-[1px] border-black/10 mt-[50px] hover:bg-black hover:text-white "
              onClick={() => console.log("selected Image", selectedImage)}
            >
              Done
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-[100px] col-span-3">
          <div className="grid grid-cols-4  gap-x-[2px] gap-y-[2px]">
            {image &&
              image.map((item, index) => (
                <img
                  onClick={() => {
                    if (selectedImage == item.url) {
                      setSelectedImage(null);
                    } else {
                      setSelectedImage(item.url);
                    }
                  }}
                  key={index}
                  className={
                    selectedImage == item.url
                      ? "rounded-xl opacity-60 cursor-pointer object-cover"
                      : "rounded-xl cursor-pointer object-cover"
                  }
                  src={item.url}
                  alt=""
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntrestingItems;
