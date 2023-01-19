import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./Pages/HomePage";
import OutfitBoard from "./Pages/OutfitBoard";
import PhotoPage from "./Pages/PhotoPage";
import RecreateLook from "./Pages/RecreateLook";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <div className="bg-white overflow-hidden  h-screen w-screen">
      <div className="flex justify-center  sticky  flex">
        <NavBar />
      </div>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/finalPage" element={<PhotoPage />} />
        <Route path="/recreate" element={<RecreateLook />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/outfit" element={<OutfitBoard />} />
      </Routes>
    </div>
  );
}

export default App;
