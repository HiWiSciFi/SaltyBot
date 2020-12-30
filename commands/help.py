import globals
import helpers
import discord

@globals.bot.command('help')
async def command_help(ctx):
	desc = ''
	desc += '`help` zeigt diese Nachricht\n'
	desc += '`ccchannel` Begrenzt den Bot auf den momentanen Channel\n'
	color=0xFF0099
	await helpers.sendEmbed(ctx, "Help - prefix = ss!", desc, color, 20)
