import globals
import helpers
import discord

@globals.bot.command('help')
async def command_help(ctx):
    desc = ''
    desc += '`help` zeigt diese Nachricht\n'
    desc += '`bind` Begrenzt den Bot auf den momentanen Channel\n'
    desc += '`clear` Löscht alle Nachrichten aus dem momentanen Channel\n'
    desc += '`embed [Farbe hex] <Nachricht>` Bettet eine Nachricht ein\n'
    desc += '`ticket <Anliegen>` erstellt ein Ticket, dass von einem Admin bearbeitet werden kann'
    embedVar = discord.Embed(title="Help - prefix = ss!", description=desc, color=0xFF0099)
    msg = await ctx.send(embed=embedVar)
    await helpers.delMessages([ctx.message, msg], 20)
