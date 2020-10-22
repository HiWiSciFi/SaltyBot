import asyncio

async def delMessages(msgs, delay):
    await asyncio.sleep(delay)
    for msg in msgs:
        await msg.delete()
