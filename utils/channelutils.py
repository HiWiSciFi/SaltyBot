from utils import globals
from utils import helpers

async def createChannels(member, origChannel):
	# fetch pre- channel creation data
	server = origChannel.guild
	savedchannelname = globals.data[f'creation vcs'][f'{origChannel.id}']
	channelname = '-'

	# create the vc
	created_vc = await server.create_voice_channel(channelname, category=origChannel.category, sync_permissions=True)

	# move creator to created channel
	await member.move_to(created_vc)

	# create the tc
	created_tc = await server.create_text_channel(channelname, category=origChannel.category, sync_permissions=False)

	# save data to file
	globals.data[f'created vcs'][f'{created_vc.id}'] = f'{created_tc.id}'
	globals.data[f'created tcs'][f'{created_tc.id}'] = f'{created_vc.id}'

	# set tc access permissions
	await created_tc.set_permissions(server.me, view_channel=True)
	await created_tc.set_permissions(server.default_role, view_channel=False)

	# send configuration message
	configMsg = await helpers.sendEmbed(created_tc, "Channel Configuration", f'react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: unlocked', globals.defaultcolor)
	globals.data[f'cconfig msgs'][f'{created_tc.id}'] = f'{configMsg.id}'

	# set vc access permissions
	await created_vc.set_permissions(server.me, view_channel=True)
	await created_vc.set_permissions(server.default_role, view_channel=True)

	# get special name queues
	channelname = ''
	ignore = False
	for i in range(0, len(savedchannelname)):
		if not ignore:
			if savedchannelname[i] == f'\\':
				ignore = True
				continue
			if savedchannelname[i] == f'#':
				# TODO: implement per creation channel enumeration
				if not f'{origChannel.id}' in globals.data[f'channel enumerations']:
					globals.data[f'channel enumerations'][f'{origChannel.id}'] = {}

				continue
			if savedchannelname[i] == f'°':
				channelname += member.name
				continue
		channelname += savedchannelname[i]
		ignore = False

	# update channel names
	await created_vc.edit(name=channelname)
	await created_tc.edit(name=channelname)

	# add reactions to config msg
	await configMsg.add_reaction("🔒");
	await configMsg.add_reaction("🔓");

	# debug log
	print(f'User \"{member.name}\" created channel \"{channelname}\"')

async def deleteChannelsIfEmpty(vc):
	# if there is noone in the vc
	if len(vc.members) < 1:

		# get channel name
		channelname = vc.name

		# get tc by id
		tc = globals.bot.get_channel(int(globals.data[f'created vcs'][f'{vc.id}']))

		# delete channels
		await vc.delete()
		await tc.delete()

		# save data to file
		del globals.data[f'created vcs'][f'{vc.id}']
		del globals.data[f'created tcs'][f'{tc.id}']
		del globals.data[f'cconfig msgs'][f'{tc.id}']

		print(f'Channel \"{channelname}\" has been deleted')

async def setChannelAccess(user, vcID, viewChannel):
	# get channels
	tc = globals.bot.get_channel(int(globals.data[f'created vcs'][f'{vcID}']))

	# set permission
	await tc.set_permissions(user, view_channel=viewChannel)
