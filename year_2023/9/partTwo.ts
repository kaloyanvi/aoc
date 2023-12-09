import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/9/input.txt')
const lines = input.split('\n')

const getDiffs = (values: number[]) => {
  const changes = []
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    const nextValue = values[i + 1]
    if (nextValue === undefined) return changes
    const change = nextValue - value
    changes.push(change)
  }
  return changes
}

const lastItem = (arr: number[]) => arr[arr.length - 1]
const isAllSpecificValue = (arr: number[], val: number) =>
  arr.every((v) => v === val)

// get last number from each array
const traverseSequences = (values: number[], diffs: number[]) => {
  const changes = getDiffs(values)
  diffs.unshift(lastItem(changes))
  if (isAllSpecificValue(changes, 0)) return diffs // reached bottom
  return traverseSequences(changes, diffs)
}

const extrapolate = (diffs: number[]) => {
  let prev = 0
  let currExtrapolation = 0
  for (let i = 0; i < diffs.length; i++) {
    const curr = diffs[i]
    currExtrapolation = curr + prev
    prev = currExtrapolation
  }
  return currExtrapolation
}

function solution(lines) {
  let sum = 0
  lines.forEach((line) => {
    const values: number[] = line.split(' ').map(Number).reverse()
    const result = traverseSequences(values, [lastItem(values)])
    const extrapolated = extrapolate(result)
    sum += extrapolated
  })
  console.log('Solution: ', sum)
}

solution(lines)
