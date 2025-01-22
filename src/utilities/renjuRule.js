/* eslint-disable no-unused-vars */
var Debug = false;

class Move {
  constructor(row, col) {
    this.Row = row;
    this.Col = col;
  }
}

const IsForbiddenMove = (currentBoard) => {
  if (Debug) {
    console.log(currentBoard);
  }
  if (HasOverline(currentBoard, 1)) {
    if (Debug) {
      console.log("Detected Overline");
    }
    return true;
  }

  let openFours = CountOpenFours(currentBoard, 1);
  if (openFours >= 2) {
    return true;
  }

  let openThrees = CountOpenThrees(currentBoard, 1);
  if (openThrees >= 2) {
    return true;
  }

  return false;
};

const HasOverline = (board, player) => {
  // horizontal
  for (let row = 0; row < board.length; row++) {
    let count = 0;
    for (let col = 0; col < board[row].length; col++) {
      count = board[row][col] === player ? count + 1 : 0;
      if (count >= 6) return true;
    }
  }

  // vertical
  for (let col = 0; col < board[0].length; col++) {
    let count = 0;
    for (let row = 0; row < board.length; row++) {
      count = board[row][col] === player ? count + 1 : 0;
      if (count >= 6) return true;
    }
  }

  // Diagonal \
  for (let d = -board.length + 1; d < board[0].length; d++) {
    let count = 0;
    for (
      let row = Math.max(0, -d);
      row < Math.min(board.length, board[0].length - d);
      row++
    ) {
      let col = row + d;
      if (col >= 0 && col < board[0].length) {
        count = board[row][col] === player ? count + 1 : 0;
        if (count >= 6) return true;
      }
    }
  }

  // Diagonal /
  for (let d = 0; d < board.length + board[0].length - 1; d++) {
    let count = 0;
    for (
      let row = Math.max(0, d - board[0].length + 1);
      row < Math.min(board.length, d + 1);
      row++
    ) {
      let col = d - row;
      if (col >= 0 && col < board[0].length) {
        count = board[row][col] === player ? count + 1 : 0;
        if (count >= 6) return true;
      }
    }
  }

  return false;
};

const CountOpenFours = (board, player) => {
  return false;
};

const CountOpenThrees = (board, player) => {
  return false;
};

const invalidMoves = (currentBoard, currentPlayer) => {
  let board = currentBoard;
  /*************
   *  TESTING  *
   *************/
  //   let board = [
  //     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   ];
  /*************
   *    END    *
   *************/
  let invalidMoves = [];
  if (Debug) {
    console.log("-----------------------");
    console.log("Grabbing invalid moves:");
  }
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (board[rowIndex][colIndex] === 0) {
        let tempBoard = JSON.parse(JSON.stringify(board));
        tempBoard[rowIndex][colIndex] = currentPlayer;
        if (IsForbiddenMove(tempBoard)) {
          invalidMoves.push(new Move(rowIndex, colIndex));
        }
      }
    });
  });
  if (Debug) {
    console.log("Forbidden moves:");
    console.log(invalidMoves);
    console.log("-----------------------");
  }

  return invalidMoves;
};

export default invalidMoves;
