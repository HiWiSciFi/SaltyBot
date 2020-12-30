import globals
import helpers
import discord
import data

@globals.bot.command('ccremove')
async def command_ccremove(ctx, channelid):
	if ctx.guild.id == 622489511837827072 or ctx.guild.id == 683304302147534889:
		if f'creation vcs' in globals.data:
			if channelid in globals.data[f'creation vcs']:
				del globals.data[f'creation vcs'][channelid]
				data.save()
				await helpers.sendEmbed(ctx, f'Der channel mit der id "{channelid}" ist nun kein creation channel mehr', f'', globals.defaultcolor, 10)
			else:
				await helpers.sendEmbed(ctx, f'Der channel mit der id "{channelid}" ist kein creation-channel', f'', globals.defaultcolor, 10)
