const fs = require("fs");

function transposeMatrix(matrix) {
  const mT = matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  return mT;
}

function filterMatrixGenerator(matrix, depth = 0, filter) {
  if (matrix.length > 1) {
    const mT = transposeMatrix(matrix);
    let bitFilter;
    if (filter === "O2") {
      bitFilter =
        mT[depth].filter((x) => x == 1).length >=
        mT[depth].filter((x) => x == 0).length
          ? 1
          : 0;
    } else if (filter === "CO2") {
      bitFilter =
        mT[depth].filter((x) => x == 1).length <
        mT[depth].filter((x) => x == 0).length
          ? 1
          : 0;
    }

    const matrixFiltered = matrix.filter((row) => row[depth] == bitFilter);
    return filterMatrixGenerator(matrixFiltered, depth + 1, filter);
  }

  const bitString = parseInt(matrix[0].join(""), 2);
  return bitString;
}

try {
  // read contents of the file
  const data = fs.readFileSync("./year_2021/NodeJS/day_3/input.txt", "UTF-8");
  const lines = data.split(/\r?\n/);
  let matrix = [];
  lines.forEach((i) => matrix.push(i.split("")));

  const O2 = filterMatrixGenerator(matrix, 0, "O2");
  const CO2 = filterMatrixGenerator(matrix, 0, "CO2");
  const result = O2 * CO2;
  console.log(result);
} catch (err) {
  console.error(err);
}
