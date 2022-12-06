import { loadFile } from '../../loadFile'

const input = loadFile('/year_2022/6/input.txt')

const arrayIsUnique = (str: string) => {
  const arr = str.split('')
  const unique = new Set(arr)
  return unique.size === arr.length
}

const findMarkerIndex = (input: string, markerSize: number) => {
  for (let i = 0; i < input.length; i++) {
    const currentString = input.slice(0, i)
    const lastFour = currentString.slice(-markerSize)
    const uniqueLastFour = arrayIsUnique(lastFour)
    if (uniqueLastFour && lastFour.length === markerSize) return i
  }
}

const solution = (input: string) => {
  const packetMarker = findMarkerIndex(input, 4)
  const messageMarker = findMarkerIndex(input, 14)
  console.log('Packet marker:', packetMarker)
  console.log('Message marker:', messageMarker)
}

solution(input)
