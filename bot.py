import globals
import data
from discord.ext import commands

data.Load()

globals.bot = commands.Bot(command_prefix='ss!')
globals.bot.remove_command('help')

from events import bot_onready

from commands import command_bind
from commands import command_clear
from commands import command_embed
from commands import command_help

globals.bot.run(globals.TOKEN)
