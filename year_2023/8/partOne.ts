import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/8/input.txt')

const getStepsFromTwoNodes = (
  start: string,
  end: string,
  nodesMap: NodesMap,
  directions: string[]
) => {
  let steps = 0
  let index = 0
  let currentNodeKey = start
  while (currentNodeKey !== end) {
    const currentNode = nodesMap.get(currentNodeKey)
    const direction = directions[index]
    currentNodeKey = currentNode[direction]
    steps++
    // reached the end of directions, start from the beginning
    if (index === directions.length - 1) {
      index = 0
    } else {
      index++
    }
  }
  return steps
}

type NodesMap = Map<string, { L: string; R: string }>

function solutionPartOne(input) {
  const [directions, nodes] = input.split('\n\n')

  const nodesMap: NodesMap = new Map()
  let firstNodeKey = null
  nodes.split('\n').forEach((node: string, index) => {
    const [name, directionsUnparsed] = node.split(' = ')
    if (index === 0) {
      firstNodeKey = name
    }
    const [left, right] = directionsUnparsed.replace(/\(|\)|,/g, '').split(' ')
    nodesMap.set(name, { L: left, R: right })
  })

  const stepsRequired = getStepsFromTwoNodes('AAA', 'ZZZ', nodesMap, directions)
  console.log('Steps required: ', stepsRequired)
}

solutionPartOne(input)
