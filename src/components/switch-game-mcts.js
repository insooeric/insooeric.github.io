const solve = () => {
  console.log("-----------------");
  let sequence = [1, 2, 3];

  let result = parseSequence(sequence);

  console.log("-----------------");
  return result;
};

const parseSequence = (sequence) => {
  console.log("current sequence: " + sequence);
  let parseResult = [];
  sequence.forEach((sq) => {
    parseResult.push("switch" + sq);
  });
  console.log("parse sequence: " + parseResult);
  return parseResult;
};

export default solve;
