import globals
import helpers
import data
import discord

@globals.bot.command('ticket')
async def command_ticket(ctx, *args):
    key = "hasopenedticket_" + str(ctx.message.author.id)

    if key in globals.data:
        embedVar = discord.Embed(title="Es konnte kein Ticket erstellt werden! Du hast bereits ein offenes Ticket!", color=globals.defaultcolor)
        embed = await ctx.send(embed=embedVar)
        await helpers.delMessages([embed, ctx.message], 5)
        return

    msg = ""
    for s in args:
        msg += s+" "

    reply = await ctx.send("> "+msg)
    globals.data[key] = reply.id
    data.Save()
