import React from "react";
import SnakeGame from "../components/SnakeGame";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

export default function GamePage() {
  const { auth } = useAuth();

  return (
    <>
      <Navigation />
      <p>{auth.user.username}</p>
      <SnakeGame
        snakeColor='green'
        appleColor='red'
        percentageWidth={50}
        startSnakeSize={6}
      />
    </>
  );
}
