import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/6/input.txt')

const arrayIsUnique = (str: string) => {
  const arr = str.split('')
  const unique = new Set(arr)
  return unique.size === arr.length
}

const findMarkerIndex = (input: string, markerSize: number) => {
  for (let i = 0; i < input.length; i++) {
    const lastFour = input.slice(0, i).slice(-markerSize)
    const uniqueLastFour = arrayIsUnique(lastFour)
    if (uniqueLastFour && lastFour.length === markerSize) return i
  }
}

const solution = (input: string) => {
  console.log('Packet marker:', findMarkerIndex(input, 4))
  console.log('Message marker:', findMarkerIndex(input, 14))
}

solution(input)
