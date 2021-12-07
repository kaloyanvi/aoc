import numpy as np 
from itertools import permutations

def line_intersection(line1, line2):
    xdiff = (line1[0][0] - line1[1][0], line2[0][0] - line2[1][0])
    ydiff = (line1[0][1] - line1[1][1], line2[0][1] - line2[1][1])

    def det(a, b):
        return a[0] * b[1] - a[1] * b[0]

    div = det(xdiff, ydiff)
    if div == 0:
      return False
      #  raise Exception('lines do not intersect')

    d = (det(*line1), det(*line2))
    x = det(d, xdiff) / div
    y = det(d, ydiff) / div
    return x, y

with open('./year_2021/Python/day_5/testInput.txt') as f:

    lines = f.read().split("\n")
    lines = [i.split(" -> ") for i in lines]
    coordinates = []

    for point in lines:
      p1 = point[0].split(",")
      p2 = point[1].split(",")
      lineData = {
        "p1": (int(p1[0]),int(p1[1])),
        "p2": (int(p2[0]),int(p2[1])),
      }
      coordinates.append(lineData)

    perm = permutations(coordinates, 2)
    grid = np.zeros((9,9))
    for i in range(len(grid)):
      # print("\n")
      for x in range(len(grid[i])):
        grid_point = ((i,x), (i,x))
        # print(grid_point)
        # print(grid[i][x])

        
        for p in coordinates:
          dxc = i - p["p1"][0]
          dyc = x - p["p1"][1]

          dxl = p["p2"][0]- p["p1"][0]
          dyl = p["p2"][1]- p["p1"][1]

          cross = dxc * dyl - dyc * dxl;
          l1 = (p["p1"], p["p2"])

          if cross == 0:
            print("Intersects")

          # print(l1)
          # print(grid_point)
          # l2 = (p[1]["p1"], p[1]["p2"])
          # intersect = line_intersection(l1,grid_point)
          # if intersect:
          #   gird[intersect[0]][intersect[1]] += 1
          #   print("\n")
          #   print(intersect)
    # print(grid)



    # for line in coordinates:
    #   # l1 = (line["x1"], line["x2"])
    #   for line2 in coordinates:
    #     if line != line2:
    #       intersect = line_intersection((line["p1"],line["p2"]), (line2["p1"],line2["p2"]))
    #       if intersect:
    #         print("\n")
    #         print line_intersection((line["p1"],line["p2"]), (line2["p1"],line2["p2"]))
    #         print(line)
    #         print(line2)



