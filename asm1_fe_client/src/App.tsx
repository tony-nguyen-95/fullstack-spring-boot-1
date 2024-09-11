import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Login, PostDetail, Posts, Register, Tours } from "./pages";
import { TourDetail } from "./pages/tour-detail/tour-detail.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:tourId" element={<TourDetail />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
