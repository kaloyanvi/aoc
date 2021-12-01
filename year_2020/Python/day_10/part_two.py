with open('Python/day_10/input.txt') as f:

    lines = f.readlines()
    lines = [int(x) for x in lines]  # making everything integers
    lines.append(0) # wall outlet 
    lines.sort()
    lines.append(lines[-1]+3)  # own adapter
    
    combs = [1]
    for line_ind in range(1, len(lines)):

        temp_combs = 0
        for inner_ind in range(line_ind-3, line_ind):

            if lines[inner_ind] + 3 >= lines[line_ind] and inner_ind >= 0:
                temp_combs += combs[inner_ind]

        combs.append(temp_combs)

    print("Answer: %i"%combs[-1])