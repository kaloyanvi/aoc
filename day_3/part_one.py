with open('input.txt') as f:
    lines = f.readlines()



def countTrees(file, input_index):
    ind = 0
    trees=0
    x="first row"
    for line in file:
        x=list(line)[0:-1]
        try:
            tmp_line = list(line)[0:-1]

            if line[ind] == "#":
                trees+=1

            
            x[ind] = "++"
            print(' ' * ind + "X")
            print(line)
            print("Index", ind)
            

        except IndexError:
            ind = abs(len(line) - ind - 1)
            
            x[ind] = "++"
            print(' ' * ind + "X")
            print(line)
            print("Index", ind)

            if line[ind] == "#":
                trees+=1

        ind += input_index

        print('Trees',trees,'\n\n')
    return(trees)

print(countTrees(lines,3))