import React from 'react'
import SnakeGame from '../components/SnakeGame'

export default function GamePage() {
  return (
    <SnakeGame
        snakeColor='green'
        appleColor='red'
        percentageWidth={50}
        startSnakeSize={6}
      />
  )
}
