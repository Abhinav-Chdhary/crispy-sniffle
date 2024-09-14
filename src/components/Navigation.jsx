import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <ul className="flex justify-around">
        <li>
          <Link
            to="/game"
            className="text-white text-lg hover:text-yellow-400 transition-colors duration-300"
          >
            Game
          </Link>
        </li>
        <li>
          <Link
            to="/leaderboard"
            className="text-white text-lg hover:text-yellow-400 transition-colors duration-300"
          >
            Leaderboard
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white text-lg hover:text-yellow-400 transition-colors duration-300"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
