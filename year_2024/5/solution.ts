import { loadFile } from '../../loadFile'

const input = loadFile('year_2024/5/input.txt')

type Graph = Map<number, Set<number>>

function buildGraph(rules: string[]): Graph {
  const graph: Graph = new Map()

  for (const rule of rules) {
    if (!rule) continue
    const [before, after] = rule.split('|').map(Number)

    if (!graph.has(before)) graph.set(before, new Set())
    if (!graph.has(after)) graph.set(after, new Set())

    graph.get(after)!.add(before)
  }

  return graph
}

function isValidOrder(pages: number[], graph: Graph): boolean {
  const seen = new Set<number>()

  for (const page of pages) {
    if (!seen.has(page)) {
      const requirements = graph.get(page)
      if (!requirements) continue

      // Check if all required pages before this one have been seen
      for (const req of requirements) {
        if (pages.includes(req) && !seen.has(req)) {
          return false
        }
      }
    }
    seen.add(page)
  }

  return true
}

function topologicalSort(pages: number[], graph: Graph): number[] {
  const result: number[] = []
  const visited = new Set<number>()
  const temp = new Set<number>()

  function visit(page: number) {
    if (temp.has(page)) return // Skip if in temporary set (cycle detection)
    if (visited.has(page)) return // Skip if already visited

    temp.add(page)

    // Visit all dependencies
    const requirements = graph.get(page)
    if (requirements) {
      for (const req of requirements) {
        if (pages.includes(req)) {
          visit(req)
        }
      }
    }

    temp.delete(page)
    visited.add(page)
    result.unshift(page)
  }

  for (const page of pages) {
    if (!visited.has(page)) {
      visit(page)
    }
  }

  return result
}

// Split input into rules and updates
const [rulesSection, updatesSection] = input.split('\n\n')
const rules = rulesSection.split('\n')
const updates = updatesSection
  .split('\n')
  .filter((line) => line.length > 0)
  .map((update) => update.split(',').map(Number))

const graph = buildGraph(rules)

function solutionPartOne(graph: Graph, updates: number[][]): number[][] {
  let sumValidMiddles = 0
  const invalidUpdates: number[][] = []

  for (const update of updates) {
    if (isValidOrder(update, graph)) {
      const middleIndex = Math.floor(update.length / 2)
      sumValidMiddles += update[middleIndex]
    } else {
      invalidUpdates.push(update)
    }
  }
  console.log('Part 1:', sumValidMiddles)
  return invalidUpdates
}

solutionPartOne(graph, updates)

function solutionPartTwo(graph: Graph, updates: number[][]) {
  const invalidUpdates: number[][] = solutionPartOne(graph, updates)
  let sumInvalidMiddles = 0

  for (const update of invalidUpdates) {
    const sortedUpdate = topologicalSort(update, graph)
    const middleIndex = Math.floor(sortedUpdate.length / 2)
    sumInvalidMiddles += sortedUpdate[middleIndex]
  }
  console.log('Part 2:', sumInvalidMiddles)
}

solutionPartTwo(graph, updates)
