const fs = require('fs');

global.data_creationVcs = {};
global.data_createdVcs = {}; // GuildChannel - vc : GuildChannel - tc
global.data_createdTcs = {}; // GuildChannel - tc : GuildChannel - vc
global.data_configMsgs = {}; // Message - configMsg : GuildChannel - tc

global.music = {
	tcByBot: {},
	tcByVc: {},
	openTc: {},
	freeTcs: [],
	listeners: []
}

function loadMusicTcs() {
	fs.readFile('musicTcs.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}

		data = JSON.parse(data.toString());
		Object.keys(data).forEach(key => {
			global.client.channels.fetch(data[key])
				.then(channel => global.music.tcByBot[key] = channel);
		});
		console.log("MusicTcs loaded!");
	});
}

function saveMusicTcs() {
	var data = global.music.tcByBot;
	Object.keys(data).forEach(key => {
		data[key] = data[key].id; 
	});

	data = JSON.stringify(global.music.tcByBot);

	fs.writeFile('musicTcs.json', data, (err) => {
		if (err) {
			throw err;
		}

		console.log("MusicTcs saved to JSON file!");
	});
}

function loadCreationVcs() {
	fs.readFile('creationVcs.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}

		global.data_creationVcs = JSON.parse(data.toString());
		console.log("CreationVcs loaded!");
	});
}

function saveCreationVcs() {
	let data = JSON.stringify(global.data_creationVcs);

	fs.writeFile('creationVcs.json', data, (err) => {
		if (err) {
			throw err;
		}

		console.log("CreationVcs saved to JSON file!");
	});
}


global.data_quoteChannelIDs = [];

function loadQuoteChannels() {
	fs.readFile('quoteChannels.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
		
		global.data_quoteChannelIDs = JSON.parse(data.toString());
		console.log('Quote channels loaded!');
	});
}

function saveQuoteChannels() {
	let data = JSON.stringify(global.data_quoteChannelIDs);

	fs.writeFile('quoteChannels.json', data, (err) => {
		if (err) {
			throw err;
		}

		console.log("Quote channels saved to JSON file!");
	});
}

module.exports.loadCreationVcs = loadCreationVcs;
module.exports.saveCreationVcs = saveCreationVcs;
module.exports.loadQuoteChannels = loadQuoteChannels;
module.exports.saveQuoteChannels = saveQuoteChannels;
module.exports.loadMusicTcs = loadMusicTcs;
module.exports.saveMusicTcs = saveMusicTcs;