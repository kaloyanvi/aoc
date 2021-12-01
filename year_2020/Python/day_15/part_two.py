import numpy as np
from tqdm import tqdm

def saveTurn(turns, value, turn):
    turns[value] = turn
    return turns

def memoryGame(value):

    array = np.array([6,19,0,5,7,13,1])  # input array
    count_array= {}

    i = 0
    pbar = tqdm(total=value-1)
    while i < value-1:
        pbar.update(1)
        if len(array) <= 2:  # last element
            element = array[-1]
            if element in count_array.keys():

                if len(array) == 2:
                    if array[-1] == array[-2]:  # two numbers that are same in a row
                        i += 1
                        count_array = saveTurn(count_array, element,i)
                        array = np.array([array[-1],1])
                        continue
                
                i += 1
                last_elem_turn = count_array[element]
                new_number = i - last_elem_turn
                count_array = saveTurn(count_array, element,i)
                array = np.array([array[-1],new_number])
                continue
            else:
                i += 1
                count_array = saveTurn(count_array, element,i)
                array = np.array([array[-1],0])
                continue
        
        elif len(array)-1 == i:
            
            element = array[i]  
            i += 1
            count_array = saveTurn(count_array, element,i)
            array = np.array([0])
            continue
        
        element = array[i]  
        i += 1       
        count_array = saveTurn(count_array, element,i)

    pbar.close()
    return array

print(memoryGame(30000000)[-1])