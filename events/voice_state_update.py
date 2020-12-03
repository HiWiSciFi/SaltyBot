import globals

@globals.bot.event
async def on_voice_state_update(member, before, after):
	if not before.channel and after.channel:
		role = discord.utils.get(member.guild.roles, name="role name")
		await member.send(f'you joined a vc')
	elif before.channel and not after.channel:
		role = discord.utils.get(member.guild.roles, name="role name")
		await member.send(f'you left a vc')
