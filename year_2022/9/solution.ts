import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/9/input.txt')

const moveHead = (head, direction) => {
  if (direction === 'U') head.y += 1
  else if (direction === 'D') head.y -= 1
  else if (direction === 'L') head.x -= 1
  else if (direction === 'R') head.x += 1
  return head
}

const moveTail = (tail, head) => {
  const absDiffX = Math.abs(head.x - tail.x)
  const absDiffY = Math.abs(head.y - tail.y)
  if ((absDiffX >= 2)) {
    const diffX = head.x - tail.x
    if (diffX > 0) tail.x++
    else if (diffX < 0) tail.x--

    if (absDiffY >= 1) {
      const diffY = head.y - tail.y
      if (diffY > 0) tail.y++
      else if (diffY < 0) tail.y-- 
    }
    return tail
  }

  if (absDiffY >= 2) {
    const diffY = head.y - tail.y
    if (diffY > 0) tail.y++
    else if (diffY < 0) tail.y-- 

    if (absDiffX >= 1) {
      const diff = head.x - tail.x
      if (diff > 0) tail.x++
      else if (diff < 0) tail.x-- 
    }
    return tail
  }
  return tail
}

const solution = (lines: string[]) => {
  const tailVisitedPositions = [] 
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  lines.forEach((line) => {
    const [direction, distance] = line.split(' ')
    for (let i = 0; i < parseInt(distance); i++) {
      head = moveHead(head, direction)
      tail = moveTail(tail, head)
      tailVisitedPositions.push(`${tail.x}-${tail.y}`)
    }
  })
  console.log('# visited postions: ', [...new Set(tailVisitedPositions)].length)
}

solution(input.split('\n'))