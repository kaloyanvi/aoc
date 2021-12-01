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


df_filtered["byr"] = pd.to_numeric(df_filtered["byr"])
df_filtered["iyr"] = pd.to_numeric(df_filtered["iyr"])
df_filtered["eyr"] = pd.to_numeric(df_filtered["eyr"])

df_filtered = df_filtered[(df_filtered["byr"] >= 1920) & (df_filtered["byr"] <= 2002)]  # Birth year 1920 and 2002
df_filtered = df_filtered[(df_filtered["iyr"] >= 2010) & (df_filtered["iyr"] <= 2020)]  # Issue year 2010 and 2020
df_filtered = df_filtered[(df_filtered["eyr"] >= 2020) & (df_filtered["eyr"] <= 2030)]  # Issue year 2020 and 2030
df_filtered = df_filtered[df_filtered.hcl.str.contains("(#([0-9]|[a-f]){6})")] # hair color
df_filtered = df_filtered[df_filtered["ecl"].isin(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])] # eye color
df_filtered = df_filtered[df_filtered.pid.str.len() == 9] 

heights = []
hgt_types = []

for i in range(len(df_filtered)):

    tmp_type = df_filtered.iloc[i].hgt[-2:]
    tmp_hgt = df_filtered.iloc[i].hgt[:-2]
    
    if tmp_type == "cm" or tmp_type == "in":
         
        hgt_types.append(tmp_type)
        heights.append(int(tmp_hgt))

    else:
        hgt_types.append(None)
        heights.append(None)


df_filtered['hgt'] = heights
df_filtered['hgt_type'] = hgt_types
df_filtered = df_filtered[((df_filtered['hgt_type'] == "cm") & ((df_filtered['hgt'] >= 150) & (df_filtered['hgt'] <= 193))) | ((df_filtered['hgt_type'] == "in") & ((df_filtered['hgt'] >= 59) & (df_filtered['hgt'] <= 76)))]

print(len(df_filtered))