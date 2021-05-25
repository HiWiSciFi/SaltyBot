const WOKCommands = require('wokcommands');

client.once('ready', async () => {
	client.user.setActivity('salt', {type: 'LISTENING'});
	console.log(`${client.user.username} successfully connected to Discord!`);

	new WOKCommands(client, {
		commandsDir: 'commands',
		testServers: [process.env.SERVER],
		showWarns: false
	});
});
