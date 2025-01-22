import { useEffect, useState, useRef } from "react";
import "../gomokugame.scss";
import "material-icons/iconfont/material-icons.css";
import ai_thinking_pic from "../img/ai_thinking_pic.jpg";
import invalidMoves from "../utilities/renjuRule";
import isEmptyBoard from "../utilities/isEmptyBoard";
import getCurrentPlayer from "../utilities/getCurrentPlayer";

const GomokuGame = () => {
  // variables
  const cellSize = 30;
  const [boardSize, setBoardSize] = useState(window.innerWidth < 768 ? 10 : 15);
  const [statusText, setStatusText] = useState("(っ°ω°)っ");
  const [isGameOver, setIsGameOver] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [gameBoard, setGameBoard] = useState([
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentAI, setCurrentAI] = useState("mcts-move");
  const [currentRule, setCurrentRule] = useState("freestyle");
  const [forbiddenMoves, setForbiddenMoves] = useState([]);
  const canvasRef = useRef(null);

  // useEffects
  useEffect(() => {
    init();
    drawChessBoard();
    // pre-defined stones
    if (!isEmptyBoard(gameBoard)) {
      console.log("we have predefined board");
      for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
          if (gameBoard[r][c] === 1 || gameBoard[r][c] === -1)
            animateStone(r, c, gameBoard[r][c]);
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log("Current player: " + currentPlayer);
    const handleBannedMoves = () => {
      console.log("Current board");
      console.log(gameBoard);
      const allInvalidMoves = invalidMoves(gameBoard, currentPlayer);
      const topFourInvalidMoves = allInvalidMoves.slice(0, 4);
      setForbiddenMoves(topFourInvalidMoves);

      // Log the top 4 invalid moves to the console
      //   console.log(`Invalid moves for player 1 (Top 4):`);
      //   bannedMoves.forEach((move) => {
      //     console.log(`Move: (${move.Row}, ${move.Col})`);
      //   });
    };

    if (currentPlayer === 1 && currentRule === "renju") {
      handleBannedMoves();
    }
  }, [currentPlayer, currentRule]);

  useEffect(() => {
    console.log("Detecting player");
    let currentPlayer = getCurrentPlayer(gameBoard);
    if (currentPlayer === 0) {
      console.log("Something went wrong :(");
    } else {
      setCurrentPlayer(currentPlayer);
    }
  }, [gameBoard]);

  useEffect(() => {
    if (forbiddenMoves.length > 0) {
      forbiddenMoves.forEach((move) => {
        console.log(move);
      });
    }
  }, [forbiddenMoves]);

  // helper functions
  const init = () => {
    // setGameBoard(
    //   Array(boardSize)
    //     .fill(0)
    //     .map(() => Array(boardSize).fill(0))
    // );
  };

  const drawChessBoard = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

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

  const animateStone = (row, col, me) => {
    const centerX = cellSize / 2 + col * cellSize;
    const centerY = cellSize / 2 + row * cellSize;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(
      centerX + 2,
      centerY - 2,
      13,
      centerX + 2,
      centerY - 2,
      0
    );
    gradient.addColorStop(0, me === 1 ? "#0A0A0A" : "#D1D1D1");
    gradient.addColorStop(1, me === 1 ? "#636766" : "#F9F9F9");

    context.save();
    context.beginPath();
    context.arc(centerX, centerY, cellSize / 2 - 2, 0, 2 * Math.PI);
    context.clip();
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  };

  const handleClick = (e) => {
    var move = getSelectedCell(e);
    animateStone(move.Row, move.Col, currentPlayer);
    setCurrentPlayer((prev) => -prev);
  };

  const getSelectedCell = (e) => {
    const chess = canvasRef.current;
    const rect = chess.getBoundingClientRect();
    const x = e.clientX - rect.left - cellSize / 2;
    const y = e.clientY - rect.top - cellSize / 2;

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    return {
      Row: row,
      Col: col,
    };
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

      <div className="pannel-label">AI Models</div>
      <div className="button-pannel">
        <div className="ai-type-control-wrapper">
          <div className="ai-type-control">
            <input
              type="radio"
              name="MCTS"
              value="mcts-move"
              id="ai-tab-1"
              checked={currentAI === "mcts-move"}
              onChange={() => setCurrentAI("mcts-move")}
            />
            <label htmlFor="ai-tab-1" className="ai-type-control__1">
              <p>MCTS</p>
            </label>

            <input
              type="radio"
              name="Minimax"
              value="minimax-move"
              id="ai-tab-2"
              checked={currentAI === "minimax-move"}
              onChange={() => setCurrentAI("minimax-move")}
            />
            <label htmlFor="ai-tab-2" className="ai-type-control__2">
              <p>Minimax</p>
            </label>

            <div className="ai-type-control__color"></div>
          </div>
        </div>
      </div>

      <div className="pannel-label">Rules</div>
      <div className="button-pannel">
        <div className="rule-type-control-wrapper">
          <div className="rule-type-control">
            <input
              type="radio"
              name="Freestyle"
              value="freestyle"
              id="rule-tab-1"
              checked={currentRule === "freestyle"}
              onChange={() => setCurrentRule("freestyle")}
            />
            <label htmlFor="rule-tab-1" className="rule-type-control__1">
              <p>Free Style</p>
            </label>

            <input
              type="radio"
              name="Renju Rule"
              value="MCTS"
              id="rule-tab-2"
              checked={currentRule === "renju"}
              onChange={() => setCurrentRule("renju")}
            />
            <label htmlFor="rule-tab-2" className="rule-type-control__2">
              <p>Renju</p>
            </label>
            <div className="rule-type-control__color"></div>
          </div>
        </div>
      </div>

      <div className="button-pannel">
        <div id="restart">
          <button className="btn" /* onClick={handleCancel}*/>Restart</button>
        </div>

        <div className="ai-checkbox">
          <div className="ai-checkbox__1">
            <input id="ai-checkbox-1" type="checkbox" />
            <label htmlFor="ai-checkbox-1">
              <i className="material-icons">done</i>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GomokuGame;
