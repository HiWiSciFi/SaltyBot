import globals

@globals.bot.event
async def on_member_join(member):
    print('someone new joined the server')
    await member.send('Hello there')
