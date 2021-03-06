from utils import globals
from utils import helpers

async def createChannels(member, origChannel):
	# fetch pre- channel creation data
	server = origChannel.guild
	savedchannelname = globals.data[f'creation vcs'][f'{origChannel.id}']
	channelname = ''

	# get special name queues
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

	# create the vc
	created_vc = await server.create_voice_channel(channelname, category=origChannel.category, sync_permissions=True)

	# create the tc
	created_tc = await server.create_text_channel(channelname, category=origChannel.category, sync_permissions=False)

	# send configuration message
	configMsg = await helpers.sendEmbed(created_tc, channelname, f'react with 🔒 to make the voice channel private and prevent anyone else from joining', globals.defaultcolor)
	await configMsg.add_reaction("🔒");

	# save data to file
	globals.data[f'created vcs'][f'{created_vc.id}'] = f'{created_tc.id}'
	globals.data[f'created tcs'][f'{created_tc.id}'] = f'{created_vc.id}'
	globals.data[f'cconfig msgs'][f'{created_tc.id}'] = f'{configMsg.id}'

	# move creator to created channel
	await member.move_to(created_vc)

	# set access permissions
	await created_tc.set_permissions(server.me, view_channel=True)
	await created_vc.set_permissions(server.me, view_channel=True)
	await created_tc.set_permissions(server.default_role, view_channel=False)
	await created_vc.set_permissions(server.default_role, view_channel=True)

async def deleteChannelsIfEmpty(vc):
	# if there is noone in the vc
	if len(vc.members) < 1:

		# get tc by id
		tc = globals.bot.get_channel(int(globals.data[f'created vcs'][f'{vc.id}']))

		# delete channels
		await vc.delete()
		await tc.delete()

		# save data to file
		del globals.data[f'created vcs'][f'{vc.id}']
		del globals.data[f'created tcs'][f'{tc.id}']
		del globals.data[f'cconfig msgs'][f'{tc.id}']

async def setChannelAccess(user, vcID, viewChannel):
	# get channels
	tc = globals.bot.get_channel(int(globals.data[f'created vcs'][f'{vcID}']))

	# set permission
	await tc.set_permissions(user, view_channel=viewChannel)
