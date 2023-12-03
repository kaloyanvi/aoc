import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/3/input.txt')
const lines = input.split('\n')

type Point = number[]

interface NumberItem {
  value: string
  position: [Point, Point]
}

interface SymbolItem {
  value: string
  point: Point
}

const isDigit = (str: string) => /^\d+$/.test(str)

const parseGrid = (lines: string[]) => {
  const values: NumberItem[] = []
  const symbols: SymbolItem[] = []

  lines.forEach((line, y) => {
    let currentNumber: NumberItem | undefined
    line.split('').forEach((char, x) => {
      if (isDigit(char)) {
        if (!currentNumber) {
          currentNumber = {
            value: char,
            position: [
              [x, y],
              [x, y],
            ],
          }
        } else {
          currentNumber.value += char
          currentNumber.position[1][0] = x
        }

        // end of line, add current number to elements
        if (x === line.length - 1) {
          values.push(currentNumber)
          currentNumber = undefined
        }
      }

      // its a symbol
      else {
        if (currentNumber) {
          values.push(currentNumber)
          currentNumber = undefined
        }
        if (char !== '.') {
          symbols.push({
            value: char,
            point: [x, y],
          })
        }
      }
    })
  })

  return { values, symbols }
}
interface NumberAdjacentPositions {
  value: string
  adjacentPositions: Point[]
}

const getAdjacentPoint = (
  point: Point,
  direction: 'T' | 'B' | 'L' | 'R' | 'TL' | 'TR' | 'BL' | 'BR'
): Point => {
  const [x, y] = point
  if (direction === 'T') return [x, y - 1]
  if (direction === 'B') return [x, y + 1]
  if (direction === 'L') return [x - 1, y]
  if (direction === 'R') return [x + 1, y]
  if (direction === 'TL') return [x - 1, y - 1]
  if (direction === 'TR') return [x + 1, y - 1]
  if (direction === 'BL') return [x - 1, y + 1]
  if (direction === 'BR') return [x + 1, y + 1]
}

const findAdjacentPositions = (item: NumberItem): NumberAdjacentPositions => {
  const [start, end] = item.position
  const adjacentPositions = []
  for (let x = start[0]; x <= end[0]; x++) {
    // add the one to the left only if we are at the start
    if (x === start[0]) {
      adjacentPositions.push(getAdjacentPoint(start, 'L'))
      adjacentPositions.push(getAdjacentPoint(start, 'TL'))
      adjacentPositions.push(getAdjacentPoint(start, 'BL'))
    }
    // add the one to the right only if we are at the end
    if (x === end[0]) {
      adjacentPositions.push(getAdjacentPoint(end, 'R'))
      adjacentPositions.push(getAdjacentPoint(end, 'TR'))
      adjacentPositions.push(getAdjacentPoint(end, 'BR'))
    }
    // always want to add the one above and one below
    adjacentPositions.push(getAdjacentPoint([x, start[1]], 'T'))
    adjacentPositions.push(getAdjacentPoint([x, start[1]], 'B'))
  }
  return {
    value: item.value,
    adjacentPositions,
  }
}

/*------------------------------ Part 1 ------------------------------*/

const isNumberAdjacentToSymbol = (
  adjacentPositions: Point[],
  symbol: SymbolItem[]
) => {
  const symbolPositions = symbol.map((s) => s.point)
  for (const adjacentPosition of adjacentPositions) {
    for (const symbolPosition of symbolPositions) {
      if (
        adjacentPosition[0] === symbolPosition[0] &&
        adjacentPosition[1] === symbolPosition[1]
      )
        return true
    }
  }
  return false
}

function solutionPartOne(lines) {
  const { values, symbols } = parseGrid(lines)
  const adjacentNums = values
    .map(findAdjacentPositions)
    .filter((pos) => isNumberAdjacentToSymbol(pos.adjacentPositions, symbols))
  const sum = adjacentNums.reduce((acc, item) => acc + parseInt(item.value), 0)
  console.log('Solution part 1: ', sum)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

const findSymbolsAdjecentToTwoNumbers = (
  symbols: SymbolItem[],
  adjacentPositions: NumberAdjacentPositions[]
) => {
  const allGearRatios = []
  for (const symbol of symbols) {
    const values = []
    for (const adjacentPosition of adjacentPositions) {
      const hasAdjacent = adjacentPosition.adjacentPositions.some(
        (adjacent) =>
          adjacent[0] === symbol.point[0] && adjacent[1] === symbol.point[1]
      )
      if (hasAdjacent) values.push(adjacentPosition.value)
    }
    if (values.length === 2) allGearRatios.push(values[0] * values[1])
  }
  return allGearRatios
}

function solutionPartTwo(lines) {
  const { values, symbols } = parseGrid(lines)
  const adjacentPositions = values.map(findAdjacentPositions)
  const gearRatios = findSymbolsAdjecentToTwoNumbers(symbols, adjacentPositions)
  const sumOfGearRatios = gearRatios.reduce((acc, value) => acc + value, 0)
  console.log('Solution part 2: ', sumOfGearRatios)
}

solutionPartTwo(lines)
