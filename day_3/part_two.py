with open('input.txt') as f:
    lines = f.readlines()



def countTrees(file, input_index, move_down):
    ind = 0
    trees=0
    x="first row"
    iterator = 0
    for line in file:

        
        if iterator % move_down == 0:
            iterator += 1
            pass
        else:
            iterator += 1
            continue
        
        x=list(line)[0:-1]
        try:
            tmp_line = list(line)[0:-1]

            if line[ind] == "#":
                trees+=1

            
            x[ind] = "++"
            

        except IndexError:
            ind = abs(len(line) - ind - 1)
            x[ind] = "++"

            if line[ind] == "#":
                trees+=1

        ind += input_index
    
    return(trees)

print(countTrees(lines,1,1) * countTrees(lines,3,1) * countTrees(lines,5,1) * countTrees(lines,7,1) * countTrees(lines,1,2))
