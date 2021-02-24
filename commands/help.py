from utils import globals
from utils import helpers
import discord
from discord.ext.commands import has_permissions

@globals.bot.command('help')
@has_permissions(manage_channels=True)
async def command_help(ctx):
	if f'{ctx.guild.id}' in globals.data[f'permitted servers']:
		desc = ''
		desc += '`help` zeigt diese Nachricht\n'
		desc += '`cccreate <vc id> <creation name>` Macht den angegebenen vc zu einem creator-channel und setzt den Standardnamen für Channel, die von diesem erstellt werden sollen. Dabei kann der Name des Benutzers verwendet werden indem `°`, oder eine Nummerierung verwendet werden indem `#` eingefügt wird. `\` gibt dabei an, dass das nächste Zeichen normal ausgegeben werden soll.\n'
		desc += '`ccremove <vc id>` Macht den angegebenen vc wieder zu einem normalen vc\n'
		desc += '`cclist` Zeigt eine Liste der creator-channel\n'
		color=0xFF0099
		await helpers.sendEmbed(ctx, "Help - prefix = ss!", desc, color, 30)
