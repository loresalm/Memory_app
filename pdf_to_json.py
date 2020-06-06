import PyPDF2
import pandas as pd
import json

questions = []
response = []
true = []

data = pd.read_csv('FV.csv', sep=',',encoding= 'unicode_escape')
for d in range(0, len(data["Data"]), 4):
    questions.append(data["Data"][d])
    response.append([data["Data"][d+1], data["Data"][d+2], data["Data"][d+3]])
    if data["Data"][d+1][0] == 'X':
        true.append(1)
        response[-1][0] = response[-1][0].replace("X ", "")
    elif data["Data"][d+2][0] == 'X':
        true.append(2)
        response[-1][1] = response[-1][1].replace("X ", "")
    elif data["Data"][d+3][0] == 'X':
        true.append(3)
        response[-1][2] = response[-1][2].replace("X ", "")
    else:
        print("error X not detected in response")

print("---------Q---------")
print(len(questions))
print("---------R---------")
print(len(response))
print("---------T---------")
print(len(true))



data = {}
data['All'] = []
data['Wrong'] = []


for i, q in enumerate(questions):
    data['All'].append({
        'question': q,
        'choices': response[i],
        'True': true[i]
            })
    data['Wrong'].append({
        'question': q,
        'choices': response[i],
        'True': true[i],
        'try': 0
    })

final_data = {}
final_data['Data'] = data


with open('data_for_memory.txt', 'w') as outfile:
    json.dump(final_data, outfile)

