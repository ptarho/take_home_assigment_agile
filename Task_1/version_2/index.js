const fs = require("fs")

const file = fs.readFileSync("Task_1/version_2/input.json")
const data = JSON.parse(file)
const number = data.number
const target = data.target

const result = transform(number, target)
fs.writeFileSync("Task_1/version_2/output.json", JSON.stringify(result))

function transform(start, target) {
  if (start > target) return {isPossible: false}
  if (start === target) return {isPossible: true}

  const queue = [start]

  while (queue.length) {
    let num = queue.shift()
    if (num === target) return {isPossible: true}

    let doubled = num * 2
    if (doubled <= target) {
      queue.push(doubled)
    }

    let addedOne = num * 10 + 1
    if (addedOne <= target) {
      queue.push(addedOne)
    }
  }

  return {isPossible: false}
}

