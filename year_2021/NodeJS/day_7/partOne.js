const fs = require("fs");

function findMedian(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function partOne(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const fmtData = data.split(",").map((i) => {
    return parseInt(i);
  });
  const medianPosition = findMedian(fmtData);
  let totalFuel = 0;
  fmtData.forEach((crabPosition) => {
    const posDiff = Math.abs(medianPosition - crabPosition);
    totalFuel = totalFuel + posDiff;
  });
  console.log(`Minimum fuel needed: ${totalFuel}`);
}

partOne("./year_2021/NodeJS/day_7/input.txt");
