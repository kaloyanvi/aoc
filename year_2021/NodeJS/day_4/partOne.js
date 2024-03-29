const fs = require("fs");

function matchMatrix(matrix, numbersDrawn) {
  for (let i = 0; i < matrix.length; i++) {
    const rowCol = matrix[i];
    const match = rowCol.every((num) => numbersDrawn.includes(num));
    if (match) {
      return true;
    }
  }
}

function checkCard(matrix, numbersDrawn) {
  const mT = matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  if (matchMatrix(matrix, numbersDrawn) || matchMatrix(mT, numbersDrawn)) {
    return true;
  } else {
    return false;
  }
}

function calculateScore(matrix, numbersDrawn) {
  const lastNumber = parseInt(numbersDrawn[numbersDrawn.length - 1]);
  let unmarkedNumbersSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    row.forEach((num) => {
      if (!numbersDrawn.includes(num)) {
        unmarkedNumbersSum = unmarkedNumbersSum + parseInt(num);
      }
    });
  }
  return lastNumber * unmarkedNumbersSum;
}

function partOne(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const lines = data.split(/\r?\n/);
  const numbers = lines.shift().split(",");
  let matrices = [];

  let currentMatrixIndex = -1;
  lines.forEach((row) => {
    if (row === "") {
      matrices.push([]);
      currentMatrixIndex++;
    } else {
      const cleanRow = row.split(" ").filter((i) => i !== "");
      matrices[currentMatrixIndex].push(cleanRow);
    }
  });

  let numbersDrawn = [];

  for (let i = 0; i < numbers.length; i++) {
    numbersDrawn.push(numbers[i]);
    for (let x = 0; x < matrices.length; x++) {
      const card = checkCard(matrices[x], numbersDrawn);
      if (card) {
        const score = calculateScore(matrices[x], numbersDrawn);
        return score;
      }
    }
  }
}

console.log(partOne("./year_2021/NodeJS/day_4/input.txt"));
