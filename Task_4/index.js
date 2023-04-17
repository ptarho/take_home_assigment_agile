const fs = require("fs");

const data = fs.readFileSync("Task_4/input.json");
const jsonData = JSON.parse(data);
const {length, width, actorsCoordinate} = jsonData

const positions = findGoodPositions(length, width, actorsCoordinate)
fs.writeFileSync("Task_4/output.json", JSON.stringify({positions: positions}))


function findGoodPositions(n, m, actors) {
  if (n < actors.length || m < actors[0].length) return "Invalid input"
  // initialize an array to store the positions where a projector can be placed
  const positions = [];

  // Iterate through each actor on the scene
  actors.forEach((row, rowIndex) => {
    row.forEach((column) => {
      // check all possible directions for projector placement
      checkDirection(rowIndex, column, 0, -1, "right");
      checkDirection(rowIndex, column, 0, 1, "left");
      checkDirection(rowIndex, column, -1, 0, "bottom");
      checkDirection(rowIndex, column, 1, 0, "top");
    });
  });
  return positions
}

// checks the positions in a given direction from a given actor position for projector placement
function checkDirection (row, column, rowDelta, columnDelta, direction) {
  let r = row + rowDelta;
  let c = column + columnDelta;
  while (r >= 0 && r < n && c >= 0 && c < m) {
    // if no actors in the way, push the position and continue in the same direction
    if (!actors[r].includes(c)) {
      positions.push([[r,c], direction])
      r += rowDelta
      c += columnDelta
    } else {
      // if an actor is encountered in the way, break out of the loop
      break
    }
  }
}



//console.log(projector(4, 6, actors))


