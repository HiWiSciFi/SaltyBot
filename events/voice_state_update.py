from utils import globals
from utils import vcutils

@globals.bot.event
async def on_voice_state_update(member, before, after):

	if not before.channel and after.channel and f'{after.channel.guild.id}' in globals.data[f'permitted servers']:
		if f'{after.channel.id}' in globals.data[f'creation vcs']:
			await vcutils.createVoiceChannel(member, after)

	elif before.channel and not after.channel and f'{before.channel.guild.id}' in globals.data[f'permitted servers']:
		await vcutils.deleteVoiceChannelsIfEmpty(before.channel)

	elif before.channel and after.channel:
		if f'{before.channel.guild.id}' in globals.data[f'permitted servers']:
			await vcutils.deleteVoiceChannelsIfEmpty(before.channel)
		if f'{after.channel.guild.id}' in globals.data[f'permitted servers']:
			if f'{after.channel.id}' in globals.data[f'creation vcs']:
				await vcutils.createVoiceChannel(member, after)

	else:
		print(f'server not permitted')
