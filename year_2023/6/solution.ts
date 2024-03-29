import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/6/input.txt')
const lines = input.split('\n')

const getWinningWays = (raceDuration: number, recordDistance: number) => {
  let winningWays = 0
  for (let btnHold = 1; btnHold <= raceDuration; btnHold++) {
    const remainingRaceDuration = raceDuration - btnHold
    const canTravelDistance = btnHold * remainingRaceDuration
    if (canTravelDistance > recordDistance) winningWays++
  }
  return winningWays
}

/*------------------------------ Part 1 ------------------------------*/

const parse = (str: string) => str.trim().split(/[ ]+/).map(Number)
function solutionPartOne(lines) {
  const durations = parse(lines[0].replace(/Time:/, ''))
  const records = parse(lines[1].replace(/Distance:/, ''))
  const winningWaysPerRace = durations.map((duration, index) =>
    getWinningWays(duration, records[index])
  )
  const multiplied = winningWaysPerRace.reduce((acc, val) => acc * val, 1)
  console.log('Solution part 1: ', multiplied)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  const raceDuration = lines[0].replace(/Time:|\s/g, '')
  const recordDistance = lines[1].replace(/Distance:|\s/g, '')
  const winningWays = getWinningWays(raceDuration, recordDistance)
  console.log('Solution part 2: ', winningWays)
}

solutionPartTwo(lines)
