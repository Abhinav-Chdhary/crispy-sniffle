import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "../pages/GamePage";
import LeaderBoard from "../pages/LeaderBoard";
import About from "../pages/About";
import Navigation from "../components/Navigation";

export default function App() {
  return (
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route path='/' element={<GamePage />} />
          <Route path='/leaderboard' element={<LeaderBoard />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
