import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/10/input.txt')
// addX V takes two cycles to complete and adds V to X
// noop takes one cycle to complete, does nothing

const lastCycle = 220

type Modifier = number | null

const cpuCycle = (cmdIndex, currentCycle, commands, X, mod: Modifier, recs: number[]) => {
  const measureCycles = [20, 60, 100, 140, 180, 220]
  if (cmdIndex >= commands.length) {
    console.log('\tdone on cycle ', currentCycle)
    const sum = recs.reduce((a, b) => a + b, 0)
    console.log('sum of all recordings: ', sum)
    return X
  }
  
  const signalStrength = X * currentCycle
  const [currentCmd, modifier] = commands[cmdIndex].split(' ')
  console.log('on cycle', currentCycle)
  // console.log('CPU state: ', cpuState)
  console.log('X: ', X)
  console.log('signal strength: ', signalStrength)
  console.log('\tcurrent cmd', currentCmd)
  
  if (measureCycles.includes(currentCycle)) {
    console.log('\tmeasure signal strength')
    console.log(`cycle (${currentCycle}) * X (${X}) = ${signalStrength}`, signalStrength)
    recs.push(signalStrength)
  }
  if (mod) {
    console.log('\tcpu is busy')
    const modifiedX = X + mod

    return cpuCycle(cmdIndex, currentCycle + 1, commands, modifiedX, null, recs)
  }

  if (currentCmd === 'noop') {
    console.log('\t do nothing')
    return cpuCycle(cmdIndex + 1, currentCycle + 1, commands, X, null, recs)
  }

  // console.log('\tmodifier', parseInt(modifier))
  // const modifiedX = X + parseInt(modifier)
  return cpuCycle(cmdIndex + 1, currentCycle + 1, commands, X, parseInt(modifier), recs)
  
}



const solution = (input) => {
  const X = cpuCycle(0, 1, input, 1, null, [])
  console.log('\n\nX after last cycle: ', X)

}

solution(input.split('\n'))