import { loadFile } from '../../loadFile'

// const input = loadFile('year_2023/5/testInput.txt')
const input = loadFile('year_2023/5/input.txt')
const lines = input.split('\n\n')

const parseMap = (mapRows: string[]) => {
  // console.log('\n\nparsing map: ')
  mapRows.shift() // remove the map name
  const row = mapRows.map((line) => line.split(' ').map(Number))
  const sortedRow = row.sort((a, b) => a[1] - b[1])
  // console.log('sortedRow: ', sortedRow)
  return sortedRow
  // return row
}

const parseInput = (lines: string[]) => {
  const seedsString = lines.shift()
  const seeds = seedsString.split('seeds: ')[1].split(' ').map(Number)

  const seedToSoil = parseMap(lines.shift().split('\n'))
  const soilToFertilizer = parseMap(lines.shift().split('\n'))
  const fertilizerToWater = parseMap(lines.shift().split('\n'))
  const waterToLight = parseMap(lines.shift().split('\n'))
  const lightToTemperature = parseMap(lines.shift().split('\n'))
  const temperatureToHumidity = parseMap(lines.shift().split('\n'))
  const humidityToLocation = parseMap(lines.shift().split('\n'))

  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  }
}

// const translate = (value: number, mapValues: number[][]) => {
//   // console.log('\n\nmaking translation for value: ', value)
//   for (const mapValue of mapValues) {
//     // console.log('mapValue: ', mapValue)
//     const [destinationStart, sourceStart, range] = mapValue
//     if (value < sourceStart || value > sourceStart + range) {
//       continue
//     }
//     if (sourceStart <= value && value <= sourceStart + range) {
//       // console.log('Found translation')
//       const diff = sourceStart - destinationStart
//       return value - diff
//     }
//   }
//   return value
// }

const binarySearch = (arr: number[][], value: number) => {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const [destinationStart, sourceStart, range] = arr[mid]

    if (sourceStart <= value && value <= sourceStart + range) {
      return arr[mid]
    } else if (sourceStart > value) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }

  return null
}

const translate = (value: number, mapValues: number[][]) => {
  const mapValue = binarySearch(mapValues, value)
  // console.log('mapped value:', mapValue)

  if (mapValue) {
    const [destinationStart, sourceStart, _] = mapValue
    const diff = sourceStart - destinationStart
    return value - diff
  }

  return value
}

const translateSeedToLocation = (seed: number, maps) => {
  // console.log('\nTranslating seed to location: ', seed)
  const soil = translate(seed, maps.seedToSoil)
  // console.log('Soil: ', soil)
  const fertilizer = translate(soil, maps.soilToFertilizer)
  // console.log('Fertilizer: ', fertilizer)
  const water = translate(fertilizer, maps.fertilizerToWater)
  // console.log('Water: ', water)
  const light = translate(water, maps.waterToLight)
  // console.log('Light: ', light)
  const temperature = translate(light, maps.lightToTemperature)
  // console.log('Temperature: ', temperature)
  const humidity = translate(temperature, maps.temperatureToHumidity)
  // console.log('Humidity: ', humidity)
  const location = translate(humidity, maps.humidityToLocation)
  // console.log('Location: ', location)
  return location
}

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  const maps = parseInput(lines)
  console.log('maps: ', maps)
  const seedsLocations = maps.seeds.map((seed) => {
    return translateSeedToLocation(seed, maps)
  })
  const minLocation = Math.min(...seedsLocations)
  console.log('Solution part 1: ', minLocation)
}

// solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

const getSeedsPairs = (initialSeeds: number[]) => {
  return initialSeeds.reduce(function (result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2))
    return result
  }, [])
}

function solutionPartTwo(lines) {
  const maps = parseInput(lines)
  // console.log('maps: ', maps)
  const seedsPairs = getSeedsPairs(maps.seeds)

  let minLocation = translateSeedToLocation(seedsPairs[0][0], maps)
  seedsPairs.forEach((seedsPair, index) => {
    console.log(`\n\nCompleted: ${index + 1} / ${seedsPairs.length}`)
    const [start, range] = seedsPair
    // console.log('seeds pair: ', [start, range])
    for (let i = start; i < start + range; i++) {
      const location = translateSeedToLocation(i, maps)
      if (location < minLocation) {
        // console.log('Setting min location to: ', location)
        minLocation = location
      }
    }
  })
  console.log('Solution part 2: ', minLocation)
}

solutionPartTwo(lines)
