const fs = require("fs");

try {
  // read contents of the file
  const data = fs.readFileSync("./day_1/input.txt", "UTF-8");
  const lines = data.split(/\r?\n/);

  const depthWindows = [];
  for (let i = 1; i < lines.length; i++) {
    const window =
      Number(lines[i - 1]) + Number(lines[i]) + Number(lines[i + 1]);

    if (window) {
      depthWindows.push(window);
    }
  }

  let increased = 0;
  for (let i = 1; i < depthWindows.length; i++) {
    const depth = Number(depthWindows[i]);
    const prevDepth = Number(depthWindows[i - 1]);

    if (depth > prevDepth) {
      increased++;
    }
  }
  console.log(increased);
} catch (err) {
  console.error(err);
}
