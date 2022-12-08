import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/7/input.txt')

const solution = (lines: string[]) => {
  const dirs = new Map()
  const increment = (path, size) => dirs.set(path, dirs.get(path) + size)
  let currentPath = ''
  
  lines.forEach((line) => {
    if (line.indexOf('$') === 0) {
      const [_, command, destination] = line.split(' ')
      if (command === 'cd') {
        if (destination === '..') {
          currentPath = currentPath.replace(/[a-z]+\/$/gi, '')
        } else {
          currentPath += destination
          if (destination !== '/') currentPath += '/'
  
          if (!dirs.has(currentPath)) {
            dirs.set(currentPath, 0)
          }
        }
      } 
      else if (command === 'ls') dirs.get(currentPath)
    } else if (line.indexOf('dir') !== 0) {
      const size = parseInt(line.split(' ')[0])
      increment(currentPath, size)
      let parentPath = currentPath
      while (parentPath !== '') {
        if (parentPath !== currentPath) {
          increment(parentPath, size)
        }
        parentPath = parentPath.replace(/[a-z]*\/$/gi, '')
      }
    }
  })
  
  const dirSizes = Array.from(dirs.values())
  
  const partOne = Array.from(dirs.values()).reduce(
    (sum, size) => (sum += size <= 100000 ? size : 0),
    0
  )
  
  const goal = 30000000 - (70000000 - dirs.get('/'))
  const sortedDirSizes = dirSizes.sort((a, b) => a - b)
  let i = 0
  while (sortedDirSizes[i] < goal) i++
  const partTwo = sortedDirSizes[i]
  
  console.log('Solution part 1: ', partOne)
  console.log('Solution part 2: ', partTwo)
}

solution(input.split('\n'))
