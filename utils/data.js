const fs = require('fs');

global.data_creationVcs = {};
global.data_createdVcs = {}; // GuildChannel - vc : GuildChannel - tc
global.data_createdTcs = {}; // GuildChannel - tc : GuildChannel - vc

global.data_configMsgs = {}; // GuildChannel - tc : id - configMsg.id

const loadCreationVcs = () => {
	fs.readFile('creationVcs.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}

		global.data_creationVcs = JSON.parse(data.toString());
		console.log("CreationVcs loaded!");
	});
};

const saveCreationVcs = () => {
	let data = JSON.stringify(global.data_creationVcs);

	fs.writeFile('creationVcs.json', data, (err) => {
		if (err) {
			throw err;
		}

		console.log("CreationVcs saved to JSON file!");
	});
};

module.exports.loadCreationVcs = loadCreationVcs;
module.exports.saveCreationVcs = saveCreationVcs;
