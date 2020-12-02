import re

with open('input.txt') as f:
    lines = f.readlines()

def find_password(file):

    answer = 0 # passwords that satisfy the criteria
    for line in file:
        
        constraints = [int(s) for s in re.findall(r'\b\d+\b', line)]
        char_index = line.find(":")  # index of the : we look for; letter one index before; pass one index after

        char = line[char_index-1]  # charracter to look for
        password = line[char_index+1:]

        refined_pass = password[constraints[0]] + password[constraints[1]]  # contains only the two elements 
        count_chars = refined_pass.count(char)

        if count_chars == 1:
            answer += 1

    return answer
        
print(find_password(lines))
