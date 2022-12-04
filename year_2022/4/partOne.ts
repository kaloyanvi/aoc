import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(__dirname, 'input.txt')
const input = fs.readFileSync(filePath, { encoding: 'utf-8' }).split('\n')

const getRangeFromString = (str: string) => {
  const [min, max] = str.split('-').map((item) => parseInt(item))
  return [min, max]
}

type Range = [number, number]
const fullOverlap = (firstRange: Range, secondRange: Range) => {
  if (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1]) {
    return true
  }
  if (secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[1]) {
    return true
  }
  return false
}

const partOne = (input: string[]) => {
  let pairsWithFullOverlap = 0
  input.forEach((pair) => {
    const [first, second] = pair.split(',')
    const [firstMin, firstMax] = getRangeFromString(first)
    const [secondMin, secondMax] = getRangeFromString(second)
    const full = fullOverlap([firstMin, firstMax], [secondMin, secondMax])
    if (full) pairsWithFullOverlap++
  })
  console.log('Pairs with full overlap:', pairsWithFullOverlap)
}

partOne(input)