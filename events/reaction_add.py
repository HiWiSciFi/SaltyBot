from utils import globals

@globals.bot.event
async def on_reaction_add(reaction, user):
	# if it's a bot
	if user.bot:
		# exit function
		return
	# if tc was a created tc
	if f'{reaction.message.channel.id}' in globals.data[f'created tcs']:
		# if message was a tc vc config message
		if f'{reaction.message.id}' in globals.data[f'cconfig msgs'][f'{reaction.message.channel.id}']:
			# if reaction was lock
			if reaction.emoji == "🔒":
				# get vc
				vc = globals.bot.get_channel(int(globals.data[f'created tcs'][f'{reaction.message.channel.id}']))
				# set global permissions
				await vc.set_permissions(vc.guild.default_role, view_channel=False)
				# reset reactions
				await reaction.remove(user)
				# send channel feedback
