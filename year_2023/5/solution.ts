import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/5/input.txt')
const lines = input.split('\n\n')

const parseMap = (mapRows: string[]) => {
  // console.log('\n\nparsing map: ')
  mapRows.shift() // remove the map name
  const row = mapRows.map((line) => line.split(' ').map(Number))
  const sortedRow = row.sort((a, b) => a[0] - b[0])
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

const translate = (value: number, mapValues: number[][]) => {
  for (const mapValue of mapValues) {
    // console.log('mapValue: ', mapValue)
    const [destinationStart, sourceStart, range] = mapValue
    const diff = sourceStart - destinationStart
    if (sourceStart <= value && value <= sourceStart + range) {
      return value - diff
    }
  }
  return value
}

// const translate = (value: number, mapValues: number[][]) => {
//   for (const mapValue of mapValues) {
//     const [destinationStart, sourceStart, range] = mapValue
//     if (sourceStart > value) {
//       break
//     }
//     const diff = sourceStart - destinationStart
//     if (sourceStart <= value && value <= sourceStart + range) {
//       return value - diff
//     }
//   }
//   return value
// }

const translateSeedToLocation = (seed: number, maps) => {
  const soil = translate(seed, maps.seedToSoil)
  const fertilizer = translate(soil, maps.soilToFertilizer)
  const water = translate(fertilizer, maps.fertilizerToWater)
  const light = translate(water, maps.waterToLight)
  const temperature = translate(light, maps.lightToTemperature)
  const humidity = translate(temperature, maps.temperatureToHumidity)
  const location = translate(humidity, maps.humidityToLocation)
  return location
}

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  const maps = parseInput(lines)

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
  const seedsPairs = getSeedsPairs(maps.seeds)

  let minLocation = translateSeedToLocation(seedsPairs[0][0], maps)
  seedsPairs.forEach((seedsPair, index) => {
    console.log(`Completed: ${index + 1} / ${seedsPairs.length}`)
    const [start, range] = seedsPair
    for (let i = start; i < start + range; i++) {
      const location = translateSeedToLocation(i, maps)
      if (location < minLocation) {
        minLocation = location
      }
    }
  })
  console.log('Solution part 2: ', minLocation)
}

solutionPartTwo(lines)
