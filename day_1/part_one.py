# Part One

with open('input.txt') as f:
    lines = f.readlines()

def better_linearSearch(txt_file):
    for line in txt_file:
        for nested_line in txt_file:
            line_sum = int(line) + int(nested_line)
            if line_sum == 2020:
                solution = (int(line) * int(nested_line))
                return(print("Solution: %s" %solution))

better_linearSearch(lines)