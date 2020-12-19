import regex

def decomposeExpression(expression):
    expression = expression.split(" ")
    ints = []
    signs = []

    for i in expression: # separating the values from the signs
        if i == "+" or i == "*" or i == "-":
            signs.append(i)
        else:
            ints.append(int(i))
    return ints, signs

def advCalculus(ints, signs):

    if len(ints) == 1:
        return ints[0]

    else:
        if signs[0] == "+":
            tmp_sol = ints[0] + ints[1]
        elif signs[0] == "-":
            tmp_sol = ints[0] - ints[1]
        elif signs[0] == "*":
            tmp_sol = ints[0] * ints[1]
    
        ints=ints[2:]
        ints.insert(0,tmp_sol)
        signs=signs[1:]

        return advCalculus(ints,signs)

def regexParentheses(s):
    result = regex.search(r'''
    (?<rec>  # capturing group rec
    \(  # open parenthesis
    (?:  # non-capturing group
    [^()]++  # anyting but parenthesis one or more times without backtracking
    |  # or
    (?&rec)  # recursive substitute of group rec
    )*
    \)  # close parenthesis
    )
    ''',s,flags=regex.VERBOSE)
    return result.captures('rec')[0]

def calculateExpression(expression):

    if "(" in expression or ")" in expression:
        sub_expr = regexParentheses(expression)
        ints, signs = decomposeExpression(sub_expr[1:-1])
        sub_result = advCalculus(ints, signs)
        expression = expression.replace(sub_expr, str(sub_result), 1)

        return calculateExpression(expression)
    
    else:
        ints, signs = decomposeExpression(expression)
        result = advCalculus(ints, signs)

        return result

with open('./Python/day_18/input.txt') as f:

    all_lines = [line.strip() for line in f.readlines()]
    all_sums = []
    for line in all_lines:
        all_sums.append(calculateExpression(line))
    
    print("Answer: %i"%sum(all_sums))