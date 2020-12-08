
def mainLoop(line_ind, accumulator, have_been):

    dynamic_ind = line_ind
    for item in lines[line_ind:]:

        list_vals = item.split(" ")  # list containing operation on [0] and val on [1]
        operation = list_vals[0]
        val = int(list_vals[1])
        have_been.append(dynamic_ind)

        if operation == "nop":
            dynamic_ind += 1
            continue

        elif operation == "acc":
            accumulator += val
            dynamic_ind += 1
            continue  # going to next instruction imediately

        elif operation == "jmp":
            jump_ind = dynamic_ind + val
            if jump_ind in have_been:
                print("About to enter Infinite Loop!")
                print("Accumulator: %i"%accumulator)
                
            else:
                mainLoop(jump_ind, accumulator, have_been)  # mf recursion :)))

        return accumulator
            
            


with open('Python/day_8/input.txt') as f:

    lines = f.readlines()

    accumulator = 0
    line_ind = 0 
    have_been = []

    mainLoop(line_ind, accumulator, have_been)