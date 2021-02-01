import globals
import helpers
import discord
import data

@globals.bot.command('ccremove')
@has_permissions(manage_channels=True)
async def command_ccremove(ctx, channelid):
	if f'{ctx.guild.id}' in globals.data[f'permitted servers']:
		if channelid in globals.data[f'creation vcs']:
			del globals.data[f'creation vcs'][channelid]
			data.save()
			await helpers.sendEmbed(ctx, f'Der channel mit der id "{channelid}" ist nun kein creation channel mehr', f'', globals.defaultcolor, 10)
		else:
			await helpers.sendEmbed(ctx, f'Der channel mit der id "{channelid}" ist kein creation-channel', f'', globals.defaultcolor, 10)
