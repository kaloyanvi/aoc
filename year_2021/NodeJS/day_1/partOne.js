const fs = require("fs");

try {
  // read contents of the file
  const data = fs.readFileSync("./day_1/input.txt", "UTF-8");
  const lines = data.split(/\r?\n/);

  let increased = 0;
  for (let i = 1; i < lines.length; i++) {
    const depth = Number(lines[i]);
    const prevDepth = Number(lines[i - 1]);

    if (depth >= prevDepth) {
      increased++;
    }
  }
  console.log(increased);
} catch (err) {
  console.error(err);
}
