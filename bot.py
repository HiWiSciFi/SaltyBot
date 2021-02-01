# imports
import globals
import data
import discord
from discord.ext import commands

# load the data from the file
data.load()

# create data fields if necessary
if not f'permitted servers' in globals.data:
	globals.data[f'permitted servers'] = []

if not f'creation vcs' in globals.data:
	globals.data[f'creation vcs'] = {}

if not f'created vcs' in globals.data:
	globals.data[f'created vcs'] = []

if not f'channel enumerations' in globals.data:
	globals.data[f'channel enumerations'] = {}

data.save()

# set intents
globals.intents = discord.Intents.default()
globals.intents.members = True

# setup bot
globals.bot = commands.Bot(command_prefix='ss!', intents=globals.intents)
globals.bot.remove_command('help')

# import events
from events import ready
from events import voice_state_update

# import commands
from commands import help
from commands import cccreate
from commands import ccremove
from commands import cclist

# run the bot
globals.bot.run(globals.TOKEN)
