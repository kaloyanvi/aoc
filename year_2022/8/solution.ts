import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/8/input.txt')

const isVisible = (array, index, treeHeight) => {
  // console.log('\t check if visible in array')
  if (index === 0) return true
  const left = array.slice(0, index)
  // console.log('\t left', left)
  const right = array.slice(index + 1)
  // console.log('\t right', right) 
  return left.every((tree) => tree < treeHeight) || right.every((tree) => tree < treeHeight)
}

const solution = (input) => {
  const grid = input
    .split('\n')
    .map((line) => line.split('').map((tree) => parseInt(tree)))
  let visibleTrees = 0
  grid.forEach((row, rowIndex) => {
    row.forEach((tree, treeIndex) => {
      const visibleInRow = isVisible(row, treeIndex, tree)
      const column = grid.map((row) => row[treeIndex])
      const visibleInColumn = isVisible(column, rowIndex, tree)
      if (visibleInRow || visibleInColumn) visibleTrees++
    })
  })

  console.log('visible trees: ', visibleTrees)

}

solution(input)