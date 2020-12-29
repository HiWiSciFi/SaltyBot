import globals
import data

@globals.bot.event
async def on_voice_state_update(member, before, after):
	if not before.channel and after.channel:
		print(f'entered a channel')
		if after.channel.name.startswith('Create'):
			await createChannel(member, after)
	elif before.channel and not after.channel:
		print(f'disconnected from voice')
		await deleteChannelsIfEmpty(before.channel)
	elif before.channel and after.channel:
		print(f'switched to another channel')
		if after.channel.name.startswith('Create'):
			await createChannel(member, after)
		await deleteChannelsIfEmpty(before.channel)


async def createChannel(member, origChannel):
	server = origChannel.channel.guild
	print(f'creating channel')
	created_channel = await server.create_voice_channel('This channel is created by the bot')
	print(f'saving to disk')
	if not f'created vcs' in globals.data:
		globals.data[f'created vcs'] = []
	globals.data[f'created vcs'].append(f'{created_channel.id}')
	data.save()
	print(f'moving member to created channel')
	await member.move_to(created_channel)

async def deleteChannelsIfEmpty(channel):
	print(f'1')
	if f'{channel.id}' in globals.data[f'created vcs']:
		print(f'2')
		if len(channel.members) < 1:
			print(f'deleting channel')
			globals.data[f'created vcs'].remove(f'{channel.id}')
			await channel.delete()
			data.save()
			print(f'channel deleted')
