import globals
import json

def Save():
    with open('data.json', 'w') as fp:
        json.dump(globals.data, fp, sort_keys=True, indent=4)

def Load():
    with open('data.json', 'r') as fp:
        globals.data = json.load(fp);
