from utils import globals
from utils import helpers
from utils import data
import discord
from discord.ext.commands import has_permissions

@globals.bot.command('cccreate')
@has_permissions(manage_channels=True)
async def command_cccreate(ctx, channelid, *args):
	if f'{ctx.guild.id}' in globals.data[f'permitted servers']:
		creationname = helpers.toOneString(*args)
		print(creationname)
		globals.data[f'creation vcs'][f'{channelid}'] = creationname
		data.save()
		await helpers.sendEmbedDel(ctx, f'Neuer "creation"-channel erstellt mit Standardnamen "{creationname}"', f'operation erfolgreich', globals.defaultcolor, 20)
