import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/11/input.txt')
const lines = input.split('\n')

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]))
}

const timeTravel = (matrix: string[][]): number[] => {
  const expandedMatrix: number[] = []
  matrix.forEach((row, index) => {
    if (row.every((cell) => cell === '.')) {
      expandedMatrix.push(index)
    }
  })
  return expandedMatrix
}

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  )

function manhattanDist(
  point1: Point,
  point2: Point,
  timeTravelRows: number[],
  timeTravelCols: number[],
  multiplier: number
) {
  // check if we need to add time travel
  const xPoints = [point1[0], point2[0]].sort()
  const yPoints = [point1[1], point2[1]].sort()

  let xDistance = Math.abs(xPoints[1] - xPoints[0])
  arrayRange(xPoints[0], xPoints[1], 1).forEach((i) => {
    if (timeTravelRows.includes(i)) {
      xDistance += multiplier
    }
  })

  let yDistance = Math.abs(yPoints[1] - yPoints[0])
  arrayRange(yPoints[0], yPoints[1], 1).forEach((i) => {
    if (timeTravelCols.includes(i)) {
      yDistance += multiplier
    }
  })
  return xDistance + yDistance
}

type Point = [number, number]

function solution(lines) {
  const universe = lines.map((line) => line.split(''))

  const expandedRows = timeTravel(universe)
  const expandedCols = timeTravel(transpose(universe))

  let count = 0
  const universes = {}

  universe.forEach((row, rowNr) => {
    return row.map((cell, colNr) => {
      if (cell === '#') {
        count++
        universes[count] = [rowNr, colNr]
        return count
      }
      return cell
    })
  })

  const universesKeys = Object.keys(universes)

  let sum = 0
  universesKeys.flatMap((v, i) =>
    universesKeys.slice(i + 1).forEach((w) => {
      sum += manhattanDist(
        universes[v],
        universes[w],
        expandedRows,
        expandedCols,
        999999
      )
    })
  )
  console.log(sum)
}
solution(lines)
