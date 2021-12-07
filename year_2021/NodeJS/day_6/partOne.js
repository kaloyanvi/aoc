const fs = require("fs");

function partOne(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const fmtData = data.split(",").map((i) => {
    return parseInt(i);
  });

  let day = 0;
  let currentFish = fmtData;
  while (day < 256) {
    // currentFish = recurseFish(0, currentFish);
    let newFish = [];
    for (let fishIndex = 0; fishIndex <= currentFish.length - 1; fishIndex++) {
      const fish = currentFish[fishIndex];
      if (fish === 0) {
        currentFish[fishIndex] = 6;
        newFish.push(8);
      } else {
        currentFish[fishIndex] = currentFish[fishIndex] - 1;
      }
    }
    currentFish = currentFish.concat(newFish);
    day++;
  }
  console.log(currentFish.length);
}

partOne("./year_2021/NodeJS/day_6/input.txt");
