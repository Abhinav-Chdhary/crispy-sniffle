import React from 'react';

function GameOver({ width, height, highScore, newHighScore, score }) {
  return (
    <div className="GameOver" style={{ width, height }}>
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      {newHighScore && <p>New high score: {highScore}!</p>}
      Press Space to play again
    </div>
  );
}

export default GameOver;
