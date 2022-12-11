import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/10/input.txt')

type Modifier = number | null

const image = [[]]
const cpuCycle = (cmdIndex, currentCycle, commands, X, mod: Modifier, recs: number[], currentRow=0) => {
  const measureCycles = [20, 60, 100, 140, 180, 220]
  if (cmdIndex >= commands.length) {
    const sum = recs.reduce((a, b) => a + b, 0)
    image.forEach((row) => {
      console.log(row.join(''))
    })
    return sum
  }
  
  const signalStrength = X * currentCycle
  const [currentCmd, modifier] = commands[cmdIndex].split(' ')
  
  if (measureCycles.includes(currentCycle)) recs.push(X * currentCycle)
  
  let nextRow = currentRow
  if (currentCycle % 40 === 0) {
    nextRow = currentRow + 1
    image.push([])
  }

  const coverage = [X - 1, X, X + 1]
  if (coverage.includes(image[currentRow].length)) image[currentRow].push('#')
  else image[currentRow].push('.')

  if (mod) {
    const modifiedX = X + mod
    return cpuCycle(cmdIndex, currentCycle + 1, commands, modifiedX, null, recs, nextRow)
  }

  if (currentCmd === 'noop') {
    return cpuCycle(cmdIndex + 1, currentCycle + 1, commands, X, null, recs, nextRow)
  }
  return cpuCycle(cmdIndex + 1, currentCycle + 1, commands, X, parseInt(modifier), recs, nextRow)
}

const solution = (input) => {
  const sum = cpuCycle(0, 1, input, 1, null, [], 0)
  console.log('sum of all recordings: ', sum)
}

solution(input.split('\n'))