with open('input.txt') as f:
  lines = f.read().split("\n\n")
lines = [gr.splitlines() for gr in lines]

def find_most_calories(text_file):
  elf_cals = []
  for elf in text_file:
    cals = sum([int(x) for x in elf])
    elf_cals.append(cals)
  elf_cals.sort(reverse=True)
  return sum(elf_cals[:3])

print(find_most_calories(lines))