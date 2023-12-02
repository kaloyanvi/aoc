SOLUTION_DIR := year_20$(YEAR)/$(DAY)
SOLUTION_FILE := $(SOLUTION_DIR)/solution.ts
INPUT_FILE := $(SOLUTION_DIR)/input.txt
TEMPLATE_PATH := solutionTemplate.ts

create:
	@echo "Setting up directory..."
	@mkdir -p $(SOLUTION_DIR)
	@touch $(INPUT_FILE)
	@cp ${TEMPLATE_PATH} $(SOLUTION_FILE)
	@echo "Setting up from template..."
	@sed -i '' "s|FILE_PATH_PLACEHOLDER|$(INPUT_FILE)|" $(SOLUTION_FILE)
	@code $(INPUT_FILE)
	@code $(SOLUTION_FILE)
	@echo "Good luck!"
	@nodemon $(SOLUTION_FILE)

.PHONY: create
