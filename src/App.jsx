import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import HotelPage from "./HotelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:hotelId" element={<HotelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
