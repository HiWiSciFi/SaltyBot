import globals
import helpers
import discord

@globals.bot.command('help')
async def command_help(ctx):
    desc = ''
    desc += '`help` shows this message\n'
    desc += '`bind` binds the bot to the current channel\n'
    desc += '`clear` clears the current channel of messages\n'
    desc += '`embed [color hex] <message>` embeds a message in the current channel\n'
    desc += '`ticket <message>` creates a ticket to be handled by a server administrator'
    embedVar = discord.Embed(title="Help - prefix = ss!", description=desc, color=0xFF0099)
    msg = await ctx.send(embed=embedVar)
    await helpers.delMessages([ctx.message, msg], 20)
