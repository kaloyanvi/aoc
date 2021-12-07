const fs = require("fs");

function findMean(arr) {
  const mean = arr.reduce((a, b) => a + b) / arr.length;
  return Math.floor(mean);
}

function calculateFuel(pos, finalPosition, neededFuel = 0, fuelStep = 1) {
  if (pos !== finalPosition) {
    neededFuel = neededFuel + fuelStep;
    const positiveDirection = pos - finalPosition > 0 ? true : false;
    if (positiveDirection) {
      return calculateFuel(pos - 1, finalPosition, neededFuel, fuelStep + 1);
    } else {
      return calculateFuel(pos + 1, finalPosition, neededFuel, fuelStep + 1);
    }
  }
  return neededFuel;
}

function partTwo(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const fmtData = data.split(",").map((i) => {
    return parseInt(i);
  });
  const meanPosition = findMean(fmtData);
  let totalFuel = 0;
  fmtData.forEach((crabPosition) => {
    const fuelNeeded = calculateFuel(crabPosition, meanPosition);
    totalFuel = totalFuel + fuelNeeded;
  });
  console.log(`Minimum fuel needed: ${totalFuel}`);
}

partTwo("./year_2021/NodeJS/day_7/input.txt");
