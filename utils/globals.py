# array of data to be saved to a file
data = {}

# reference to the bot user
bot = None

# intents for the bot
intents = None

# default color for embeds
defaultcolor = 0x3DA894

# load the token to log into discord
from os import getenv
from dotenv import load_dotenv
load_dotenv()
TOKEN = getenv('DISCORD_TOKEN')
