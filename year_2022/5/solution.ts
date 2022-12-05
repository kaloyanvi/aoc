import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/5/input.txt')
const [startingGrid, instructions] = input.split('\n\n') 

interface Instruction {
  crates: number
  from: number 
  to: number
}
const parseInstructions = (instructions: string) => {
  const instructionsArray = instructions.split('\n')
  const parsedInstructions: Instruction[] = []
  instructionsArray.forEach((instruction) => {
    const instuctionNums = instruction.split(/[^0-9]+/)
    instuctionNums.shift()
    const [crates, from, to] = instuctionNums.map((item) => parseInt(item))
    parsedInstructions.push({ crates, from: from - 1, to: to - 1 })
  })
  return parsedInstructions
}

const parseStartingGrid = (startingGrid: string) => {
  const cols = 9 // TODO: make this dynamic
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

const partOne = () => {
  const parsedInstructions = parseInstructions(instructions)
  const parsedGrid = parseStartingGrid(startingGrid)
  parsedInstructions.forEach((instruction) => {
    const { crates, from, to } = instruction
    const cratesToMove = parsedGrid[from].splice(-crates)
    parsedGrid[to].push(...cratesToMove.reverse())
  })
  const solution = parsedGrid.map((stack) => stack[stack.length -1]).join('')
  console.log('Solution part 1: ', solution)
}

const partTwo = () => {
  const parsedInstructions = parseInstructions(instructions)
  const parsedGrid = parseStartingGrid(startingGrid)
  parsedInstructions.forEach((instruction) => {
    const { crates, from, to } = instruction
    const cratesToMove = parsedGrid[from].splice(-crates)
    parsedGrid[to].push(...cratesToMove)
  })
  const solution = parsedGrid.map((stack) => stack[stack.length -1]).join('')
  console.log('Solution part 2: ', solution)
}

partOne()
partTwo()
