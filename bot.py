# imports
import globals
import data
import discord
from discord.ext import commands

# load the data from the file
data.Load()

# set intents
globals.intents = discord.Intents.default()
globals.intents.members = True

# setup bot
globals.bot = commands.Bot(command_prefix='ss!', intents=globals.intents)
globals.bot.remove_command('help')

# import events
from events import ready
from events import member_join
from events import voice_state_update

# import commands
from commands import bind
from commands import clear
from commands import embed
from commands import help
from commands import ticket

# run the bot
globals.bot.run(globals.TOKEN)
