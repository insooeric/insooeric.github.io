/* eslint-disable no-self-assign */
import { useEffect, useState } from "react";
import "../gomokugame.scss";
import ai_thinking_pic from "../img/ai_thinking_pic.jpg";

const GomokuGame = () => {
  const [boardSize, setBoardSize] = useState(window.innerWidth < 768 ? 10 : 15);
  const [cellSize, setCellSize] = useState(30);
  const [winner, setWinner] = useState("N/A");
  const [chessBoard, setChessBoard] = useState(
    Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const handleCancel = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
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

  const checkGameState = (board) => {
    const boardSize = board.length;
    const winLength = 5;

    const checkDirection = (row, col, deltaRow, deltaCol) => {
      const player = board[row][col];
      if (player === 0) return false;

      let count = 1;
      let r = row + deltaRow;
      let c = col + deltaCol;

      while (
        r >= 0 &&
        r < boardSize &&
        c >= 0 &&
        c < boardSize &&
        board[r][c] === player
      ) {
        count++;
        r += deltaRow;
        c += deltaCol;
      }

      r = row - deltaRow;
      c = col - deltaCol;

      while (
        r >= 0 &&
        r < boardSize &&
        c >= 0 &&
        c < boardSize &&
        board[r][c] === player
      ) {
        count++;
        r -= deltaRow;
        c -= deltaCol;
      }

      return count >= winLength;
    };

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] !== 0) {
          if (
            checkDirection(row, col, 0, 1) ||
            checkDirection(row, col, 1, 0) ||
            checkDirection(row, col, 1, 1) ||
            checkDirection(row, col, 1, -1)
          ) {
            return board[row][col];
          }
        }
      }
    }

    return 0;
  };

  const callMinimaxAPI = async () => {
    setIsAIPlaying(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      console.log("Starting API call with abort controller.");

      const response = await fetch(
        "https://localhost:7160/api/Analyze/minimax-move",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: chessBoard,
            depth: 10,
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the minimax move");
      }

      const data = await response.json();
      console.log(data);

      if (data.status === "Playing") {
        setChessBoard((prevBoard) => {
          const newBoard = [...prevBoard.map((row) => [...row])];

          newBoard[data.row][data.column] = data.player === "Black" ? 1 : -1;

          const chess = document.getElementById("chess");
          const context = chess.getContext("2d");
          const centerX = cellSize / 2 + data.column * cellSize;
          const centerY = cellSize / 2 + data.row * cellSize;
          animateStone(context, centerX, centerY, data.player === "Black");

          if (checkGameState(newBoard) == -1) {
            setWinner(
              data.player === "Black"
                ? "AI (Black) Wins 🎉"
                : "AI (White) Wins 🎉"
            );
          }

          return newBoard;
        });
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

  useEffect(() => {
    const wins = [];
    let count = 0;

    const initData = () => {
      setChessBoard(
        Array(boardSize)
          .fill(0)
          .map(() => Array(boardSize).fill(0))
      );
      setWinner("N/A");
      for (let i = 0; i < boardSize; ++i) {
        wins[i] = Array(boardSize)
          .fill(null)
          .map(() => []);
      }
      count = 0;

      for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize - 4; ++j) {
          for (let k = 0; k < 5; ++k) {
            wins[i][j + k][count] = true;
          }
          count++;
        }
      }
      for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize - 4; ++j) {
          for (let k = 0; k < 5; ++k) {
            wins[j + k][i][count] = true;
          }
          count++;
        }
      }
      for (let i = 0; i < boardSize - 4; ++i) {
        for (let j = 0; j < boardSize - 4; ++j) {
          for (let k = 0; k < 5; ++k) {
            wins[i + k][j + k][count] = true;
          }
          count++;
        }
      }
      for (let i = 0; i < boardSize - 4; ++i) {
        for (let j = boardSize - 1; j > 3; --j) {
          for (let k = 0; k < 5; ++k) {
            wins[i + k][j - k][count] = true;
          }
          count++;
        }
      }
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

    const isBoardFull = () => {
      return chessBoard.every((row) => row.every((cell) => cell !== 0));
    };

    const initGame = () => {
      const chess = document.getElementById("chess");
      const context = chess.getContext("2d");

      initData();
      setCurrentPlayer(1);
      drawChessBoard(context);

      document.getElementById("restart").onclick = () => {
        chess.height = chess.height;
        initData();
        drawChessBoard(context);
        //over = false;
        setIsAIPlaying(false);
        setCurrentPlayer(1);
      };

      chess.onclick = (e) => {
        if (winner !== "N/A" || isAIPlaying) return;

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

              if (isBoardFull()) {
                setWinner("It's a Draw 🤝");
              } else if (checkWin(row, col, newBoard)) {
                setWinner(
                  currentPlayer == 1 ? "Black Wins 🎉" : "White Wins 🎉"
                );
              }

              setCurrentPlayer((player) => -1 * player);
            }
            return newBoard;
          });
        }
      };
    };

    const checkWin = (x, y, board) => {
      for (let k = 0; k < count; ++k) {
        if (wins[x][y][k]) {
          let playerStones = 0;
          for (let i = 0; i < boardSize; ++i) {
            for (let j = 0; j < boardSize; ++j) {
              if (wins[i][j][k] && board[i][j] === board[x][y]) {
                playerStones++;
              }
            }
          }
          if (playerStones === 5) return true;
        }
      }
      return false;
    };

    initGame();
  }, [boardSize, cellSize]);

  return (
    <div className="gomoku-board">
      <div className="status">{winner}</div>
      <div className="board-wrapper">
        <canvas
          id="chess"
          width={boardSize * cellSize}
          height={boardSize * cellSize}
          onClick={callMinimaxAPI}
        ></canvas>
        {isAIPlaying && (
          <div className="overlay">
            <img src={ai_thinking_pic} alt="" />
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
