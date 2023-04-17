const fs = require("fs");

const data = fs.readFileSync("Task_3/Task_3.1/input.json");
const jsonData = JSON.parse(data);
const prevRecord = jsonData.weight;

const newRecord = findSmallestGreater(prevRecord);
fs.writeFileSync("Task_3/Task_3.1/output.json", JSON.stringify(newRecord));

// main function
function findSmallestGreater(prevRecord) {
  const weights = [0.5, 1, 2.5, 4.54, 5, 10, 11.34, 15, 15.88, 20, 20.412, 25];
  const maximumDiscs = 12;
  let smallestSum = Infinity;
  let smallestCombo = [];
  const W = ((prevRecord - 20) / 2).toFixed(2); // previous record weight on one side of bar

  for (let n = 1; n <= maximumDiscs; n++) {
    const combinations = getCombinations(weights, n);
    // loop through each combination and calculate its sum of weights.
    for (let combo of combinations) {
      const comboSum = combo.reduce((acc, val) => acc + val, 0);
      if (comboSum > W && comboSum < smallestSum) {
        smallestSum = comboSum;
        smallestCombo = combo;
      }
    }
  }
  return {
    weight: (smallestSum * 2 + 20).toFixed(2),
    combination: formateResult(smallestCombo),
  };
}

// get possible combinations of exactly n discs
function getCombinations(arr, n) {
  const result = [];
  const indices = Array.from({ length: n }, (_, i) => i);
  while (true) {
    result.push(indices.map((i) => arr[i]));
    let i = n - 1;
    while (i >= 0 && indices[i] === arr.length - 1) {
      i--;
    }
    if (i < 0) {
      break;
    }
    indices[i]++;
    for (let j = i + 1; j < n; j++) {
      indices[j] = indices[i];
    }
  }
  return result;
}

// transform array into obj to make result more readable
// also convert lbs discs from kg to back pound
function formateResult(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    let disc = arr[i];
    // convert lbs back to pound and update its amount
    if (disc % 0.5 !== 0) {
      disc = Math.round(disc / 0.453592);
      if (!obj[`${disc}lbs`]) {
        obj[`${disc}lbs`] = 2;
      } else {
        obj[`${disc}lbs`] += 2;
      }
    }
    // update amount of kg discs
    else {
      if (!obj[`${disc}kg`]) {
        obj[`${disc}kg`] = 2;
      } else {
        obj[`${disc}kg`] += 2;
      }
    }
  }
  return obj;
}
