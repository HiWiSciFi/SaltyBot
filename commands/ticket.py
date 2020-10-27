import globals
import helpers
import data
import discord

@globals.bot.command('ticket')
async def command_ticket(ctx, *args):
    key = "hasopenedticket_" + str(ctx.message.author.id)

    if key in globals.data:
        embedVar = discord.Embed(title="Ticket could not be opened! You already have an open ticket!", description="", color=globals.defaultcolor)
        embed = await ctx.send(embed=embedVar)
        await helpers.delMessages([embed, ctx.message], 5)
        return

    msg = ""
    for s in args:
        msg += s+" "

    reply = await ctx.send("> "+msg)
    globals.data[key] = reply.id
    data.Save()
