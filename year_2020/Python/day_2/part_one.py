import re

with open('input.txt') as f:
    lines = f.readlines()

def find_password(file):

    answer = 0 # passwords that satisfy the criteria
    for line in file:
        
        constraints = [int(s) for s in re.findall(r'\b\d+\b', line)]
        char_index = line.find(":") # index of the : we look for; letter one index before; pass one index after

        char = line[char_index-1]
        password = line[char_index+1:]
        
        count_chars = password.count(char)
        
        # check if the password satisfies the criteria
        if count_chars >= constraints[0] and count_chars <= constraints[1]:
            answer += 1

    return answer

print(find_password(lines))
