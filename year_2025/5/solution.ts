import { loadFile } from '../../loadFile'

const input = loadFile('year_2025/5/input.txt')

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(input) {
  const [rules, pagesRows] = input
    .split(/\n\s*\n/)
    .map((part) => part.split('\n'))

  const rulesMap = new Map<number, number[]>()
  for (const rule of rules) {
    const [key, value] = rule.split('|').map((part) => parseInt(part))
    if (rulesMap.has(key)) {
      rulesMap.set(key, [...rulesMap.get(key), value])
      continue
    }
    rulesMap.set(key, [value])
  }

  let sum = 0
  for (const row of pagesRows) {
    const pages: number[] = row.split(',').map((part) => parseInt(part))
    if (pagesAreSortedCorrectly(pages, rulesMap)) {
      sum += getMiddleItem(pages)
    }
  }

  console.log('Solution part 1:', sum)
}

solutionPartOne(input)

function pagesAreSortedCorrectly(
  pages: number[],
  rulesMap: Map<number, number[]>
) {
  const visitedPages = []
  for (const page of pages) {
    const rules = rulesMap.get(page)
    if (rules === undefined) {
      visitedPages.push(page)
      continue
    }

    // if the rule is in the visited page, then its not sorted correctly
    if (visitedPages.some((page) => rules.includes(page))) {
      return false
    }

    visitedPages.push(page)
  }
  return true
}

function getMiddleItem<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Cannot get middle item of empty array')
  }

  const middleIndex = Math.floor((arr.length - 1) / 2)
  return arr[middleIndex]
}

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  console.log('Solution part 2: ')
}

solutionPartTwo(input)
