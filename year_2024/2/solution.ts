import { loadFile } from '../../loadFile'

const input = loadFile('year_2024/2/input.txt')
const lines = input.split('\n')

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  let totalReportsSafe = 0
  for (const report of lines) {
    const levels = report.split(' ').map((level) => parseInt(level))
    if (levelsAreSafe(levels)) totalReportsSafe += 1
  }

  console.log('Solution part 1: ', totalReportsSafe)
}

/**
 * Determines if the levels are safe.
 * The levels are either all increasing or all decreasing.
 * Any two adjacent levels differ by at lease 1 and at most 3.
 */
function levelsAreSafe(levels) {
  let mode = 'none'
  let prevLevel = levels[0]

  for (let i = 1; i < levels.length; i++) {
    const level = levels[i]
    const gap = Math.abs(prevLevel - level)

    if (gap > 3 || gap < 1) {
      return false
    }

    let currentMode = 'none'
    if (prevLevel < level) currentMode = 'increasing'
    else if (prevLevel > level) currentMode = 'decreasing'

    if (mode === 'none') {
      mode = currentMode
    } else if (mode !== currentMode && currentMode !== 'none') {
      return false
    }

    prevLevel = level
  }

  return true
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  let totalReportsSafe = 0
  for (const report of lines) {
    const levels = report.split(' ').map((level) => parseInt(level))
    if (levelsAreSafeExceptOne(levels)) totalReportsSafe += 1
  }
  console.log('Solution part 2: ', totalReportsSafe)
}

/**
 * If a level is unsafe, check if removing one of the levels will make it safe.
 */
function levelsAreSafeExceptOne(levels: number[]) {
  if (levelsAreSafe(levels)) return true
  for (let i = 0; i < levels.length; i++) {
    const newLevels = [...levels.slice(0, i), ...levels.slice(i + 1)]
    if (levelsAreSafe(newLevels)) return true
  }
  return false
}

solutionPartTwo(lines)
