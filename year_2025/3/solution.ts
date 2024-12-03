import { loadFile } from '../../loadFile'

const input = loadFile('year_2025/3/input.txt')
const lines = input.split('\n')

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  let totalSum = 0
  for (const line of lines) {
    totalSum += calculateCorruptedString(line)
  }
  console.log('Solution part 1: ', totalSum)
}

function calculateCorruptedString(str: string) {
  const matches = getMatches(str, /mul\(([1-9]\d{0,2}),([1-9]\d{0,2})\)/g)
  let sumOfMatches = 0
  for (const match of matches) {
    const [, a, b] = match
    sumOfMatches += parseInt(a) * parseInt(b)
  }
  return sumOfMatches
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  let totalSum = 0
  let multiplyEnabled = true
  for (const line of lines) {
    const matches = getMatches(
      line,
      /(?:mul\(([1-9]\d{0,2}),([1-9]\d{0,2})\)|do(?:n't)?\(\))/g
    )

    let sumOfMatches = 0
    for (const match of matches) {
      const [maybeRule, a, b] = match

      if (maybeRule.includes("don't")) {
        multiplyEnabled = false
        continue
      }

      if (maybeRule.includes('do')) {
        multiplyEnabled = true
        continue
      }

      if (!multiplyEnabled) continue
      sumOfMatches += parseInt(a) * parseInt(b)
    }

    totalSum += sumOfMatches
  }
  console.log('Solution part 2: ', totalSum)
}

solutionPartTwo(lines)

/*------------------------------ Utils --------------------------------*/

function getMatches(str: string, regex: RegExp) {
  return [...str.matchAll(regex)]
}
