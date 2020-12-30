import globals
import helpers
import discord

@globals.bot.command('cclist')
async def command_cclist(ctx):
	if ctx.guild.id == 622489511837827072 or ctx.guild.id == 683304302147534889:
		desc = ''
		if f'creation vcs' in globals.data:
			for key in globals.data[f'creation vcs']:
				desc += f'`{key}`\n'
				await helpers.sendEmbed(ctx, f'Creation channels:', desc, globals.defaultcolor, 20)
				return
