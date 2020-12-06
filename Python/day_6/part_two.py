with open('Python/day_6/input.txt') as f:
    lines = f.read().split("\n\n")
lines = [gr.splitlines() for gr in lines]

def allYesAnswers(input):
    all_yes = 0
    for group in input:
        
        group_set=None  # empty set; will contain all yes answers
        for person in group:

            person_answer = set(person)  # person answers        
            if group_set is None:  # if no answers
                group_set = person_answer  
                continue  # skipping to next person
            
            # intersection of all people who answered yes
            group_set = group_set.intersection(person_answer)

        all_yes += len(group_set)  # answer

    return all_yes
    
print(allYesAnswers(lines))