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
			await reaction.remove(user)
