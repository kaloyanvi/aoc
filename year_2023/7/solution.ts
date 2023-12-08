import { loadFile } from '../../loadFile'

const input = loadFile('year_2023/7/input.txt')
const lines = input.split('\n')

// cards; weakest to strongest
const cardsValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
]

const cardValuesPart2 = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
]

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

interface Hand {
  cards: string[]
  bid: number
}

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

const compareCards = (a: string, b: string, strengthArray: string[]) =>
  strengthArray.indexOf(a) - strengthArray.indexOf(b)

const compareHands = (a: Hand, b: Hand) => {
  const handAType = getHandType(a.cards)
  const handBType = getHandType(b.cards)
  const handsDiff = handTypes.indexOf(handAType) - handTypes.indexOf(handBType)
  if (handsDiff !== 0) return handsDiff
  // compare firs card; if same, compare next card
  for (let i = 0; i < a.cards.length; i++) {
    const cardsDiff = compareCards(a.cards[i], b.cards[i], cardsValues)
    if (cardsDiff !== 0) return cardsDiff
  }
  return handsDiff
}

function getHandType(unsortedCards: string[]): HandType {
  const cardsCounts = {}
  unsortedCards.forEach((card) => {
    cardsCounts[card] = cardsCounts[card] ? cardsCounts[card] + 1 : 1
  })
  const counts = Object.values(cardsCounts)

  // five of a kind
  if (counts.includes(5)) return HandType.FiveOfAKind
  // four of a kind
  if (counts.includes(4)) return HandType.FourOfAKind
  // full house
  if (counts.includes(3) && counts.includes(2)) return HandType.FullHouse
  // three of a kind
  if (counts.includes(3)) return HandType.ThreeOfAKind
  // two pair
  if (counts.includes(2) && counts.includes(1) && counts.length === 3)
    return HandType.TwoPair
  // one pair
  if (counts.includes(2)) return HandType.OnePair
  // high card
  return HandType.HighCard
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

// most common card with highest value
const findCardToCopy = (currentCards: string[]) => {
  const cardsCounts = currentCards.map((card) => {
    return {
      card,
      count: currentCards.filter((c) => c === card).length,
      cardValue: cardValuesPart2.indexOf(card),
    }
  })
  // sort by count, then by card value
  const sortedCardsCounts = insertionSort(
    cardsCounts,
    (a, b) => b.count - a.count || b.cardValue - a.cardValue
  )
  // console.log('Sorted cards counts: ', sortedCardsCounts)
  return sortedCardsCounts[0].card
}

// jokes can be used as any card possible to get the best hand
const optimiseCards = (cards: string[]) => {
  const numJokers = cards.filter((card) => card === 'J').length
  // if hand has no jokers or return the hand
  if (numJokers === 0) return cards
  // if hand has 5 jokers, return 5 aces
  if (numJokers === 5) return ['A', 'A', 'A', 'A', 'A']
  // find the most common card in hand (except jokers)
  const mostCommonCard = findCardToCopy(cards.filter((card) => card !== 'J'))
  // replace jokers with the most common card
  const optimisedHand = cards.map((card) => {
    if (card === 'J') return mostCommonCard
    return card
  })
  return optimisedHand
}

const compareHandsWithJoker = (a: Hand, b: Hand) => {
  const aHandType = getHandType(optimiseCards(a.cards))
  const bHandType = getHandType(optimiseCards(b.cards))
  const diff = handTypes.indexOf(aHandType) - handTypes.indexOf(bHandType)
  if (diff !== 0) return diff

  // compare firs card; if same, compare next card
  for (let i = 0; i < a.cards.length; i++) {
    const cardsDiff = compareCards(a.cards[i], b.cards[i], cardValuesPart2)
    if (cardsDiff !== 0) return cardsDiff
  }
  return diff
}

function solutionPartTwo(lines) {
  const hands: Hand[] = lines.map((line: string) => {
    const [cards, bid] = line.split(' ')
    return { cards: cards.split(''), bid: Number(bid) }
  })

  const sortedHands = insertionSort(hands, compareHandsWithJoker)
  let score = 0
  sortedHands.forEach((hand, index) => {
    const rank = index + 1
    score += rank * hand.bid
  })
  console.log('Solution part 2: ', score)
}

solutionPartTwo(lines)
