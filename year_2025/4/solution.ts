import { loadFile } from '../../loadFile'

const input = loadFile('year_2025/4/input.txt')
const lines = input.split('\n')

type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'

const pattern = ['X', 'M', 'A', 'S']

const directions: Direction[] = [
  'up',
  'down',
  'left',
  'right',
  'up-left',
  'up-right',
  'down-left',
  'down-right',
]

interface Point {
  x: number
  y: number
}

function solutionPartOne(lines: string[]) {
  const matrix = lines.map((line) => line.split(''))
  let patternCount = 0

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 'X') {
        for (const direction of directions) {
          if (checkPattern(matrix, { x, y }, direction, pattern, 0)) {
            patternCount++
          }
        }
      }
    }
  }

  return patternCount
}

function checkPattern(
  matrix: string[][],
  point: Point,
  direction: Direction,
  pattern: string[],
  index: number
): boolean {
  if (!pointIsInBounds(point, matrix)) return false
  if (matrix[point.y][point.x] !== pattern[index]) return false

  if (index === pattern.length - 1) return true

  const nextPoint = getNextPoint(point, direction)
  return checkPattern(matrix, nextPoint, direction, pattern, index + 1)
}

function pointIsInBounds(point: Point, matrix: string[][]): boolean {
  return (
    point.x >= 0 &&
    point.x < matrix[0].length &&
    point.y >= 0 &&
    point.y < matrix.length
  )
}

function getNextPoint(point: Point, direction: Direction): Point {
  const nextPoint = { ...point }
  switch (direction) {
    case 'up':
      nextPoint.y--
      break
    case 'down':
      nextPoint.y++
      break
    case 'left':
      nextPoint.x--
      break
    case 'right':
      nextPoint.x++
      break
    case 'up-left':
      nextPoint.y--
      nextPoint.x--
      break
    case 'up-right':
      nextPoint.y--
      nextPoint.x++
      break
    case 'down-left':
      nextPoint.y++
      nextPoint.x--
      break
    case 'down-right':
      nextPoint.y++
      nextPoint.x++
      break
  }
  return nextPoint
}

console.log('Solution part 1:', solutionPartOne(lines))
