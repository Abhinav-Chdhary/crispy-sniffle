import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import "./LeaderBoard.css";
const apiUrl = import.meta.env.VITE_API_URL;

export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);

  const getListOfTopScorers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/leaderboardList`, {
        method: "GET",
      });
      const data = await response.json();
      setLeaders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfTopScorers();
  }, []);

  return (
    <>
      <Navigation />
      <div className='leaderboard-container'>
        <h1>LeaderBoard</h1>
        {leaders.length > 0 ? (
          <ul className='leaderboard-list'>
            {leaders.map((leader, index) => (
              <li key={index} className='leaderboard-item'>
                <span className='leader-username'>{leader.username}</span>:{" "}
                <span className='leader-score'>{leader.highScore}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='no-leaders-message'>Please come back later</p>
        )}
      </div>
    </>
  );
}
