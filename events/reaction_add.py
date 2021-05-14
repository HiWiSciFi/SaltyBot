from utils import globals
from utils import helpers

@globals.bot.event
async def on_reaction_add(reaction, user):
	# if it's a bot
	if user.bot:
		# exit function
		return
	# if tc was a created tc
	if f'{reaction.message.channel.id}' in globals.data[f'created tcs'] and f'{reaction.message.channel.guild.id}' in globals.data[f'permitted servers']:
		# if message was a tc vc config message
		if f'{reaction.message.id}' in globals.data[f'cconfig msgs'][f'{reaction.message.channel.id}']:
			# if reaction was lock
			if reaction.emoji == "🔒":
				# get tc
				tc = globals.bot.get_channel(int(reaction.message.channel.id))
				# get vc
				vc = globals.bot.get_channel(int(globals.data[f'created tcs'][f'{reaction.message.channel.id}']))
				# set global permissions
				await vc.set_permissions(vc.guild.default_role, view_channel=False)
				# reset reactions
				await reaction.remove(user)
				# send channel feedback
				await reaction.message.edit(embed=helpers.getEmbed("Channel Configuration", f'react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: locked', globals.defaultcolor))

			# if reaction was unlock
			elif reaction.emoji == "🔓":
				# get tc
				tc = globals.bot.get_channel(int(reaction.message.channel.id))
				# get vc
				vc = globals.bot.get_channel(int(globals.data[f'created tcs'][f'{reaction.message.channel.id}']))
				# set global permissions
				await vc.set_permissions(vc.guild.default_role, view_channel=True)
				# reset reactions
				await reaction.remove(user)
				# send channel feedback
				await reaction.message.edit(embed=helpers.getEmbed("Channel Configuration", f'react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: unlocked', globals.defaultcolor))

			# remove unrelevant reactions
			else:
				await reaction.remove(user)
