data = {}
bot = None
intents = None
defaultcolor = 0x3DA894

from os import getenv
from dotenv import load_dotenv
load_dotenv()
TOKEN = getenv('DISCORD_TOKEN')
