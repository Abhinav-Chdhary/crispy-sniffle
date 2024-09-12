import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' className="text-red-500 bg-black"> Game</Link>
        </li>

        <li>
          <Link to='/leaderboard'>Leaderboard</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
