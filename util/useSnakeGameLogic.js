import { useState, useCallback, useEffect } from "react";

export function useSnakeGameLogic(
  snakeColor,
  appleColor,
  percentageWidth = 40,
  startSnakeSize = 6
) {
  const [state, setState] = useState({
    width: 0,
    height: 0,
    blockWidth: 0,
    blockHeight: 0,
    gameLoopTimeout: 50,
    timeoutId: null,
    snake: [],
    apple: {},
    direction: "right",
    directionChanged: false,
    isGameOver: false,
    snakeColor: snakeColor,
    appleColor: appleColor,
    score: 0,
    highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
    newHighScore: false,
  });

  useEffect(() => {
    initGame();
    const gameLoop = setInterval(() => {
      if (!state.isGameOver) {
        moveSnake();
        checkAppleCollision();
        checkSelfCollision();
      }
    }, state.gameLoopTimeout);
    return () => clearInterval(gameLoop);
  }, [state.isGameOver, state.gameLoopTimeout]);

  const initGame = useCallback(() => {
    const gameBoard = document.getElementById("GameBoard");
    if (gameBoard) {
      const gameWidth =
        gameBoard.parentElement.offsetWidth * (percentageWidth / 100);
      const adjustedWidth = gameWidth - (gameWidth % 30);
      const width = adjustedWidth >= 30 ? adjustedWidth : 30;
      const height = (width / 3) * 2;
      const blockWidth = width / 30;
      const blockHeight = height / 20;

      const snake = [];
      const startX = width / 2;
      const startY = height / 2;
      snake.push({ Xpos: startX, Ypos: startY });
      for (let i = 1; i < startSnakeSize; i++) {
        snake.push({ Xpos: startX - i * blockWidth, Ypos: startY });
      }

      const apple = getRandomApplePosition(
        width,
        blockWidth,
        height,
        blockHeight,
        snake
      );

      setState((s) => ({
        ...s,
        width,
        height,
        blockWidth,
        blockHeight,
        snake,
        apple,
      }));
    }
  }, [percentageWidth, startSnakeSize]);

  const moveSnake = useCallback(() => {
    setState((prevState) => {
      const newSnake = [...prevState.snake];
      let newX = newSnake[0].Xpos;
      let newY = newSnake[0].Ypos;

      switch (prevState.direction) {
        case "right":
          newX += prevState.blockWidth;
          break;
        case "left":
          newX -= prevState.blockWidth;
          break;
        case "down":
          newY += prevState.blockHeight;
          break;
        case "up":
          newY -= prevState.blockHeight;
          break;
        default:
          break;
      }

      // Check boundaries
      newX =
        newX >= prevState.width
          ? 0
          : newX < 0
          ? prevState.width - prevState.blockWidth
          : newX;
      newY =
        newY >= prevState.height
          ? 0
          : newY < 0
          ? prevState.height - prevState.blockHeight
          : newY;

      newSnake.unshift({ Xpos: newX, Ypos: newY });
      newSnake.pop();

      return { ...prevState, snake: newSnake, directionChanged: false };
    });
  }, []);

  const checkAppleCollision = useCallback(() => {
    setState((prevState) => {
      const head = prevState.snake[0];
      const apple = prevState.apple;
      if (head.Xpos === apple.Xpos && head.Ypos === apple.Ypos) {
        // Extend snake by adding a new segment at the position of the current tail
        const tail = prevState.snake[prevState.snake.length - 1];
        const newTail = { Xpos: tail.Xpos, Ypos: tail.Ypos }; // Add to the actual tail
        const newSnake = [...prevState.snake, newTail];
        const newApple = getRandomApplePosition(
          prevState.width,
          prevState.blockWidth,
          prevState.height,
          prevState.blockHeight,
          newSnake
        );
        const newScore = prevState.score + 1;
        let newHighScore = prevState.highScore;
        let isNewHighScore = prevState.newHighScore;
        if (newScore > prevState.highScore) {
          newHighScore = newScore;
          isNewHighScore = true;
          localStorage.setItem("snakeHighScore", newHighScore);
        }

        return {
          ...prevState,
          snake: newSnake,
          apple: newApple,
          score: newScore,
          highScore: newHighScore,
          newHighScore: isNewHighScore,
        };
      } else {
        return prevState;
      }
    });
  }, []);

  const checkSelfCollision = useCallback(() => {
    setState((prevState) => {
      const [head, ...body] = prevState.snake;
      if (
        body.some((part) => part.Xpos === head.Xpos && part.Ypos === head.Ypos)
      ) {
        return { ...prevState, isGameOver: true };
      } else {
        return prevState;
      }
    });
  }, []);

  const handleKeyDown = useCallback((event) => {
    const { keyCode } = event;
    setState((prevState) => {
      if (prevState.isGameOver && keyCode === 32) {
        initGame(); // Reset game
        return {
          ...prevState,
          isGameOver: false,
          score: 0,
          newHighScore: false,
        };
      }
      if (prevState.directionChanged) return prevState;
      let newDirection = prevState.direction;
      if ((keyCode === 37 || keyCode === 65) && prevState.direction !== "right")
        newDirection = "left";
      if ((keyCode === 38 || keyCode === 87) && prevState.direction !== "down")
        newDirection = "up";
      if ((keyCode === 39 || keyCode === 68) && prevState.direction !== "left")
        newDirection = "right";
      if ((keyCode === 40 || keyCode === 83) && prevState.direction !== "up")
        newDirection = "down";

      return { ...prevState, direction: newDirection, directionChanged: true };
    });
  }, []);

  const getRandomApplePosition = (
    width,
    blockWidth,
    height,
    blockHeight,
    snake
  ) => {
    let appleX, appleY;
    do {
      appleX = Math.floor(Math.random() * (width / blockWidth)) * blockWidth;
      appleY = Math.floor(Math.random() * (height / blockHeight)) * blockHeight;
    } while (
      snake.some((part) => part.Xpos === appleX && part.Ypos === appleY)
    );

    return { Xpos: appleX, Ypos: appleY };
  };

  return { ...state, handleKeyDown };
}
