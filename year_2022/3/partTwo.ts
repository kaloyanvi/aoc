import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(__dirname, 'input.txt')
const input = fs.readFileSync(filePath, { encoding: 'utf-8' }).split('\n')

const findCommonCharacters = (firstHalf: string, secondHalf: string) => {
  const commonChars = []
  firstHalf.split('').forEach((char) => {
    if (secondHalf.includes(char) && !commonChars.includes(char)) {
      commonChars.push(char)
    }
  })
  return commonChars
}

const findCharPriority = (char: string) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const isUpperCase = char === char.toUpperCase()

  const prio = alphabet.indexOf(char.toLowerCase()) + 1
  return isUpperCase ? prio + alphabet.length : prio
}

const findGroupPrioritiesSum = (input: string[]) => {
  let sum = 0
  for (let i = 0; i < input.length; i=i+3) {
    const currentGroup = input.slice(i, i+3)
    const prelimCommon = findCommonCharacters(currentGroup[0], currentGroup[1])
    const badge = findCommonCharacters(prelimCommon.join(''), currentGroup[2])[0]
    sum += findCharPriority(badge)
  }
  console.log('Sum of priorities:', sum)
}

findGroupPrioritiesSum(input)