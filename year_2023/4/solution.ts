import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/4/input.txt')
const lines = input.split('\n')

const getLineNums = (s: string) => s.split(/\s+/).filter(Boolean).map(Number)

const parseLine = (line: string, index: number) => {
  const cardNumber = index + 1
  const [left, right] = line.replace(`Card ${cardNumber}: `, '').split(' | ')
  const winningNums = getLineNums(left)
  const myNums = getLineNums(right)
  return [winningNums, myNums]
}

const getNumOfMatches = (winningNums: number[], myNums: number[]) => {
  let matches = 0
  winningNums.forEach((num) => {
    if (myNums.includes(num)) matches++
  })
  return matches
}

/*------------------------------ Part 1 ------------------------------*/

// for every match after 1, multiply by 2
const calculateScore = (matches: number) => {
  if (matches < 2) return matches
  let score = 1
  for (let i = 1; i < matches; i++) {
    score *= 2
  }
  return score
}

function solutionPartOne(lines) {
  let totalScore = 0
  lines.forEach((line, index) => {
    const [winningNums, myNums] = parseLine(line, index)
    const matches = getNumOfMatches(winningNums, myNums)
    const score = calculateScore(matches)
    totalScore += score
  })

  console.log('Solution part 1: ', totalScore)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

const recurseDeck = (cardsDeck, cardIndex = 0) => {
  if (cardIndex >= cardsDeck.length) return cardsDeck
  const currentCard = cardsDeck[cardIndex]
  const { cards, copiesLeft } = currentCard
  const [winningNums, myNums] = cards
  const matches = getNumOfMatches(winningNums, myNums)

  for (let i = 0; i < copiesLeft; i++) {
    for (let i = 1; i <= matches; i++) {
      const card = cardsDeck[cardIndex + i]
      cardsDeck[cardIndex + i] = {
        ...card,
        copiesLeft: card.copiesLeft + 1,
      }
    }
  }
  return recurseDeck(cardsDeck, cardIndex + 1)
}

function solutionPartTwo(lines) {
  const cardsDeck = lines.map((line, index) => {
    return {
      cards: parseLine(line, index),
      copiesLeft: 1,
    }
  })
  const remainingDeck = recurseDeck(cardsDeck)
  const sumOfRemainingCopies = remainingDeck.reduce(
    (acc, card) => acc + card.copiesLeft,
    0
  )
  console.log('Solution part 2: ', sumOfRemainingCopies)
}

solutionPartTwo(lines)
