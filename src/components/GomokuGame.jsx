/* eslint-disable no-self-assign */
import { useEffect, useState, useRef } from "react";
import "../gomokugame.scss";
import ai_thinking_pic from "../img/ai_thinking_pic.jpg";

const GomokuGame = () => {
  // State variables
  const [boardSize, setBoardSize] = useState(window.innerWidth < 768 ? 10 : 15);
  const [cellSize, setCellSize] = useState(30);
  const [winner, setWinner] = useState("N/A");
  const [chessBoard, setChessBoard] = useState(
    Array(window.innerWidth < 768 ? 10 : 15)
      .fill(0)
      .map(() => Array(window.innerWidth < 768 ? 10 : 15).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1: Human (Black), -1: AI (White)
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [abortController, setAbortController] = useState(null);

  // Ref for the canvas to avoid using getElementById
  const canvasRef = useRef(null);

  // Handle window resize to adjust board size
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      const newSize = isSmallScreen ? 10 : 15;
      setBoardSize(newSize);
      setCellSize(30);
      setChessBoard(
        Array(newSize)
          .fill(0)
          .map(() => Array(newSize).fill(0))
      );
      setWinner("N/A");
      setCurrentPlayer(1);
      drawChessBoard(); // Redraw board on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to animate a stone on the board
  const animateStone = (context, x, y, isBlack) => {
    const gradient = context.createRadialGradient(
      x + 2,
      y - 2,
      13,
      x + 2,
      y - 2,
      0
    );
    gradient.addColorStop(0, isBlack ? "#0A0A0A" : "#D1D1D1");
    gradient.addColorStop(1, isBlack ? "#636766" : "#F9F9F9");

    context.save();
    context.beginPath();
    context.arc(x, y, cellSize / 2 - 2, 0, 2 * Math.PI);
    context.clip();
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  };

  // Function to draw the chessboard grid
  const drawChessBoard = () => {
    const chess = canvasRef.current;
    const context = chess.getContext("2d");
    context.clearRect(0, 0, chess.width, chess.height); // Clear canvas before drawing
    context.strokeStyle = "#8F8F8F";
    context.lineWidth = 1;

    for (let i = 0; i < boardSize; ++i) {
      // Vertical lines
      context.beginPath();
      context.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
      context.lineTo(
        cellSize / 2 + i * cellSize,
        boardSize * cellSize - cellSize / 2
      );
      context.stroke();

      // Horizontal lines
      context.beginPath();
      context.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
      context.lineTo(
        boardSize * cellSize - cellSize / 2,
        cellSize / 2 + i * cellSize
      );
      context.stroke();
    }
  };

  // Initialize the game
  const initGame = () => {
    const chess = canvasRef.current;
    const context = chess.getContext("2d");
    drawChessBoard(context);

    setChessBoard(
      Array(boardSize)
        .fill(0)
        .map(() => Array(boardSize).fill(0))
    );
    setWinner("N/A");
    setCurrentPlayer(1);
    setIsAIPlaying(false);
  };

  // Restart game handler
  const restartGame = () => {
    // Abort any ongoing API call
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsAIPlaying(false);
    }

    // Reset game state
    initGame();
  };

  // Function to call the Minimax API
  const callMinimaxAPI = async () => {
    setIsAIPlaying(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      console.log("Starting API call with abort controller.");

      const response = await fetch(
        "https://gomoku-ai.onrender.com/api/gomoku/minimax-move",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: chessBoard,
            depth: 3,
            ruleType: "renju",
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the minimax move");
      }

      const data = await response.json();
      console.log(data);

      if (data.status === "Win") {
        setWinner(data.message);
      } else if (data.status === "Draw") {
        setWinner(data.message);
      } else if (data.status === "Playing") {
        setChessBoard((prevBoard) => {
          const newBoard = prevBoard.map((row) => [...row]);

          if (data.x >= 0 && data.y >= 0) {
            newBoard[data.x][data.y] = data.color === "Black" ? 1 : -1;

            const context = canvasRef.current.getContext("2d");
            const centerX = cellSize / 2 + data.y * cellSize;
            const centerY = cellSize / 2 + data.x * cellSize;
            animateStone(context, centerX, centerY, data.color === "Black");
          }

          return newBoard;
        });
      }

      // Update the winner if needed
      if (data.status === "Win" || data.status === "Draw") {
        setWinner(data.message);
      } else {
        setCurrentPlayer(1); // Switch back to human
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("API call aborted by AbortController.");
      } else {
        console.error("Unhandled error in API call:", error);
      }
    } finally {
      setIsAIPlaying(false);
      setAbortController(null);
    }
  };

  // Set up event listener for user clicks on the canvas
  useEffect(() => {
    initGame(); // Initialize game on component mount

    const chess = canvasRef.current;
    const context = chess.getContext("2d");

    const handleClick = (e) => {
      if (winner !== "N/A" || isAIPlaying) return;

      const rect = chess.getBoundingClientRect();
      const x = e.clientX - rect.left - cellSize / 2;
      const y = e.clientY - rect.top - cellSize / 2;

      const row = Math.floor(y / cellSize);
      const col = Math.floor(x / cellSize);

      if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
        setChessBoard((prevBoard) => {
          const newBoard = prevBoard.map((r) => [...r]);

          if (newBoard[row][col] === 0) {
            newBoard[row][col] = currentPlayer;

            animateStone(
              context,
              cellSize / 2 + col * cellSize,
              cellSize / 2 + row * cellSize,
              currentPlayer === 1
            );

            setCurrentPlayer(-1); // Switch to AI
            setTimeout(callMinimaxAPI, 200); // AI makes a move after 200ms
          }
          return newBoard;
        });
      }
    };

    chess.addEventListener("click", handleClick);

    return () => {
      chess.removeEventListener("click", handleClick);
    };
  }, [boardSize, cellSize, winner, isAIPlaying]);

  return (
    <div className="gomoku-board">
      <div className="status">Winner: {winner}</div>
      <div className="board-wrapper">
        <canvas
          ref={canvasRef}
          id="chess"
          width={boardSize * cellSize}
          height={boardSize * cellSize}
        ></canvas>
        {isAIPlaying && (
          <div className="overlay">
            <img src={ai_thinking_pic} alt="AI Thinking" />
          </div>
        )}
      </div>
      <div id="restart">
        <button className="btn" onClick={restartGame}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default GomokuGame;
