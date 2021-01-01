def playGame(deck1, deck2):

    if len(deck1) == 0 or len(deck2) == 0:  # check if theres winner
        if len(deck1) > len(deck2):
            return deck1
        else:
            return deck2

    else:
        if deck1[0] > deck2[0]:
            deck1.append(deck1[0])
            deck1.append(deck2[0])

        elif deck1[0] < deck2[0]:
            deck2.append(deck2[0])
            deck2.append(deck1[0])

        return playGame(deck1[1:],deck2[1:])

def calculateScore(deck):
    deck_size = len(deck)
    score = 0

    for card in deck:
        score += card * deck_size
        deck_size -= 1
    return score

with open('Python/day_22/input.txt') as f:

    lines = f.readlines()
    lines = [x.strip() for x in lines]  # making everything integers

    p_1 = [int(x) for x in lines[1:27-1]]  # player 1 deck
    p_2 = [int(x) for x in lines[27+1:]]  # player 2 deck 

    winner_deck = playGame(p_1,p_2)
    winner_score = calculateScore(winner_deck)
    print("Answer: %i"%winner_score)