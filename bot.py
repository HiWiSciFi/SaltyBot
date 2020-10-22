import globals
import data
import discord
from discord.ext import commands

data.Load()

globals.intents = discord.Intents.default()
globals.intents.members = True
globals.bot = commands.Bot(command_prefix='ss!', intents=globals.intents)
globals.bot.remove_command('help')

from events import ready
from events import member_join

from commands import bind
from commands import clear
from commands import embed
from commands import help

globals.bot.run(globals.TOKEN)
