const fs = require("fs");

// DOESNT WORK
function partTwo(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const fmtData = data.split(",").map((i) => {
    return parseInt(i);
  });

  fmtData.forEach((fish) => {
    console.log(`Fish ${fish}`);
    fishCount++;
    findChildren(fish, 18, 6);
  });
  console.log(fishCount);
}

partTwo("./year_2021/NodeJS/day_6/testInput.txt");
