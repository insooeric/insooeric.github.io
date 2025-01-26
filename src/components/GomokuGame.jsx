import { useEffect, useState, useRef } from "react";
import "../gomokugame.scss";
import "material-icons/iconfont/material-icons.css";
import ai_thinking_pic from "../img/ai_thinking_pic.jpg";
import invalidMoves from "../utilities/renjuRule";
// import isEmptyBoard from "../utilities/isEmptyBoard";
//import getCurrentPlayer from "../utilities/getCurrentPlayer";
import forbidden_icon from "../img/forbidden_icon.svg";

const GomokuGame = () => {
  // variables
  const [cellSize, setCellSize] = useState(30);
  const [boardSize, setBoardSize] = useState(window.innerWidth < 768 ? 10 : 15);
  const [statusText, setStatusText] = useState("(っ°ω°)っ");
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastMove, setLastMove] = useState({ Row: -1, Col: -1 });
  const [isInitialState, setIsInitialState] = useState(true);

  // const [gameBoard, setGameBoard] = useState([
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  // ]);
  const [gameBoard, setGameBoard] = useState(
    Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentAI, setCurrentAI] = useState("mcts-move");
  const [currentRule, setCurrentRule] = useState("freestyle");
  const [forbiddenMoves, setForbiddenMoves] = useState([]);
  const [abortController, setAbortController] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // console.log("Configuring board size");
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setBoardSize(isSmallScreen ? 10 : 15);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    init();
  }, [boardSize, cellSize]);

  // useEffect(() => {
  //   console.log(lastMove);
  // }, [lastMove]);

  useEffect(() => {
    // console.log("Checking forbidden moves");
    if (currentRule === "renju") {
      let forbiddenMoves = invalidMoves(gameBoard, currentPlayer);
      setForbiddenMoves(forbiddenMoves);
    } else if (currentRule === "freestyle") {
      setForbiddenMoves([]);
    }
    // console.log(forbiddenMoves);
  }, [gameBoard, currentRule]);

  useEffect(() => {
    if (!isGameOver) {
      setStatusText(
        isInitialState
          ? "(っ°ω°)っ"
          : currentPlayer === 1
          ? "Black's turn"
          : currentPlayer === -1
          ? "White's turn"
          : "(˃̣̣̥ᯅ˂̣̣̥)"
      );
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (isAIPlaying) {
      // console.log("AI's turn");
      callAIMove();
    }
  }, [isAIPlaying, currentPlayer]);

  const callAIMove = async () => {
    try {
      const controller = new AbortController();
      setAbortController(controller);
      const response = await fetch(
        `https://gomoku-ai.onrender.com/api/gomoku/${currentAI}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: gameBoard,
            depth:
              currentAI === "minimax-move"
                ? 4
                : currentAI === "mcts-move"
                ? 20
                : 4,
            ruleType: `${currentRule}`,
          }),
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch the ${
            currentAI === "minimax-move"
              ? "Minimax"
              : currentAI === "mcts-move"
              ? "MCTS"
              : "undefined AI"
          } move`
        );
      }

      const data = await response.json();
      if (data.x > -1 && data.y > -1) {
        let row = data.x;
        let col = data.y;
        let pixel = getSelectedPixel(row, col);
        let pixelX = pixel.PixelX;
        let pixelY = pixel.PixelY;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        placeStoneOnBoard(row, col, currentPlayer);
        setLastMove({ Row: row, Col: col });
        drawStone(context, pixelX, pixelY, currentPlayer);
        let nextPlayer = -currentPlayer;
        setCurrentPlayer(nextPlayer);
      }

      if (
        data.status === "Win" ||
        data.status === "Lose" ||
        data.status === "Draw"
      ) {
        setIsGameOver(true);
        setStatusText(data.message);
      }

      console.log(data);
    } catch (error) {
      console.log(`Something went wrong :( [${error.message}]`);
    } finally {
      setIsAIPlaying(false);
    }
  };

  // helper functions
  const init = () => {
    const newBoard = Array(boardSize)
      .fill(0)
      .map(() => Array(boardSize).fill(0));

    setGameBoard(newBoard);

    // const newBoard = gameBoard; // for testing

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    setCellSize(30); // just in case
    drawGameBoard(context, newBoard);

    // for testing
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard.length; c++) {
        let pixel = getSelectedPixel(r, c);
        drawStone(context, pixel.PixelX, pixel.PixelY, newBoard[r][c]);
      }
    }
    // end of testing

    setCurrentPlayer(1);
    setIsInitialState(true);
    setIsGameOver(false);
    setIsAIPlaying(false);
  };

  const drawGameBoard = (context, currentBoard) => {
    context.strokeStyle = "#8F8F8F";
    context.beginPath(); // Start a new path
    for (let i = 0; i < currentBoard.length; ++i) {
      context.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
      context.lineTo(
        cellSize / 2 + i * cellSize,
        currentBoard.length * cellSize - cellSize / 2
      );
      context.stroke();
      context.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
      context.lineTo(
        currentBoard.length * cellSize - cellSize / 2,
        cellSize / 2 + i * cellSize
      );
      context.stroke();
    }
  };

  const drawStone = (context, x, y, me) => {
    // console.log(`I am ${me === 1 ? "Black" : me === -1 ? "White" : "Nothing"}`);
    const gradient = context.createRadialGradient(
      x + 2,
      y - 2,
      13,
      x + 2,
      y - 2,
      0
    );

    if (me === 1) {
      // Black stone colors
      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(1, "#636766");
    } else if (me === -1) {
      // White stone colors
      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");
    } else {
      return;
    }

    context.save();
    context.beginPath();
    context.arc(x, y, cellSize / 2 - 2, 0, 2 * Math.PI);
    context.clip();
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  };

  const handleClick = (e) => {
    setIsInitialState(false);
    //const chess = canvasRef.current;
    if (isGameOver || isAIPlaying) return;

    //let currentPlayer = getCurrentPlayer(gameBoard);
    //console.log(`Current player: ${currentPlayer}`);

    let move = getSelectedRowCol(e);
    let row = move.Row;
    let col = move.Col;
    let pixel = getSelectedPixel(row, col);
    let pixelX = pixel.PixelX;
    let pixelY = pixel.PixelY;
    // console.log(move);
    if (!isCellOccupied(row, col)) {
      //setLastMove({ row: move.Row, col: move.Col });
      // let nextPlayer = -currentPlayer;
      if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        placeStoneOnBoard(row, col, currentPlayer);
        drawStone(context, pixelX, pixelY, currentPlayer);
        setLastMove({ Row: row, Col: col });
        let nextPlayer = -currentPlayer;
        setCurrentPlayer(nextPlayer);
        //console.log(`Next player: ${nextPlayer}`);
        //renderBoard(gameBoard);
        setIsAIPlaying(true);
      }
    }
  };

  const placeStoneOnBoard = (row, col, player) => {
    setGameBoard((prevBoard) => {
      // Create a deep copy of the game board
      const newBoard = prevBoard.map((r) => [...r]);

      // Check if the selected cell is empty
      if (newBoard[row][col] === 0) {
        newBoard[row][col] = player; // Place the player's stone
      } else {
        //console.warn(`Cell (${row}, ${col}) is already occupied.`);
      }

      return newBoard;
    });
  };

  const isCellOccupied = (row, col) => {
    let newBoard = gameBoard.map((r) => [...r]);

    if (newBoard[row][col] !== 0) {
      //console.warn(`Cell (${row}, ${col}) is already occupied.`);
      return true;
    }
    return false;
  };

  const getSelectedRowCol = (e) => {
    // console.log(`Dimension: (${e.clientX},${e.clientY})`);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log(`Detected: (${x},${y})`);

    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    return {
      Row: row,
      Col: col,
    };
  };

  const getSelectedPixel = (row, col) => {
    const centerX = cellSize / 2 + col * cellSize;
    const centerY = cellSize / 2 + row * cellSize;

    return {
      PixelX: centerX,
      PixelY: centerY,
    };
  };

  const handleReset = () => {
    // Always reset everything, no matter what
    setLastMove({ Row: -1, Col: -1 });
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    // const newBoard = Array(boardSize)
    //   .fill(0)
    //   .map(() => Array(boardSize).fill(0));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    init();
  };

  const handleAIPlay = () => {
    // console.log("AI Play called");
    setIsAIPlaying(true);
  };

  // const playAIMove = async () => {
  //   setStatusText("AI's turn")
  // }

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
        {forbiddenMoves.map((move, index) => (
          <div
            key={index}
            className="forbidden-move-marker"
            style={{
              top: move.Row * cellSize,
              left: move.Col * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          >
            <img src={forbidden_icon} />
          </div>
        ))}
        {/* {(lastMove.Row > -1 && lastMove.Col > -1) ?? ( */}
        {lastMove.Row > -1 && lastMove.Col > -1 && (
          <div
            className="last-move-marker"
            style={{
              top: lastMove.Row * cellSize + (cellSize / 2 - 6),
              left: lastMove.Col * cellSize + (cellSize / 2 - 6),
            }}
          ></div>
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
          <button className="btn" onClick={handleReset}>
            Restart
          </button>
        </div>

        <div className="ai-play">
          <button className="btn" onClick={handleAIPlay}>
            Play AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default GomokuGame;
