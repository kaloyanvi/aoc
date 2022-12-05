import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/5/input.txt')
const [startingGrid, instructions] = input.split('\n\n') 

interface Instruction {
  crates: number
  from: number 
  to: number
}
const parseInstructions = (instructions: string) => {
  const parsedInstructions: Instruction[] = []
  instructions.split('\n').forEach((instruction) => {
    const instuctionNums = instruction.split(/[^0-9]+/)
    instuctionNums.shift()
    const [crates, from, to] = instuctionNums.map((item) => parseInt(item))
    parsedInstructions.push({ crates, from: from - 1, to: to - 1 })
  })
  return parsedInstructions
}

const parseStartingGrid = (startingGrid: string) => {
  const cols = parseInt(startingGrid[startingGrid.length - 2])
  const gridLines = startingGrid.split('\n')
  gridLines.splice(-1)

  const stacks = Array.from(Array(cols), () => [])
  gridLines.forEach((line) => {
    let x = 1
    for (let i = 0; i < cols; i++) {
      if (line[x] !== ' ') stacks[i].push(line[x])
      x += 4
    }
  })
  return stacks.map((stack) => stack.reverse())
}

const solution = () => {
  const parsedGridOne = parseStartingGrid(startingGrid)
  const parsedGridTwo = parseStartingGrid(startingGrid)

  parseInstructions(instructions).forEach((i) => {
    const cratesToMoveOne = parsedGridOne[i.from].splice(-i.crates)
    parsedGridOne[i.to].push(...cratesToMoveOne.reverse())
    const cratesToMoveTwo = parsedGridTwo[i.from].splice(-i.crates)
    parsedGridTwo[i.to].push(...cratesToMoveTwo)
  })
  const partOne = parsedGridOne.map((stack) => stack[stack.length -1]).join('')
  const partTwo = parsedGridTwo.map((stack) => stack[stack.length -1]).join('')
  console.log('Solution part 1: ', partOne)
  console.log('Solution part 2: ', partTwo)
}

solution()
