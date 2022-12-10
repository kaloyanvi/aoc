import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/8/input.txt')

const isVisible = (array, index, treeHeight) => {
  if (index === 0) return true
  const left = array.slice(0, index)
  const right = array.slice(index + 1)
  return left.every((tree) => tree < treeHeight) || right.every((tree) => tree < treeHeight)
}

const treesInView = (array, treeHeight) => {
  let trees = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] < treeHeight) trees++
    else if (array[i] >= treeHeight) return trees + 1
    else return trees
  }
  return trees
}

const calculateScenicScore = (x, y, row, column) => {
  const up = treesInView(column.slice(0, x).reverse(), row[y])
  const down = treesInView(column.slice(x + 1), row[y])
  const left = treesInView(row.slice(0, y).reverse(), row[y])
  const right = treesInView(row.slice(y + 1), row[y])

  return (up * down * left * right)
}

const solution = (input) => {
  const grid = input
    .split('\n')
    .map((line) => line.split('').map((tree) => parseInt(tree)))
  let visibleTrees = 0
  let highestScenicScore = 0
  grid.forEach((row, rowIndex) => {
    row.forEach((tree, treeIndex) => {
      const visibleInRow = isVisible(row, treeIndex, tree)
      const column = grid.map((row) => row[treeIndex])
      const visibleInColumn = isVisible(column, rowIndex, tree)
      if (visibleInRow || visibleInColumn) visibleTrees++

      const scenicScore = calculateScenicScore(rowIndex, treeIndex, row, column)
      if (scenicScore > highestScenicScore) highestScenicScore = scenicScore
    })
  })

  console.log('Visible trees: ', visibleTrees)
  console.log('Highest scenic score: ', highestScenicScore)
}

solution(input)