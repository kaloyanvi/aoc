
# used to count the bags
def findBag(starting_bag, within_bag, possible_bags):
    for container, contained_bags in within_bag.items():
        
        for contained in contained_bags:  # iterating over the bags contained within the main bag

            # check for bag - first is shiny gold
            if starting_bag == contained["type"]:

                if container not in possible_bags:  # check if its outer bag
                    possible_bags.append(container)  #  add the container bag

                # recursion baby
                possible_bags = findBag(container, within_bag, possible_bags) 

    return possible_bags

# used to store all bag data
container_bag_data = {}  # dict for all bags
with open('Python/day_7/input.txt') as f:

    lines = f.readlines()
    for line in lines:
        line_format = line.strip()  # remove whitespaces 
        
        contained_within = line_format.split('bags contain')  # list of elems. ; [0] - contains; [1] - contained
        container_bag = contained_within[0].strip()  
        contained_bags = contained_within[1].strip().split(',') 

        container_bag_data[container_bag] = []  # will be filled with all contained bags of a container_bag bag

        if contained_within[1] != " no other bags.":  # bags that can contain other bags
            
            for bag in contained_bags:
                contained_bag = {}  # dict for local bag
                contained_bag["type"] = bag.strip().rstrip('.')[1:-4].strip()
                container_bag_data[container_bag].append(contained_bag)  # adding the bag dict to the dict with all bags
                
        else:  # bags that cant contain other bags
            pass

print("Answer %s"%len(findBag("shiny gold", container_bag_data, [])))