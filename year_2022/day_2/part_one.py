with open('input.txt') as f:
  lines = f.readlines()

def get_choice_points(choice):
  if (choice == 'X' or choice == 'A'): # rock
    return 1
  if (choice == 'Y' or choice == 'B'): # paper
    return 2
  if (choice == 'Z' or choice == 'C'): # scissors
    return 3

def win_round(opponent, me):
  if ((me == 'X' and opponent == 'A') | 
  (me == 'Y' and opponent == 'B') | 
  (me == 'Z' and opponent == 'C')):
    return 'draw'
  
  if ((me == 'X' and opponent == 'B') |
  (me == 'Y' and opponent == 'C') |
  (me == 'Z' and opponent == 'A')):
    return 'loss'
  
  if ((me == 'X' and opponent == 'C') |
  (me == 'Y' and opponent == 'A') |
  (me == 'Z' and opponent == 'B')):
    return 'win'
  

def find_total_score(txt_file):
  score = 0
  for line in txt_file:
    opponnent_choice = line[0]
    my_choice = line[2]
    result = win_round(opponnent_choice, my_choice)
    if result == 'win':
      points_to_add = 6 + get_choice_points(my_choice)
      score += points_to_add
    if result == 'draw':
      points_to_add = 3 + get_choice_points(my_choice)
      score += points_to_add
    if result == 'loss':
      points_to_add = 0 + get_choice_points(my_choice)
      score += get_choice_points(my_choice)

  return score

print(find_total_score(lines))