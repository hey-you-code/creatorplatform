import React from "react";
import PhotoGallery from "../components/PhotoGallery";
import UploadPhotos from "../components/UploadPhotos";

function HomePage() {
  return (
    <div className="bg-white overflow-hidden h-screen w-screen">
      <UploadPhotos />
      <PhotoGallery />
    </div>
  );
}

export default HomePage;
