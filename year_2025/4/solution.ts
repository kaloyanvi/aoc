import { loadFile } from '../../loadFile'
import {
  Direction,
  directions,
  Point,
  pointIsInBounds,
  traverseMatrix,
} from '../../utils/matrix'

const input = loadFile('year_2025/4/input.txt')
const lines = input.split('\n')

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines: string[]) {
  const matrix = lines.map((line) => line.split(''))
  let count = 0
  traverseMatrix(matrix, (point, value) => {
    if (value !== 'X') return undefined

    for (const direction of Object.keys(directions) as Direction[]) {
      if (
        hasValidXmasPattern(matrix, point, direction, ['X', 'M', 'A', 'S'], 0)
      ) {
        count++
      }
    }
  })

  return count
}

console.log('Solution part 1:', solutionPartOne(lines))

function hasValidXmasPattern(
  matrix: string[][],
  point: Point,
  direction: Direction,
  pattern: string[],
  index: number
): boolean {
  if (!pointIsInBounds(point, matrix)) return false
  if (matrix[point.y][point.x] !== pattern[index]) return false
  if (index === pattern.length - 1) return true

  const [dx, dy] = directions[direction]
  return hasValidXmasPattern(
    matrix,
    { x: point.x + dx, y: point.y + dy },
    direction,
    pattern,
    index + 1
  )
}

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines: string[]) {
  const matrix = lines.map((line) => line.split(''))
  let xMasCount = 0

  traverseMatrix(matrix, (point, value) => {
    if (value !== 'A') return
    if (!hasValidXPattern(matrix, point)) return
    xMasCount++
  })

  return xMasCount
}

console.log('Solution part 2:', solutionPartTwo(lines))

function hasValidXPattern(matrix: string[][], center: Point): boolean {
  const points = {
    upperLeft: { x: center.x - 1, y: center.y - 1 },
    upperRight: { x: center.x + 1, y: center.y - 1 },
    lowerLeft: { x: center.x - 1, y: center.y + 1 },
    lowerRight: { x: center.x + 1, y: center.y + 1 },
  }

  const values = Object.fromEntries(
    Object.entries(points).map(([key, point]) => [
      key,
      pointIsInBounds(point, matrix) ? matrix[point.y][point.x] : null,
    ])
  )

  const diagonal1Valid =
    (values.upperLeft === 'M' && values.lowerRight === 'S') ||
    (values.upperLeft === 'S' && values.lowerRight === 'M')

  const diagonal2Valid =
    (values.upperRight === 'M' && values.lowerLeft === 'S') ||
    (values.upperRight === 'S' && values.lowerLeft === 'M')

  return diagonal1Valid && diagonal2Valid
}
