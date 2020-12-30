import globals
import helpers
import discord
from discord.ext.commands import has_permissions

@globals.bot.command('ccchannel')
@has_permissions(manage_channels=True)
async def command_ccchannel(ctx, *args):

	await helpers.sendEmbed(ctx, "", "", 0xFF0099, 20)
