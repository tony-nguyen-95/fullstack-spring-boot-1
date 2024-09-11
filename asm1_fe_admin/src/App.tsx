import "./App.css";
import { Bookings, Posts, Tours, Users } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Redirect from root path "/" to "/users" */}
      <Route path="/" element={<Navigate to="/users" replace />} />

      <Route path="/users" element={<Users />} />

      <Route path="/tours" element={<Tours />} />

      <Route path="/bookings" element={<Bookings />} />

      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
