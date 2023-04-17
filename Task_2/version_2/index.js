const fs = require("fs")
// read input data
const file = fs.readFileSync("Task_2/version_2/input.json")
const arr = JSON.parse(file).array
//get result and write it in output file
const duplicate = searchDuplicate(arr)
fs.writeFileSync("Task_2/version_2/output.json", JSON.stringify(duplicate))

//this algorithm will work only if given array contains exactly one duplicate number
//arr = [1, 5, 2, 3, 5, 4] will work correctly while arr = [1, 3, 3, 4, 1] or arr = [3,3,3,3] won`t
function searchDuplicate(arr) {
  const n = arr.length - 1
  const validSum = (n * (n + 1) / 2)
  // calculate sum of given arr
  const sumOfArr = arr.reduce((acc, curr) => acc+curr, 0)
  // calculate value of duplicate
  const duplicateValue = sumOfArr - validSum
  // find index of duplicate value
  const indexOfDuplicate = arr.findIndex(e => e === duplicateValue)

  return {
    index: indexOfDuplicate,
    value: duplicateValue
  }
}

