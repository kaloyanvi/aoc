import itertools

def sumOfTwo(input_list, target):

    for numbers in itertools.combinations(input_list,2):
        if (sum(numbers) == target) and (numbers[0] != numbers[1]):
            return True
    return False

def contigiousSet(input_list, target):

    input_list = [ int(line.strip()) for line in input_list]
    found = False

    for i in range(len(input_list)-1):
        numbers = [input_list[i]]
        for j in range(i+1, len(input_list)):

            numbers.append(input_list[j])
            if sum(numbers) == target:
                found = True
                break
            elif sum(numbers) > target:
                break
        
        if found == True:
            break

    return min(numbers) + max(numbers)


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
            print("Doesnt have sum of two in the preamble %i"%current_element)
            invalid_number = current_element
            break
    
        numb_index += 1

    part_2_answer = contigiousSet(lines, invalid_number)
    print("Sum of the min and max %i"%part_2_answer)