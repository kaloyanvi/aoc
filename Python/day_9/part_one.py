import itertools

def sumOfTwo(input_list, target):

    for numbers in itertools.combinations(input_list,2):
        if (sum(numbers) == target) and (numbers[0] != numbers[1]):
            return True
    return False

with open('Python/day_9/input.txt') as f:

    lines = f.readlines()
    preamble_len = 25

    numb_index=preamble_len
    while numb_index <= len(lines)-1:

        preamble_list = lines[:numb_index][-preamble_len:]
        preamble_list = [int(x.strip()) for x in preamble_list]  # formating the list
        current_element = int(lines[numb_index])

        sum_check = sumOfTwo(preamble_list, current_element)  # boolean
        if sum_check == True:
            pass
        else:
            print("Doesnt have preamble: ", current_element)
            break
    
        numb_index += 1