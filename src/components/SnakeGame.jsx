import React from "react";
import "./SnakeGame.css";
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

  // // Render the game over screen if the game is over
  // if (isGameOver) {
  //   return (
  //     <GameOver
  //       width={width}
  //       height={height}
  //       highScore={highScore}
  //       newHighScore={newHighScore}
  //       score={score}
  //     />
  //   );
  // }

  // Render the game board
  return (
    <div
      id='GameBoard'
      style={{
        width: width,
        height: height,
        borderWidth: width / 50,
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
              className='Block'
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
            className='Block'
            style={{
              width: blockWidth,
              height: blockHeight,
              left: apple.Xpos,
              top: apple.Ypos,
              backgroundColor: appleColor,
            }}
          />
          <div id='Score' style={{ fontSize: width / 20 }}>
            HIGH-SCORE: {highScore} &emsp; SCORE: {score}
          </div>
        </>
      )}
    </div>
  );
}

export default SnakeGame;
