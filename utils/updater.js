function update() {
	console.log('backing up fields');
	let u_data_createdVcs = global.data_createdVcs;
	let u_data_createdTcs = global.data_createdTcs;
	let u_data_configMsgs = global.data_configMsgs;

	console.log('unregister events');
	client.removeAllListeners('ready');
	client.removeAllListeners('voiceStateUpdate');
	client.removeAllListeners('messageReactionAdd');

	console.log('unload modules\n');
	Object.keys(require.cache).forEach(key => {
		if (key !== require.main.filename && !key.includes('\\node_modules\\discord.js\\') && !key.includes('\\node_modules\\@discordjs\\')) delete require.cache[key];
	});
	
	
	console.log('fetching and loading code from github');
	let { exec } = require("child_process");
	exec("git fetch && git pull", (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	    }
		console.log(stdout);
		
		console.log('reloading .env');
		const dotenv = require('dotenv');
		dotenv.config();
		global.permittedServer = process.env.SERVER;
	
		console.log('reloading dataHandler and helpers');
		global.dataHandler = require('./data');
		global.dataHandler.loadCreationVcs();
		global.dataHandler.loadQuoteChannels();
		global.helpers = require('./helpers');
		global.channelutils = require('./channelutils');
	
		console.log('reloading events');
		require('../events/ready');
		require('../events/voice_state_update');
		require('../events/reaction_add');
	
		console.log('writing backed up data');
		global.data_createdVcs = u_data_createdVcs;
		global.data_createdTcs = u_data_createdTcs;
		global.data_configMsgs = u_data_configMsgs;
	});
};

module.exports.update = update;
