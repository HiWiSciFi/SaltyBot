// load .env values
const dotenv = require('dotenv');
dotenv.config();
global.permittedServer = process.env.SERVER;
console.log(permittedServer);

// load discord API
global.Discord = require('discord.js');
global.client = new Discord.Client();

// load utils
global.dataHandler = require('./utils/data');
global.dataHandler.loadCreationVcs();
global.dataHandler.loadQuoteChannels();
global.helpers = require('./utils/helpers');
global.channelutils = require('./utils/channelutils');

// register events
require('./events/ready');
require('./events/voice_state_update');
require('./events/reaction_add');

// start bot and connect to Discord
global.client.login(process.env.TOKEN);
