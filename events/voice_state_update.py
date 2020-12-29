import globals
import data

@globals.bot.event
async def on_voice_state_update(member, before, after):
	if not before.channel and after.channel:
		print(f'entered a channel')
		await createChannel(member, after)
	elif before.channel and not after.channel:
		print(f'disconnected from voice')
		await deleteChannelsIfEmpty(before.channel)
	elif before.channel and after.channel:
		print(f'switched to another channel')
		await createChannel(member, after)
		await deleteChannelsIfEmpty(before.channel)


async def createChannel(member, origChannel):
	server = origChannel.channel.guild
	print(f'creating channel')
	created_channel = await server.create_voice_channel('This channel is created by the bot')
	print(f'saving to disk')
	globals.data[f'{created_channel.id}'] = 'weeb'
	data.Save()
	print(f'finished')

async def deleteChannelsIfEmpty(channel):

	print(channel)
