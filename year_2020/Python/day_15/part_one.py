import numpy as np

def memoryGame(value):

    array = np.array([6,19,0,5,7,13,1])  # input array
    count_array= np.array([])

    i = 0
    while i < value-1:

        element = array[i]  
        if i == len(array)-1:  # last element
            if element in count_array:
                if array[i]== array[i-1]:  # two numbers that are same in a row
                    i += 1
                    count_array = np.append(count_array, element)
                    array = np.append(array, 1)
                    continue
                
                i += 1
                last_elem_turn = np.where(count_array==element)[0][-1]
                new_number = i - last_elem_turn -1
                count_array= np.append(count_array, element)
                array = np.append(array, new_number)
                continue
            else:
                i += 1
                count_array= np.append(count_array, element)
                array = np.append(array, 0)
                continue

        i += 1
        count_array= np.append(count_array, element)  # not last element

    return array

print("Answer: %i"%memoryGame(2020)[-1])