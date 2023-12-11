import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/11/input.txt')
const lines = input.split('\n')

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]))
}

const expandMatrix = (matrix: string[][]) => {
  const expandedMatrix: string[][] = []
  matrix.forEach((row) => {
    expandedMatrix.push(row)
    if (row.every((cell) => cell === '.')) {
      expandedMatrix.push(row)
    }
  })
  return expandedMatrix
}

function manhattanDist(point1: Point, point2: Point) {
  return Math.abs(point2[0] - point1[0]) + Math.abs(point2[1] - point1[1])
}

type Point = [number, number]

function solution(lines) {
  const universe = lines.map((line) => line.split(''))
  const expandedRows = expandMatrix(universe)
  const expandedUniverse = transpose(expandMatrix(transpose(expandedRows)))
  let count = 0
  const universes = {}
  expandedUniverse.forEach((row, rowNr) => {
    row.forEach((cell, colNr) => {
      if (cell === '#') {
        count++
        universes[count] = [rowNr, colNr]
        return count
      }
    })
  })

  const universesKeys = Object.keys(universes)
  let sum = 0
  universesKeys.flatMap((v, i) =>
    universesKeys.slice(i + 1).forEach((w) => {
      sum += manhattanDist(universes[v], universes[w])
    })
  )
  console.log(sum)
}

solution(lines)
