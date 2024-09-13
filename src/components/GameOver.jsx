import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./GameOver.css";

export default function GameOver({
  width,
  height,
  highScore,
  newHighScore,
  score,
}) {
  const { auth, login } = useAuth();
  const username = auth.user.username;

  const handleUpdateHighScore = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/updateHighScore",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, highScore }),
        }
      );
      const data = await response.json();
      if (data.success) console.log("High Score Updated");
      login({ username, highScore });
    } catch (error) {
      console.log("Failed Update");
    }
  };
  useEffect(() => {
    if (newHighScore) {
      handleUpdateHighScore();
    }
  }, []);

  return (
    <div className='GameOver' style={{ width, height }}>
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      {newHighScore && <p>New high score: {highScore}!</p>}
      <p>Press Space to play again</p>
    </div>
  );
}
