const fs = require("fs");

const data = fs.readFileSync("Task_3/Task_3.2/input.json");
const jsonData = JSON.parse(data);
// we have array that represent amount of each size of t-shirts 
// inventory[0] = 2 means we have 2 t-shirts with size of S 
const inventory = jsonData.inventory
// participants array represents what sizes every participant chose
// participants[0] = [0, 1] means that first participant can take S or M sized t-shirt
const participants = jsonData.participants

const result= canFulfill(inventory, participants)
fs.writeFileSync("Task_3/Task_3.2/output.json", JSON.stringify(result));





function canFulfill(inventory, participants) { 
  let pool = []
  const participantsNum =  participants.length;
  pool.push(getAllSingleChoice(inventory, participants)); 

  for (let p = 0; p < participantsNum; p++) {
    const newPool = [];
    if (participants[p].length !== 2) continue;
    if (!pool.length) return false

    for (c = 0; c < pool.length; c++) {
      for (let option = 0; option < 2; option++) {
        const combination = [...pool[c]];
        const size = participants[p][option];
        combination[size]++;

        if (isValidCombination(combination) && !hasDuplicate(newPool, combination)) {
          if (totalSum(combination) === participantsNum) {
            return {canFulfill: true,
              combination}
          }
          newPool.push(combination);
        }
      }
    }
    pool = newPool;
  }
  
  return {canFulfill: false}
}

// if participant chose only 1 size, we have to provide exactly this size to him
// so firstly we need to get all single choices from arr
function getAllSingleChoice(inventory, arr) {
  const singleChoice = new Array(inventory.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 2) {
      if (Math.abs(arr[i][0] - arr[i][1]) != 1) {
        return "Invalid input";
      }
    } else {
      const size = participants[i][0];
      singleChoice[size]++;
    }
  }
  return singleChoice;
}

// check if any amount of t-shit have exceed amount  we have
function isValidCombination(arr) {
  for (let i = 0; i < inventory.length; i++) {
    if (arr[i] > inventory[i]) {
      return false;
    }
  }
  return true;
}

// check if arr already has this combination
function hasDuplicate(arr, isDuplicateArr) {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(isDuplicateArr)) {
      return true;
    }
  }
  return false
}

function totalSum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}


