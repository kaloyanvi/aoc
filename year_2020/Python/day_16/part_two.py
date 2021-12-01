import numpy as np
from itertools import permutations

def checkConstraints(value, constraints):
    for constraint in constraints:
        if value in constraints[constraint][0] or value in constraints[constraint][1]:
            return True
    return False  # didnt pass any of the constraints


def checkOrder(constraints, ticket):  # and again by the order of the Peaky Blinders xDD
    print("BEFORE PERMUTATIONS")
    constraint_perms = list(permutations(constraints))
    print("AFTER PERMUTATIONS")
    for possible_order in constraint_perms:
        print("Possible order")
        check_order = []
        for order_element in possible_order:
            for value in ticket:
                if value in constraints[order_element][0] or value in constraints[order_element][1]:
                    check_order.append("MATCH")
                else:
                    check_order.append("NOT MATCH")
        check = np.diag(np.array(check_order).reshape((3, 3)))

        if np.all(check[0] == check):  # all elements are the same
            #break
            return possible_order


def checkValid(tickets, constraints):
    valid_tickets = []
    for ticket in tickets:
        for value in ticket:
            if checkConstraints(value, constraints):
                continue
            else:
                break
        else:  # only executed if the inner loop did NOT break
            valid_tickets.append(ticket)
    return valid_tickets


def findOrder(valid_tickets, constraints):  # by the order of the peaky blinders xD
    for ticket in valid_tickets:
        print("findOrder", ticket)
        correct_order = checkOrder(constraints, ticket)
        print("findOrder2")
        return correct_order


with open('./Python/day_16/input.txt') as f:
    all_lines = [line.strip() for line in f.readlines()]

    constraint_names = [str([i for i in constraint.split(": ")][0]) for constraint in all_lines[:20]]
    constraint_ranges = [[range(int(condition[0]), int(condition[1])) for condition in [val.split("-") for val in [i for i in constraint.split(": ")][1].split(" or ")]] for constraint in all_lines[:20]]
    constraints = dict(zip(constraint_names, constraint_ranges))
    
    print("HERE")
    my_ticket = [int(val) for val in all_lines[22:23][0].split(",")]
    nearby_tickets = [[int(val) for val in ticket.split(",")] for ticket in all_lines[25:]]
    print("HERE2")
    valid_tickets = checkValid(nearby_tickets, constraints)
    print("HERE3")
    print("Constraints", constraints)
    print(len(valid_tickets))
    print(valid_tickets[0])
    #correct_order = findOrder(valid_tickets[0], constraints)
    #print(valid_tickets)
    #print(correct_order)