const fs = require('fs');

global.data_creationVcs = {};
global.data_createdVcs = {}; // GuildChannel - vc : GuildChannel - tc
global.data_createdTcs = {}; // GuildChannel - tc : GuildChannel - vc
global.data_configMsgs = {}; // Message - configMsg : GuildChannel - tc

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

module.exports.loadCreationVcs = loadCreationVcs;
module.exports.saveCreationVcs = saveCreationVcs;


////////////////////////////////////////////////////////////////////////////////////////


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

module.exports.loadQuoteChannels = loadQuoteChannels;
module.exports.saveQuoteChannels = saveQuoteChannels;