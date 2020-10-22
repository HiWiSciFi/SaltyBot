import globals
import helpers
import asyncio

async def clearChannel(channel):
    number = 0
    async for _ in channel.history(limit=None):
        number += 1
    counter = 0
    async for x in channel.history(limit = number):
        if counter < number:
            await helpers.delMessages([x], 0)
            counter += 1
            await asyncio.sleep(0)

@globals.bot.command(name='clear')
async def command_clear(ctx):
    await clearChannel(ctx.channel)
