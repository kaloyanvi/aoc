import numpy as np

with open('Python/day_6/input.txt') as f:
    lines = f.readlines()

def groupsMatrix(input_file):

    all_groups = []
    group_data = []  # needed here for 1st group data

    # Making a matrix to contain the answers of each group
    for line_index in range(len(input_file)):

        line = input_file[line_index]
        if len(line.strip()) == 0:  # new group
            all_groups.append(group_data)
            group_data = []
            continue

        elif line_index == len(input_file)-1:  # last person
            all_groups.append(group_data)

        row = line.split("\n")[0]  # answers as list without \n as last element
        group_data.append(list(row))

    return all_groups


yes_sum = 0
for group in groupsMatrix(lines):
     
    yes_sum += len(set.union(*[set(i) for i in group]))

    
print(yes_sum)