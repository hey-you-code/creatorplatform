import ColorPicker from "./components/ColorPicker";
import PhotoGallery from "./components/PhotoGallery";
import UploadPhotos from "./components/UploadPhotos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PhotoPage from "./Pages/PhotoPage";

function App() {
  return (
    <div className="bg-white overflow-hidden h-screen w-screen">
      <div className="flex justify-center p-4 sticky bg-black">
        <div className="text-white font-bold text-lg">Creator Platform</div>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pickcolor/:id" element={<PhotoPage />} />
      </Routes>
    </div>
  );
}

export default App;
