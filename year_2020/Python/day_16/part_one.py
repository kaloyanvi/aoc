
def checkConstraints(value, constraints):

    for constraint in constraints:
        if value in constraints[constraint][0] or value in constraints[constraint][1]:
            return True

    return False  # didnt pass any of the constraints

def checkValid(tickets, constraints):

    failed_vals = []
    for ticket in tickets:
        for value in ticket:
            if checkConstraints(value, constraints):
                continue
            else:
                failed_vals.append(value)
                break
    return failed_vals

with open('./Python/day_16/input.txt') as f:
    all_lines = [line.strip() for line in f.readlines()]

    constraint_names = [str([i for i in constraint.split(": ")][0]) for constraint in all_lines[:20]]
    constraint_ranges = [[range(int(condition[0]), int(condition[1])) for condition in [val.split("-") for val in [i for i in constraint.split(": ")][1].split(" or ")]] for constraint in all_lines[:20]]
    constraints = dict(zip(constraint_names, constraint_ranges))
    
    
    my_ticket = [int(val) for val in all_lines[22:23][0].split(",")]
    nearby_tickets = [[int(val) for val in ticket.split(",")] for ticket in all_lines[25:]]

    failed_vals = checkValid(nearby_tickets, constraints)
    print("Answer: %i"%sum(failed_vals))