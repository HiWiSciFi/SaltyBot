import globals
import helpers
import data

@globals.bot.command(name='bind')
#@commands.has_role('Admin')
async def command_bind(ctx):
    guild = ctx.guild
    channel = ctx.channel
    msg = await ctx.send(f'command issued on \"{guild.name}\" in \"{channel.name}\"')
    permMessage = await ctx.send(f'The Saltbot has been bound to this channel (\"{channel.name}\":{channel.id}).')
    globals.data['bound_channel'] = channel.id
    data.Save()
    await helpers.delMessages([ctx.message, msg], 3)
