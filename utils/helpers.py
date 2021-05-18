import asyncio
import discord

async def delMessages(msgs, delay):
    await asyncio.sleep(delay)
    for msg in msgs:
        try:
            await msg.delete()
        except:
            continue

def getEmbed(title, description, color):
	return discord.Embed(title=title, description=description, color=color)

async def sendEmbedDel(ctx, title, description, color, time):
	msg = sendEmbed(ctx, title, description, color)
	await delMessages([ctx.message, msg], time)
	return msg

async def sendEmbed(channel, title, description, color):
	embedVar = getEmbed(title, description, color)
	msg = await channel.send(embed=embedVar)
	return msg

def toOneString(*args):
	tx = ''
	for s in args:
		tx += s + ' '
	return tx
