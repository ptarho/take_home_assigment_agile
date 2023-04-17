const fs = require("fs")
// read input data
const file = fs.readFileSync("Task_2/version_1/input.json")
const arr = JSON.parse(file).array
//get result and write it in output file
const duplicate = searchDuplicate(arr)
fs.writeFileSync("Task_2/version_1/output.json", JSON.stringify(duplicate))

// this solution use "Floyd's Tortoise and Hare" algorithm to find the duplicate element
function searchDuplicate(arr) {
  // initialize two pointers, slow and the fast one
  let slow = arr[0]
  let fast = arr[arr[0]]
  // traverse the array until the pointers meet, indicating a cycle in the array
  while (slow !== fast) {
    slow = arr[slow]
    fast = arr[arr[fast]]
  }
  console.log(slow, fast)
  let pointer = arr[0]
  let index = 0
  // traverse the array until the two slow pointers meet, indicating duplicate value
  while (pointer !== slow) {
    index = slow
    pointer = arr[pointer]
    slow = arr[slow]
  } 
  return {
    index,
    value: slow
  }
}
const array = [6, 4, 3, 5, 4, 1, 2]
console.log(searchDuplicate(array))