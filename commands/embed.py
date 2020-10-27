import globals
import helpers
import discord

@globals.bot.command(name='embed')
async def command_embed(ctx, color,*args):

    tx = ''
    col = None

    colour = color.replace("#", "")
    try:
        col = discord.Color(value=int(colour, 16))
    except:
        col = globals.defaultcolor
        tx += color + ' '

    for s in args:
        tx += s + ' '

    embedVar = discord.Embed(title=tx, description="", color=col)
    await ctx.send(embed=embedVar)

    await helpers.delMessages([ctx.message], 0)
