const WOKCommands = require('wokcommands');

global.client.once('ready', async () => {
	global.client.user.setActivity('salt', {type: 'LISTENING'});
	console.log(`${global.client.user.username} successfully connected to Discord!`);

	new WOKCommands(client, {
		commandsDir: 'commands',
		testServers: [process.env.SERVER],
		showWarns: false
	});
});
