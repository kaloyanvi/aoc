with open('input.txt') as f:
  lines = f.readlines()

def get_choice_points(choice):
  if (choice == 'X' or choice == 'A'): # rock
    return 1
  if (choice == 'Y' or choice == 'B'): # paper
    return 2
  if (choice == 'Z' or choice == 'C'): # scissors
    return 3
  
def find_my_choice(result, opponent_choice):
  if result == 'X': # loss
    if opponent_choice == 'A':
      return 'Z'
    if opponent_choice == 'B':
      return 'X'
    if opponent_choice == 'C':
      return 'Y'
  if result == 'Y': # draw
    if opponent_choice == 'A':
      return 'X'
    if opponent_choice == 'B':
      return 'Y'
    if opponent_choice == 'C':
      return 'Z'
  if result == 'Z': # win
    if opponent_choice == 'A':
      return 'Y'
    if opponent_choice == 'B':
      return 'Z'
    if opponent_choice == 'C':
      return 'X'

def find_total_score(txt_file):
  score = 0
  for line in txt_file:
    opponnent_choice = line[0]
    result = line[2]
    my_choice = find_my_choice(result, opponnent_choice)

    if result == 'Z':
      points_to_add = 6 + get_choice_points(my_choice)
      score += points_to_add
    if result == 'Y':
      points_to_add = 3 + get_choice_points(my_choice)
      score += points_to_add
    if result == 'X':
      points_to_add = 0 + get_choice_points(my_choice)
      score += get_choice_points(my_choice)

  return score

print(find_total_score(lines))