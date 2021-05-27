// load .env values
require('dotenv').config();

// load discord API
global.Discord = require('discord.js');
global.client = new Discord.Client();

// load utils
global.dataHandler = require('./utils/data');
dataHandler.loadCreationVcs();
global.helpers = require('./utils/helpers');

// register events
require('./events/ready');
require('./events/voice_state_update');
require('./events/reaction_add');

// start bot and connect to Discord
global.client.login(process.env.TOKEN);
