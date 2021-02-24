from utils import globals
from utils import data

async def createVoiceChannel(member, origChannel):
	server = origChannel.channel.guild
	savedchannelname = globals.data[f'creation vcs'][f'{origChannel.channel.id}']
	channelname = ''

	# get special queues
	ignore = False
	for i in range(0, len(savedchannelname)):
		if not ignore:
			if savedchannelname[i] == f'\\':
				ignore = True
				continue
			if savedchannelname[i] == f'#':
				# TODO: implement per creation channel enumeration
				if not f'{origChannel.channel.id}' in globals.data[f'channel enumerations']:
					globals.data[f'channel enumerations'][f'{origChannel.channel.id}'] = {}

				continue
			if savedchannelname[i] == f'°':
				channelname += member.name
				continue
		channelname += savedchannelname[i]
		ignore = False

	created_channel = await server.create_voice_channel(channelname, category=origChannel.channel.category, sync_permissions=True)
	globals.data[f'created vcs'].append(f'{created_channel.id}')
	data.save()
	await member.move_to(created_channel)

async def deleteVoiceChannelsIfEmpty(channel):
	if f'{channel.id}' in globals.data[f'created vcs']:
		if len(channel.members) < 1:
			globals.data[f'created vcs'].remove(f'{channel.id}')
			await channel.delete()
			data.save()
