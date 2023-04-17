const fs = require("fs")

const file = fs.readFileSync("Task_1/version_1/input.json")
const data = JSON.parse(file)
const number = data.number
const target = data.target

const result = transform(number, target)
fs.writeFileSync("Task_1/version_1/output.json", JSON.stringify(result))

function transform(start, target) {
  start = start < 0 ? Math.abs(start) : start 
  target = target < 0 ? Math.abs(target) : target 

  if (start === target) return {isPossible: true}
  else if (start > target) return {isPossible: false}

  if (target % 2 === 0) {
    return transform(start, target / 2)
  }  
  if ((target - 1) % 10=== 0) {
    const newTarget = (target - 1) / 10
    return transform(start,newTarget)
  }

  return {isPossible: false}
}

