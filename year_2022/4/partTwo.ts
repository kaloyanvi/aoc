import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/4/input.txt').split('\n')
const getRangeFromString = (str: string) => {
  const [min, max] = str.split('-').map((item) => parseInt(item))
  return [min, max]
}

type Range = [number, number]
const partialOverlap = (firstRange: Range, secondRange: Range) => {
  if (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[0]) {
    return true
  }
  if (secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[0]) {
    return true
  }
  return false
}

const partTwo = (input: string[]) => {
  let parsWithPartialOverlap = 0
  input.forEach((pair) => {
    const [first, second] = pair.split(',')
    const [firstMin, firstMax] = getRangeFromString(first)
    const [secondMin, secondMax] = getRangeFromString(second)
    const partial = partialOverlap([firstMin, firstMax], [secondMin, secondMax])
    if (partial) parsWithPartialOverlap++
  })
  console.log('Pairs with partial overlap:', parsWithPartialOverlap)
}

partTwo(input)