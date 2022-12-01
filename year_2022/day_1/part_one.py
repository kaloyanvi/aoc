with open('input.txt') as f:
  lines = f.read().split("\n\n")
lines = [gr.splitlines() for gr in lines]

def find_most_calories(text_file):
  most_cals = 0
  for elf in text_file:
    cals = sum([int(x) for x in elf])
    if cals > most_cals:
      most_cals = cals
  return most_cals

print(find_most_calories(lines))