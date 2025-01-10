/* eslint-disable no-self-assign */
import { useEffect, useState, useRef } from "react";
import "../gomokugame.scss";
import ai_thinking_pic from "../img/ai_thinking_pic.jpg";

const GomokuGame = () => {
  const [boardSize, setBoardSize] = useState(window.innerWidth < 768 ? 10 : 15);
  const [cellSize, setCellSize] = useState(30);
  const [statusText, setStatusText] = useState("(っ°ω°)っ");
  const [isGameOver, setIsGameOver] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [chessBoard, setChessBoard] = useState(
    Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1); // black = 1, white = -1
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const canvasRef = useRef(null);

  const handleCancel = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    const chess = canvasRef.current;
    if (!chess) return;
    const context = chess.getContext("2d");

    chess.height = chess.height;
    initData();
    drawChessBoard(context);
    setIsAIPlaying(false);
    setCurrentPlayer(1);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setBoardSize(isSmallScreen ? 10 : 15);
      setCellSize(30);
      setChessBoard(
        Array(isSmallScreen ? 10 : 15)
          .fill(0)
          .map(() => Array(isSmallScreen ? 10 : 15).fill(0))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleCancel();
    initGame();
  }, [boardSize, cellSize]);

  useEffect(() => {
    if (!isAIPlaying) {
      console.log("Black's turn");
    } else {
      callMinimaxAPI();
    }
  }, [isAIPlaying]);

  const animateStone = (context, x, y, me) => {
    const gradient = context.createRadialGradient(
      x + 2,
      y - 2,
      13,
      x + 2,
      y - 2,
      0
    );
    gradient.addColorStop(0, me ? "#0A0A0A" : "#D1D1D1");
    gradient.addColorStop(1, me ? "#636766" : "#F9F9F9");

    context.save();
    context.beginPath();
    context.arc(x, y, cellSize / 2 - 2, 0, 2 * Math.PI);
    context.clip();
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  };

  const callMinimaxAPI = async () => {
    setStatusText("White's turn");
    console.log(JSON.stringify(chessBoard));

    const controller = new AbortController();
    setAbortController(controller);

    if (!isAIPlaying) {
      return;
    }

    try {
      console.log("Starting API call with abort controller.");

      const response = await fetch(
        "https://localhost:32769/api/gomoku/minimax-move",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: chessBoard,
            depth: 5,
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
      if (data.x > -1 && data.y > -1) {
        setChessBoard((prevBoard) => {
          const newBoard = [...prevBoard.map((row) => [...row])];

          newBoard[data.x][data.y] = data.color === "Black" ? 1 : -1;

          const chess = canvasRef.current;
          const context = chess.getContext("2d");
          const centerX = cellSize / 2 + data.y * cellSize;
          const centerY = cellSize / 2 + data.x * cellSize;
          animateStone(context, centerX, centerY, data.color === "Black");

          return newBoard;
        });
      }

      if (data.status === "Playing") {
        setStatusText("Black's turn");
      }

      if (
        data.status === "Win" ||
        data.status === "Lose" ||
        data.status === "Draw"
      ) {
        setIsGameOver(true);
        setAiStatus(data);
        setStatusText(data.message);
      }

      setCurrentPlayer((player) => -1 * player);
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

  const initData = () => {
    setChessBoard(
      Array(boardSize)
        .fill(0)
        .map(() => Array(boardSize).fill(0))
    );
    setStatusText("(っ°ω°)っ");
    setIsGameOver(false);
  };

  const drawChessBoard = (context) => {
    context.strokeStyle = "#8F8F8F";
    for (let i = 0; i < boardSize; ++i) {
      context.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
      context.lineTo(
        cellSize / 2 + i * cellSize,
        boardSize * cellSize - cellSize / 2
      );
      context.stroke();
      context.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
      context.lineTo(
        boardSize * cellSize - cellSize / 2,
        cellSize / 2 + i * cellSize
      );
      context.stroke();
    }
  };

  const initGame = () => {
    const chess = canvasRef.current;
    if (!chess) return;
    const context = chess.getContext("2d");

    initData();
    setCurrentPlayer(1);
    drawChessBoard(context);
  };

  const handleClick = (e) => {
    const chess = canvasRef.current;
    if (!chess || isGameOver) return;
    const context = chess.getContext("2d");

    if (isAIPlaying) return;

    const rect = chess.getBoundingClientRect();
    const x = e.clientX - rect.left - cellSize / 2;
    const y = e.clientY - rect.top - cellSize / 2;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      setChessBoard((prevBoard) => {
        const newBoard = [...prevBoard.map((r) => [...r])];

        if (newBoard[row][col] === 0) {
          newBoard[row][col] = currentPlayer;

          const centerX = cellSize / 2 + col * cellSize;
          const centerY = cellSize / 2 + row * cellSize;
          animateStone(context, centerX, centerY, currentPlayer);

          if (isGameOver) {
            setStatusText(aiStatus.message);
          }

          setCurrentPlayer((player) => -1 * player);
          setIsAIPlaying(true);
        }
        return newBoard;
      });
    }
  };

  return (
    <div className="gomoku-board">
      <div className="status">{statusText}</div>
      <div className="board-wrapper">
        <canvas
          id="chess"
          ref={canvasRef}
          width={boardSize * cellSize}
          height={boardSize * cellSize}
          onClick={handleClick}
        ></canvas>
        {isAIPlaying && (
          <div className="overlay">
            <img src={ai_thinking_pic} alt="AI Thinking" />
          </div>
        )}
      </div>
      <div id="restart">
        <button className="btn" onClick={handleCancel}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default GomokuGame;
