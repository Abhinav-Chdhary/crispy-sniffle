import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${apiUrl}/api/updateHighScore`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, highScore }),
      });
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
    <div
      className={`flex flex-col items-center justify-center bg-gray-800 text-white shadow-lg p-6`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-xl mb-2">Your score: {score}</p>
      {newHighScore && (
        <p className="text-2xl text-yellow-400 font-semibold mb-4">
          New high score: {highScore}!
        </p>
      )}
      <p className="text-lg italic">Press Space to play again</p>
    </div>
  );
}
