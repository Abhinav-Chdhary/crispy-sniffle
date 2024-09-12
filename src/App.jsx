import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "../src/pages/GamePage";
import LeaderBoard from "../src/pages/LeaderBoard";
import About from "../src/pages/About";
import { AuthProvider } from "../src/context/AuthContext";
import LoginPage from "../src/pages/LoginPage";
import PrivateRoute from "../src/components/PrivateRoute";
import SignUpPage from "../src/pages/SignUpPage";

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
