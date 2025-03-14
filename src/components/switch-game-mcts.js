const cloneState = (state) => new Map(state);

const isGoalState = (state) => {
  for (let value of state.values()) {
    if (!value) return false;
  }
  return true;
};

const applyMove = (state, move) => {
  let newState = cloneState(state);
  newState.set(move, !newState.get(move));
  if (newState.has(move - 1)) {
    newState.set(move - 1, !newState.get(move - 1));
  }
  if (newState.has(move + 1)) {
    newState.set(move + 1, !newState.get(move + 1));
  }
  return newState;
};

const getPossibleMoves = (state) => Array.from(state.keys());

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getSequence = (node) => {
  let moves = [];
  while (node.parent !== null) {
    moves.push("switch" + node.move);
    node = node.parent;
  }
  moves.reverse();
  return moves;
};

class Node {
  constructor(state, move = null, parent = null) {
    this.state = state;
    this.move = move;
    this.parent = parent;
    this.children = [];
    this.wins = 0;
    this.visits = 0;
    this.untriedMoves = getPossibleMoves(state);
  }
}

const bestChild = (node, c = Math.sqrt(2)) => {
  let bestScore = -Infinity;
  let bestChildNode = null;
  node.children.forEach((child) => {
    const exploitation = child.wins / child.visits;
    const exploration = c * Math.sqrt(Math.log(node.visits) / child.visits);
    const score = exploitation + exploration;
    if (score > bestScore) {
      bestScore = score;
      bestChildNode = child;
    }
  });
  return bestChildNode;
};

const rollout = (state, maxDepth) => {
  let currentState = cloneState(state);
  for (let d = 0; d < maxDepth; d++) {
    if (isGoalState(currentState)) {
      return 1;
    }
    const moves = getPossibleMoves(currentState);
    const move = randomElement(moves);
    currentState = applyMove(currentState, move);
  }
  return isGoalState(currentState) ? 1 : 0;
};

const mcts = (rootState, iterations = 10000, maxDepth = 10) => {
  let root = new Node(rootState);
  let solution = null;

  for (let i = 0; i < iterations; i++) {
    let node = root;
    let state = cloneState(rootState);

    while (node.untriedMoves.length === 0 && node.children.length > 0) {
      node = bestChild(node, Math.sqrt(2));
      state = node.state;
    }

    // EXPANSION
    if (node.untriedMoves.length > 0) {
      const move = randomElement(node.untriedMoves);
      node.untriedMoves.splice(node.untriedMoves.indexOf(move), 1);
      const newState = applyMove(state, move);
      const child = new Node(newState, move, node);
      node.children.push(child);
      node = child;
      state = newState;
    }

    // WE FOUND A SOLUTION?
    if (isGoalState(state)) {
      solution = getSequence(node);
      break;
    }

    // SIMULATION
    const result = rollout(state, maxDepth);

    // BACKPROPAGATION
    while (node !== null) {
      node.visits++;
      node.wins += result;
      node = node.parent;
    }
  }

  // NO SOLUTION...? <= this shouldn't happen
  if (solution) {
    return solution;
  } else {
    // YES SOLUTION
    const bestChildNode = root.children.reduce((a, b) =>
      a.visits > b.visits ? a : b
    );
    return getSequence(bestChildNode);
  }
};

const solve = (switchState) => {
  // console.log("-----------------");
  // console.log("Input switch state:", switchState);
  let initialState = new Map();
  switchState.forEach((switchItem) => {
    let switchIndex = parseInt(switchItem.switchName.replace("switch", ""));
    let isOn = switchItem.isOn;
    initialState.set(switchIndex, isOn);
  });
  // console.log("Initial state:", initialState);

  // limitations
  const iterations = 10000;
  const maxDepth = 10;

  // TRIGGER MCTS
  let result = mcts(initialState, iterations, maxDepth);

  // console.log("Solution sequence:", result);
  // console.log("-----------------");
  return result;
};

export default solve;
