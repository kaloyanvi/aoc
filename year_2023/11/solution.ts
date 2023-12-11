import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/11/input.txt')
const lines = input.split('\n')

type Point = [number, number]

const manhattanDistance = (a: Point, b: Point) => {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}
const transpose = (m) => m[0].map((_, i) => m.map((row) => row[i]))

const isEmpty = (str: string[]) => str.every((cell) => cell === '.')

const getUniversesPositions = (universe: string[][], extraDistance: number) => {
  const universes = {}
  let universeNr = 0
  let rowNr = 0
  for (const row of universe) {
    if (isEmpty(row)) {
      rowNr += extraDistance
      continue
    } else {
      rowNr += 1

      let colNr = 0
      row.forEach((cell, cellIndex) => {
        const col = transpose(universe)[cellIndex]
        if (isEmpty(col)) {
          colNr += extraDistance
        } else {
          colNr += 1
        }
        if (cell === '#') {
          universeNr++
          universes[universeNr] = [rowNr, colNr]
        }
      })
    }
  }
  return universes
}

const sumAllDistances = (universes: any) => {
  const universesKeys = Object.keys(universes)
  let sum = 0
  universesKeys.flatMap((v, i) =>
    universesKeys.slice(i + 1).forEach((w) => {
      const distance = manhattanDistance(universes[v], universes[w])
      sum += distance
    })
  )
  return sum
}

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  const universe = lines.map((line) => line.split(''))
  const universes = getUniversesPositions(universe, 2)
  const sum = sumAllDistances(universes)
  console.log(sum)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  const universe = lines.map((line) => line.split(''))
  const universes = getUniversesPositions(universe, 1000000)
  const sum = sumAllDistances(universes)
  console.log(sum)
}

solutionPartTwo(lines)
