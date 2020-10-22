data = {}
bot = None
intents = None

from os import getenv
from dotenv import load_dotenv
load_dotenv()
TOKEN = getenv('DISCORD_TOKEN')
