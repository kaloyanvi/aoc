SOLUTION_DIR := year_20$(YEAR)/$(DAY)
SOLUTION_FILE := $(SOLUTION_DIR)/solution.ts
INPUT_FILE := $(SOLUTION_DIR)/input.txt
TEMPLATE_PATH := solutionTemplate.ts

create:
	@echo "Setting up directory..."
	@mkdir -p $(SOLUTION_DIR)
	@if [ ! -f $(INPUT_FILE) ]; then \
		touch $(INPUT_FILE); \
		echo "Created $(INPUT_FILE)"; \
	else \
		echo "$(INPUT_FILE) already exists."; \
	fi
	@if [ ! -f $(SOLUTION_FILE) ]; then \
		cp $(TEMPLATE_PATH) $(SOLUTION_FILE); \
		echo "Created $(SOLUTION_FILE) from template."; \
		sed -i '' "s|FILE_PATH_PLACEHOLDER|$(INPUT_FILE)|" $(SOLUTION_FILE); \
	else \
		echo "$(SOLUTION_FILE) already exists."; \
	fi
	@code $(INPUT_FILE)
	@code $(SOLUTION_FILE)
	@echo "Good luck!"
	@nodemon $(SOLUTION_FILE)

.PHONY: create
