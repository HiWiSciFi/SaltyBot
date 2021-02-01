import globals
import helpers
import discord

@globals.bot.command('cclist')
async def command_cclist(ctx):
	if f'{ctx.guild.id}' in globals.data[f'permitted servers']:
		desc = ''
		for key in globals.data[f'creation vcs']:
			desc += f'`{key}`\n'
		await helpers.sendEmbed(ctx, f'Creation channels:', desc, globals.defaultcolor, 20)
