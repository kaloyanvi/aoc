import { loadFile } from '../../loadFile'

const input = loadFile('year_2024/1/input.txt')
const lines = input.split('\n')

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  let sortedLeft: number[] = []
  let sortedRight: number[] = []

  let index = 0
  for (const line of lines) {
    const [left, right] = line.split('   ').map((value) => parseInt(value))
    sortedLeft = moveLeftIfSmaller(index, left, sortedLeft)
    sortedRight = moveLeftIfSmaller(index, right, sortedRight)
    index++
  }

  let totalDistance = 0
  for (let i = 0; i < sortedLeft.length; i++) {
    const distance = Math.abs(sortedLeft[i] - sortedRight[i])
    totalDistance += distance
  }

  console.log('Total Distance: ', totalDistance)
}

/**
 * Starting from last index, moves the value to the left if it is smaller than
 * the previous value. Recursively calls itself until the value is smaller than
 * the first value in the array.
 */
function moveLeftIfSmaller(
  index: number,
  value: number,
  sortedArray: number[]
): number[] {
  if (index === 0) return [value, ...sortedArray]
  const prevValue = sortedArray[index - 1]
  // if the value is smaller than the previous value, move it to the left
  if (value < prevValue) return moveLeftIfSmaller(index - 1, value, sortedArray)

  // if the value is greater than the previous value, add it at the current index
  return [...sortedArray.slice(0, index), value, ...sortedArray.slice(index)]
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  const leftNums: number[] = []
  const allNums = new Map<number, number>()
  for (const line of lines) {
    const [left, right] = line.split('   ').map((value) => parseInt(value))
    leftNums.push(left)

    const sumSoFar = allNums.get(right) ?? 0
    allNums.set(right, sumSoFar + right)
  }

  let similarityScore = 0
  for (const num of leftNums) {
    const number = allNums.get(num)
    if (!number) continue
    similarityScore += number
  }
  console.log('Solution part 2: ', similarityScore)
}

solutionPartTwo(lines)
