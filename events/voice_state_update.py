from utils import globals
from utils import channelutils
from utils import data

@globals.bot.event
async def on_voice_state_update(member, before, after):

	# if entered a channel
	if not before.channel and after.channel and f'{after.channel.guild.id}' in globals.data[f'permitted servers']:
		# if server is permitted
		if f'{after.channel.guild.id}' in globals.data[f'permitted servers']:
			# if channel is a creation vc
			if f'{after.channel.id}' in globals.data[f'creation vcs']:
				# create vc and tc
				await channelutils.createChannels(member, after.channel)
			# if channel is a created vc
			elif f'{after.channel.id}' in globals.data[f'created vcs']:
				# add access permission
				await channelutils.setChannelAccess(member, after.channel.id, True)

	# if disconnected from a channel
	elif before.channel and not after.channel and f'{before.channel.guild.id}' in globals.data[f'permitted servers']:
		# if channel is a created vc
		if f'{before.channel.id}' in globals.data[f'created vcs']:
			# remove access permission
			await channelutils.setChannelAccess(member, before.channel.id, False)
			# delete the vc if it is empty
			await channelutils.deleteChannelsIfEmpty(before.channel)

	# if switched to another channel
	elif before.channel and after.channel:
		# if previous server was permitted
		if f'{before.channel.guild.id}' in globals.data[f'permitted servers']:
			# if channel is a created vc
			if f'{before.channel.id}' in globals.data[f'created vcs']:
				# remove access permission
				await channelutils.setChannelAccess(member, before.channel.id, False)
				# delete vc if it is empty
				await channelutils.deleteChannelsIfEmpty(before.channel)

		# if next server is permitted
		if f'{after.channel.guild.id}' in globals.data[f'permitted servers']:
			# if channel is a creation vc
			if f'{after.channel.id}' in globals.data[f'creation vcs']:
				# create new vc
				await channelutils.createChannels(member, after.channel)
			# if channel is a created vc
			elif f'{after.channel.id}' in globals.data[f'created vcs']:
				# add access permission
				await channelutils.setChannelAccess(member, after.channel.id, True)

	# save data
	data.save()
