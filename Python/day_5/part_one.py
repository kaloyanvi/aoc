import math

with open('day_5/input.txt') as f:
    lines = f.readlines()


def find_RowCol(line, length):

    rows = [i for i in range(length)]
    for index in range(len(line)):

        which_rows = math.floor(len(rows) / 2)
        
        # front part of plane if finding rows
        # left part if finding columns
        if line[index] == "F" or line[index] == "L":
            rows = rows[:which_rows]

        # back part of plane if finding rows
        # right part if finding columns
        elif line[index] == "B" or line[index] == "R":
            rows = rows[which_rows:]

    return int(rows[0])


seat_ids = []
for line in lines:

    row = find_RowCol(line[:7],128)
    col = find_RowCol(line[7:],8)

    seat_id = row * 8 + col
    seat_ids.append(seat_id)

print("Highest seat ID:", max(seat_ids))