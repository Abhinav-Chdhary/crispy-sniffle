import React from "react";
import SnakeGame from "../components/SnakeGame";
import Navigation from "../components/Navigation";

export default function GamePage() {
  return (
    <>
      <Navigation />
      <SnakeGame
        snakeColor='green'
        appleColor='red'
        percentageWidth={50}
        startSnakeSize={6}
      />
    </>
  );
}
