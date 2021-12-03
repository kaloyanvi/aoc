const fs = require("fs");

try {
  // read contents of the file
  const data = fs.readFileSync("./year_2021/NodeJS/day_3/input.txt", "UTF-8");
  const lines = data.split(/\r?\n/);
  let matrix = [];
  lines.forEach((i) => matrix.push(i.split("")));
  const matrixTranspose = matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );

  let gamma = "";
  let epsilon = "";
  matrixTranspose.forEach((row) => {
    const count1s = row.filter((x) => x == 1).length;
    const count0s = row.filter((x) => x == 0).length;
    let gammaBit, epsilonBit;
    if (count1s > count0s) {
      gammaBit = "1";
      epsilonBit = "0";
    } else {
      gammaBit = "0";
      epsilonBit = "1";
    }
    gamma = gamma + gammaBit;
    epsilon = epsilon + epsilonBit;
  });
  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  const powerConsumption = gamma * epsilon;
  console.log(powerConsumption);
} catch (err) {
  console.error(err);
}
