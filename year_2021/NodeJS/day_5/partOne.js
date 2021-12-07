const fs = require("fs");

function createGrid(linesData) {
  // find the range of the graph; max x and max y
  const allXpoints = [];
  const allYpoints = [];
  linesData.forEach((line) => {
    allXpoints.push(line.pointA[0]);
    allXpoints.push(line.pointB[0]);
    allYpoints.push(line.pointA[1]);
    allYpoints.push(line.pointB[1]);
  });
  const rows = Math.max.apply(null, allXpoints);
  const cols = Math.max.apply(null, allYpoints);
  const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  return grid;
}

function traverseLine(currentPoint, endPoint, slope, grid) {
  console.log("\nCurrent point: ", currentPoint);
  console.log("Slope: ", slope);
  console.log("End point: ", endPoint);
  grid[currentPoint.x][currentPoint.y]++; // mark position on grid
  if (currentPoint.x === endPoint.x && currentPoint.y === endPoint.y) {
    console.log("Done");
    return grid;
  }

  let nextPoint;
  if (slope >= 0) {
    nextPoint = { x: currentPoint.x + 1, y: currentPoint.y + slope };
    traverseLine(nextPoint, startPoint, endPoint, slope, grid);
  } else {
    nextPoint = { x: endPoint.x + 1, y: endPoint.y + slope };
    traverseLine(nextPoint, endPoint, startPoint, slope, grid);
  }
}

function insertLine(line, grid) {
  const p1 = { x: line.pointA[0], y: line.pointA[1] };
  const p2 = { x: line.pointB[0], y: line.pointB[1] };

  // check if horizontal or vertical
  if (p1.x === p2.x) {
    console.log("Horizontal");
    for (let y = p1.y; y <= p2.y; p2.y > p1.y ? y++ : y--) {
      console.log(y);
    }
  } else if (p1.y === p2.y) {
    console.log("Vertical");
  }

  // // point slope formula: y1-y2 = m(x1-x2)
  // console.log("Slope: ", slope);

  // for (let row = 0; row < grid.length; row++) {
  //   for (let col = 0; col < grid[row].length; col++) {
  //     const equation = col - p1.y === slope * (row - p1.x);
  //     if (equation) {
  //       console.log("\nRow:", row);
  //       console.log("Col:", col);
  //       console.log("Equation is: ", equation);
  //     }
  //   }
  // }

  // traverseLine(p1, p1, p2, slope, grid);
}

// DOESNT WORK
function partOne(filePath) {
  const data = fs.readFileSync(filePath, "UTF-8");
  const lines = data.split(/\r?\n/);
  let linesData = [];

  // format coordinates
  lines.forEach((line) => {
    const l = line.split(" -> ");
    const lineCoordinates = {
      pointA: [parseInt(l[0].split(",")[0]), parseInt(l[0].split(",")[1])],
      pointB: [parseInt(l[1].split(",")[0]), parseInt(l[1].split(",")[1])],
    };
    linesData.push(lineCoordinates);
  });

  let grid = createGrid(linesData);
  let intersections = [];
  linesData.forEach((line) => {
    console.log("\nLine: ", line);
    insertLine(line, grid);
  });
}

partOne("./year_2021/NodeJS/day_5/testInput.txt");
