import asyncio
import discord

async def delMessages(msgs, delay):
    await asyncio.sleep(delay)
    for msg in msgs:
        try:
            await msg.delete()
        except:
            continue

async def sendEmbedDel(ctx, title, description, color, time):
	embedVar = discord.Embed(title=title, description=description, color=color)
	msg = await ctx.send(embed=embedVar)
	await helpers.delMessages([ctx.message, msg], time)
	return msg

async def sendEmbed(channel, title, description, color):
	embedVar = discord.Embed(title=title, description=description, color=color)
	msg = await channel.send(embed=embedVar)
	return msg

def toOneString(*args):
	tx = ''
	for s in args:
		tx += s + ' '
	return tx
