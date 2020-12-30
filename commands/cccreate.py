import globals
import helpers
import data
import discord
from discord.ext.commands import has_permissions

@globals.bot.command('cccreate')
@has_permissions(manage_channels=True)
async def command_cccreate(ctx, channelid, *args):
	if ctx.guild.id == 622489511837827072 or ctx.guild.id == 683304302147534889:
		creationname = helpers.toOneString(*args)
		if not f'creation vcs' in globals.data:
			globals.data[f'creation vcs'] = {}
			globals.data[f'creation vcs'][f'{channelid}'] = creationname
			data.save()
			await helpers.sendEmbed(ctx, f'Neuer "creation"-channel erstellt mit Standardnamen "{creationname}"', f'operation erfolgreich', globals.defaultcolor, 20)
