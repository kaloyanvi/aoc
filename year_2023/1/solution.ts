import { loadFile } from '../../loadFile'

const input = loadFile('/year_2023/1/input.txt')
const lines = input.split('\n')

/*------------------------------ Part 1 ------------------------------*/

const solutionPartOne = (lines) => {
  let sum = 0
  lines.forEach((line: string) => {
    const digits = line.replace(/\D/g, '').split('')
    const firstDigit = digits.shift()
    const lastDigit = digits.pop() ?? firstDigit
    const val = Number(`${firstDigit}${lastDigit}`)
    sum += val
  })
  console.log('Solution part 1: ', sum)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

const stringNums = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const stringToNumber = (str, textNums) => textNums.indexOf(str).toString()
const isDigit = (str: string) => /^\d+$/.test(str)

const findTextNumberInString = (
  str: string,
  numbersStrings: string[]
): string | undefined => {
  for (let j = 0; j < numbersStrings.length; j++) {
    const numberString = numbersStrings[j]
    if (str.includes(numberString)) {
      return stringToNumber(numberString, stringNums)
    }
  }
}

const findFirstNumber = (str: string): string | undefined => {
  let string = ''
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (isDigit(char)) return char
    string += char
    const textNumber = findTextNumberInString(string, stringNums)
    if (textNumber) return textNumber
  }
}

const findLastNumber = (str: string): string | undefined => {
  let string = ''
  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i]
    if (isDigit(char)) return char
    string = char + string
    const textNumber = findTextNumberInString(string, stringNums)
    if (textNumber) return textNumber
  }
}

const solutionPartTwo = (lines) => {
  let sum = 0
  lines.forEach((line: string) => {
    const first = findFirstNumber(line)
    const last = findLastNumber(line)
    const val = Number(`${first}${last}`)
    sum += val
  })

  console.log('Solution part 2: ', sum)
}

solutionPartTwo(lines)
