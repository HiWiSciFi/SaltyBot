import globals
import json

def save():
    with open('data.json', 'w') as fp:
        json.dump(globals.data, fp, sort_keys=True, indent=4)

def load():
    with open('data.json', 'r') as fp:
        globals.data = json.load(fp);
