import React from "react";
import SnakeGame from "../components/SnakeGame";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

export default function GamePage() {
  const { auth } = useAuth();

  return (
    <>
      <Navigation />
      <h1 className='text-4xl text-center font-bold py-2'>
        Username: {auth.user.username}
      </h1>

      <SnakeGame
        snakeColor='green'
        appleColor='red'
        percentageWidth={50}
        startSnakeSize={6}
      />
    </>
  );
}
