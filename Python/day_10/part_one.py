with open('Python/day_10/input.txt') as f:

    lines = f.readlines()
    lines = [int(x) for x in lines]  # making everything integers
    lines.sort()
    
    diffs_list = []
    for line_ind in range(len(lines)-1):
        diff = lines[line_ind + 1] - lines[line_ind]
        diffs_list.append(diff)
    
    diffs_list.append(diffs_list[-1])
    diffs_list.append(3)  # adding my own adapter difference

    print("Answer: %i"%(diffs_list.count(1) * diffs_list.count(3)))