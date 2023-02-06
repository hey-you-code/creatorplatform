import React, { useState } from "react";
import ProductForms from "../components/ProductForms";
import PhotoPage from "./PhotoPage";
import RecreateLook from "./RecreateLook";

function SearchPage() {
  const [done, setDone] = useState(false);
  return (
    <div className="">
      {/* {!done ? (
        <RecreateLook setDone={setDone} />
      ) : (
        <PhotoPage setDone={setDone} />
      )} */}
    </div>
  );
}

export default SearchPage;
