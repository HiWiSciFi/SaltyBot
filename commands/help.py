import globals
import helpers
import discord

@globals.bot.command('help')
async def command_help(ctx):
	if ctx.guild.id == 622489511837827072 or ctx.guild.id == 683304302147534889:
		desc = ''
		desc += '`help` zeigt diese Nachricht\n'
		desc += '`cccreate <vc id> <creation name>` Macht den angegebenen vc zu einem creator-channel und setzt den Standardnamen für Channel, die von diesem erstellt werden sollen. Dabei kann der Name des Benutzers verwendet werden indem `°`, oder eine Nummerierung verwendet werden indem `#` eingefügt wird. `\` gibt dabei an, dass das nächste Zeichen normal ausgegeben werden soll.\n'
		desc += '`ccremove <vc id>` Macht den angegebenen vc wieder zu einem normalen vc\n'
		desc += '`cclist` Zeigt eine Liste der creator-channel\n'
		color=0xFF0099
		await helpers.sendEmbed(ctx, "Help - prefix = ss!", desc, color, 30)
