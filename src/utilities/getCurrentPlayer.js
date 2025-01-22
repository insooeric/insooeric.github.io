const getCurrentPlayer = (board) => {
  let black_count = 0;
  let white_count = 0;

  // Count black and white stones on the board
  for (let row of board) {
    for (let cell of row) {
      if (cell === 1) {
        black_count++;
      } else if (cell === -1) {
        white_count++;
      }
    }
  }

  // Determine the current player
  if (black_count === white_count) {
    return 1; // Black's turn
  } else if (black_count === white_count + 1) {
    return -1; // White's turn
  } else {
    return 0; // Error or unexpected state
  }
};

export default getCurrentPlayer;
