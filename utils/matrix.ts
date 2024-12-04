export interface Point {
  x: number
  y: number
}

export type Matrix = any[][]

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  UP_LEFT = 'up-left',
  UP_RIGHT = 'up-right',
  DOWN_LEFT = 'down-left',
  DOWN_RIGHT = 'down-right',
}

export const directions: Record<Direction, [number, number]> = {
  [Direction.UP]: [0, -1],
  [Direction.DOWN]: [0, 1],
  [Direction.LEFT]: [-1, 0],
  [Direction.RIGHT]: [1, 0],
  [Direction.UP_LEFT]: [-1, -1],
  [Direction.UP_RIGHT]: [1, -1],
  [Direction.DOWN_LEFT]: [-1, 1],
  [Direction.DOWN_RIGHT]: [1, 1],
}

export function pointIsInBounds(point: Point, matrix: Matrix): boolean {
  return (
    point.x >= 0 &&
    point.x < matrix[0].length &&
    point.y >= 0 &&
    point.y < matrix.length
  )
}

export function traverseMatrix<T>(
  matrix: T[][],
  callback: (point: Point, value: T) => void
) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      callback({ x, y }, matrix[y][x])
    }
  }
}
