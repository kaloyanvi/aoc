const fs = require("fs");

// updates your position
function updatePosition(position, input) {
  const inputArray = input.split(" ");
  const direction = inputArray[0];
  const value = Number(inputArray[1]);

  if (direction === "up") {
    position.aim = position.aim - value;
  }
  if (direction === "down") {
    position.aim = position.aim + value;
  }
  if (direction === "forward") {
    position.horizontal = position.horizontal + value;
    position.vertical = position.vertical + position.aim * value;
  }
}

try {
  // read contents of the file
  const data = fs.readFileSync("./year_2021/NodeJS/day_2/input.txt", "UTF-8");
  const lines = data.split(/\r?\n/);

  let currentPosition = {
    horizontal: 0,
    vertical: 0,
    aim: 0,
  };

  for (let i = 0; i < lines.length; i++) {
    const newInput = lines[i];
    updatePosition(currentPosition, newInput);
  }
  const result = currentPosition.horizontal * currentPosition.vertical;
  console.log("\n\nResult: ", result);
} catch (err) {
  console.error(err);
}
