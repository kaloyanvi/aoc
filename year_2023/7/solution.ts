import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/7/input.txt')
const lines = input.split('\n')

// cards; weakest to strongest
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

enum HandType {
  HighCard = 'high-card',
  OnePair = 'one-pair',
  TwoPair = 'two-pair',
  ThreeOfAKind = 'three-of-a-kind',
  FullHouse = 'full-house',
  FourOfAKind = 'four-of-a-kind',
  FiveOfAKind = 'five-of-a-kind',
}
const handTypes = Object.values(HandType)

function insertionSort(arr: any[], compareFn: (a: any, b: any) => number) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i]
    let j
    for (j = i - 1; j >= 0 && compareFn(arr[j], currentValue) > 0; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = currentValue
  }
  return arr
}

const compareCards = (a: string, b: string) =>
  cards.indexOf(a) - cards.indexOf(b)

const compareHands = (a: Hand, b: Hand) => {
  const handAType = getHandType(a.cards)
  const handBType = getHandType(b.cards)
  const handsDiff = handTypes.indexOf(handAType) - handTypes.indexOf(handBType)
  if (handsDiff !== 0) return handsDiff
  // compare firs card; if same, compare next card
  for (let i = 0; i < a.cards.length; i++) {
    const cardsDiff = compareCards(a.cards[i], b.cards[i])
    if (cardsDiff !== 0) return cardsDiff
  }
  return handsDiff
}

function getHandType(unsortedCards: string[]): HandType {
  const sortedCards = insertionSort([...unsortedCards], compareCards)
  // check for find of a kind
  if (sortedCards[0] === sortedCards[4]) {
    return HandType.FiveOfAKind
  }
  // check for four of a kind
  if (sortedCards[0] === sortedCards[3] || sortedCards[1] === sortedCards[4]) {
    return HandType.FourOfAKind
  }
  // check for full house; 3 of a kind and a pair
  if (
    (sortedCards[0] === sortedCards[2] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[4])
  ) {
    return HandType.FullHouse
  }
  // check for three of a kind
  if (
    sortedCards[0] === sortedCards[2] ||
    sortedCards[1] === sortedCards[3] ||
    sortedCards[2] === sortedCards[4]
  ) {
    return HandType.ThreeOfAKind
  }
  // check for two pair; 2 pairs of cards with the same value and 1 different card
  if (
    (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[3]) ||
    (sortedCards[0] === sortedCards[1] && sortedCards[3] === sortedCards[4]) ||
    (sortedCards[1] === sortedCards[2] && sortedCards[3] === sortedCards[4])
  ) {
    return HandType.TwoPair
  }
  // check for one pair; 2 cards of the same value and 3 different cards
  if (
    sortedCards[0] === sortedCards[1] ||
    sortedCards[1] === sortedCards[2] ||
    sortedCards[2] === sortedCards[3] ||
    sortedCards[3] === sortedCards[4]
  ) {
    return HandType.OnePair
  }
  // high card; all cards are distinct
  return HandType.HighCard
}

interface Hand {
  cards: string[]
  bid: number
}

/*------------------------------ Part 1 ------------------------------*/

function solutionPartOne(lines) {
  const hands: Hand[] = lines.map((line: string) => {
    const [cards, bid] = line.split(' ')
    return { cards: cards.split(''), bid: Number(bid) }
  })

  const sortedHands = insertionSort(hands, compareHands)
  let score = 0
  sortedHands.forEach((hand, index) => {
    const rank = index + 1
    score += rank * hand.bid
  })

  console.log('Solution part 1: ', score)
}

solutionPartOne(lines)

/*------------------------------ Part 2 ------------------------------*/

function solutionPartTwo(lines) {
  console.log('Solution part 2: ')
}

// solutionPartTwo(lines)
