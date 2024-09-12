import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "../pages/GamePage";
import LeaderBoard from "../pages/LeaderBoard";
import About from "../pages/About";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import SignUpPage from "../pages/SignUpPage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/game' element={<PrivateRoute component={GamePage} />} />
          <Route
            path='/leaderboard'
            element={<PrivateRoute component={LeaderBoard} />}
          />
          <Route path='/about' element={<PrivateRoute component={About} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
