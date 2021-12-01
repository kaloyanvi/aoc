import re
import pandas as pd

with open('input.txt') as f:
    lines = f.readlines()

# Preparing empty dataframe to store the passport data
passport_data = {"byr":[], "iyr":[], "eyr":[], "hgt":[], "hcl":[], "ecl":[], "pid":[], "cid":[]}
df_passport = pd.DataFrame(passport_data)

tmp_row = {} # has to be defined here to store the very first passport
for line in lines:

    # Empty lines indicate separation between passports
    if len(line.strip()) != 0:
        
        line_format = line.split()
        for f_line in line_format:

            sep_index = f_line.find(":")
            info_type = f_line[:sep_index]
            data_point = f_line[sep_index+1:]

            tmp_row[info_type] = data_point

    # Not empty row - new passport or the last line
    if len(line.strip()) == 0 or line == lines[-1]:

        df_passport = df_passport.append(tmp_row, ignore_index=True)
        tmp_row = {}

# All passports that do not have any other NaNs than the one in 'cid'
df_filtered = df_passport[df_passport[['byr', 'iyr', 'eyr', 'hgt', 'ecl', 'pid', 'hcl']].notnull().all(1)]
print(len(df_filtered))