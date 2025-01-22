const isEmptyBoard = (board) => {
  console.log("checking if it's empty board");
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      if (board[rowIndex][colIndex] !== 0) {
        console.log("we break here");
        return false;
      }
    }
  }
  return true;
};

export default isEmptyBoard;
