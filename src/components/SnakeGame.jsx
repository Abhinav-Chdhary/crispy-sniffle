import React from "react";
import GameOver from "./GameOver";
import { useSnakeGameLogic } from "../util/useSnakeGameLogic";

function SnakeGame({
  snakeColor,
  appleColor,
  percentageWidth,
  startSnakeSize,
}) {
  const {
    width,
    height,
    blockWidth,
    blockHeight,
    snake,
    apple,
    score,
    highScore,
    newHighScore,
    isGameOver,
    handleKeyDown,
  } = useSnakeGameLogic(
    snakeColor,
    appleColor,
    percentageWidth,
    startSnakeSize
  );
  // Effect to handle keyboard input
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Render the game board
  return (
    <div
      id='GameBoard'
      className=' relative m-auto border-2 border-black'
      style={{
        width: width+4,
        height: height+4,
      }}
    >
      {isGameOver ? (
        <>
          <GameOver
            width={width}
            height={height}
            highScore={highScore}
            newHighScore={newHighScore}
            score={score}
          />
        </>
      ) : (
        <>
          {snake.map((snakePart, index) => (
            <div
              key={index}
              className='absolute'
              style={{
                width: blockWidth,
                height: blockHeight,
                left: snakePart.Xpos,
                top: snakePart.Ypos,
                backgroundColor: snakeColor,
              }}
            />
          ))}
          <div
            className='absolute'
            style={{
              width: blockWidth,
              height: blockHeight,
              left: apple.Xpos,
              top: apple.Ypos,
              backgroundColor: appleColor,
            }}
          />
          <div
            id='Score'
            className='relative top-full text-center font-bold text-4xl'
            
          >
            HIGH-SCORE: {highScore} &emsp; SCORE: {score}
          </div>
        </>
      )}
    </div>
  );
}

export default SnakeGame;
