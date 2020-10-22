import globals
import discord

@globals.bot.event
async def on_ready():
    await globals.bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name="salt"))
    print(f'{globals.bot.user.name} successfully connected to discord!')
