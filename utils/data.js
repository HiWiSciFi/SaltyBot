global.fs = require('fs');

global.data_creationVcs = {};
global.data_createdVcs = {};
global.data_createdTcs = {};

global.data_configMsgs = {};

const loadCreationVcs = () => {
	fs.readFile('creationVcs.json', 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}

		data_creationVcs = JSON.parse(data.toString());
		console.log("CreationVcs loaded!");
	});
};

const saveCreationVcs = () => {
	data = JSON.stringify(data_creationVcs);

	fs.writeFile('creationVcs.json', data, (err) => {
		if (err) {
			throw err;
		}

		console.log("CreationVcs saved to JSON file!");
	});
};

module.exports.loadCreationVcs = loadCreationVcs;
module.exports.saveCreationVcs = saveCreationVcs;
