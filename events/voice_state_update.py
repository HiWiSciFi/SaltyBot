import globals
import data

@globals.bot.event
async def on_voice_state_update(member, before, after):
	if not f'creation vcs' in globals.data:
		globals.data[f'creation vcs'] = {}
		data.save()

	if not before.channel and after.channel:
		if f'{after.channel.id}' in globals.data[f'creation vcs']:
			await createChannel(member, after)
	elif before.channel and not after.channel:
		await deleteChannelsIfEmpty(before.channel)
	elif before.channel and after.channel:
		if f'{after.channel.id}' in globals.data[f'creation vcs']:
			await createChannel(member, after)
		await deleteChannelsIfEmpty(before.channel)


async def createChannel(member, origChannel):
	server = origChannel.channel.guild
	created_channel = await server.create_voice_channel(globals.data[f'creation vcs'][f'{origChannel.channel.id}'])
	if not f'created vcs' in globals.data:
		globals.data[f'created vcs'] = []
	globals.data[f'created vcs'].append(f'{created_channel.id}')
	data.save()
	await member.move_to(created_channel)

async def deleteChannelsIfEmpty(channel):
	if f'created vcs' in globals.data:
		if f'{channel.id}' in globals.data[f'created vcs']:
			if len(channel.members) < 1:
				globals.data[f'created vcs'].remove(f'{channel.id}')
				await channel.delete()
				data.save()
