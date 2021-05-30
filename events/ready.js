client.once('ready', async () => {
	client.user.setActivity('salt', {type: 'LISTENING'});
	console.log(`${client.user.username} successfully connected to Discord!`);

	// reload commands
	reloadCommands();

	// await global.dataHandler.loadMusicTcs();
	// global.musicHandler.initiate();
});

async function reloadCommands() {
	await global.commandHandler.unloadCommands();
	global.commandHandler.loadCommands();
};