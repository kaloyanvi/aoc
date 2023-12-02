import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/2/input.txt')
const lines = input.split('\n')

interface Game {
  id: number
  rounds: CubesCount[]
}

interface CubesCount {
  blue: number
  red: number
  green: number
}

const parseRound = (round: string): CubesCount => {
  const cubeCount: CubesCount = { blue: 0, red: 0, green: 0 }
  const cubes = round.trimStart().split(', ')
  cubes.forEach((cube) => {
    const [count, color] = cube.split(' ')
    cubeCount[color] = parseInt(count)
  })
  return cubeCount
}

const parseGame = (line: string, index: number): Game => {
  const gameID = index + 1
  const gameRounds = line.replace(`Game ${gameID}:`, '').split(';')
  return {
    id: index + 1,
    rounds: gameRounds.map((round) => parseRound(round)),
  }
}

/*------------------------------ Part 1 ------------------------------*/

const gameIsPossible = (game: Game, max: CubesCount): boolean => {
  const { rounds } = game
  for (const round of rounds) {
    if (round.blue > max.blue || round.red > max.red || round.green > max.green)
      return false
  }
  return true
}

function solutionPartOne(lines: string[]) {
  const maxCubes: CubesCount = {
    blue: 14,
    red: 12,
    green: 13,
  }
  const possibleGames = lines
    .map(parseGame)
    .filter((game) => gameIsPossible(game, maxCubes))

  const sumIDs = possibleGames.reduce((acc, game) => acc + game.id, 0)
  console.log('Solution part 1: ', sumIDs)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

const findCubesPower = (game: Game): number => {
  const red = Math.max(...game.rounds.map((round) => round.red))
  const blue = Math.max(...game.rounds.map((round) => round.blue))
  const green = Math.max(...game.rounds.map((round) => round.green))
  return red * blue * green
}

function solutionPartTwo(lines) {
  const cubesPower = lines.map(parseGame).map(findCubesPower)
  const sumCubesPower = cubesPower.reduce((acc, cubes) => acc + cubes, 0)
  console.log('Solution part 2: ', sumCubesPower)
}

solutionPartTwo(lines)
