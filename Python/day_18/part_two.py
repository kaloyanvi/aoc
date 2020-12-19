import re
import regex

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


def plusRules(expression):
    try:  # ends recursion if string is only one int 
        return int(expression)
    
    except:  # will recurse
        expression = expression.split(" ") 
        if "+" in expression:  # prio if plus in expression
            plus_ind = expression.index("+") 
            tmp_expr = expression[plus_ind-1:plus_ind+2]  # [item left of the plus, plus, item right of the plus]
            tmp_expr = ''.join(tmp_expr)  
            expression = ''.join(expression)  

        else:  # no plus
            tmp_expr = ''.join(expression)  
            expression = ''.join(expression) 
        
        signs = [x for x in tmp_expr if x == "+" or x == "*"]  # only the signs
        ints = [int(s) for s in re.findall(r'\b\d+\b', tmp_expr)]  # only the integers
        tmp_result = advCalculus(ints, signs)
        expression = expression.replace(tmp_expr, str(tmp_result),1)  # replacing initial subexpression with its result
        expression = re.sub("[+*]+", lambda ele: " " + ele[0] + " ", expression)  # formatting the string to initial format
        return plusRules(expression)


def calculateExpression(expression):
    if "(" in expression or ")" in expression:
        sub_expr = regexParentheses(expression)  # subexpression within brackets
        sub_result = plusRules(sub_expr[1:-1])  # stripping leading and trailing bracket
        expression = expression.replace(sub_expr, str(sub_result),1)  # replacing initial subexpression with its result
        return calculateExpression(expression)
    
    else:  # no brackets
        result = plusRules(expression)
        return result

result=0
with open('./Python/day_18/input.txt') as f:
    all_lines = [line.strip() for line in f.readlines()]
    for line in all_lines:
        result+=calculateExpression(line)
    print("Answer: %i"%result)