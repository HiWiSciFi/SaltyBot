module.exports = {
	slash: true,
	testOnly: true,
	description: 'Delete a creation channel',
	minArgs: 1,
	expectedArgs: "<channelid>",
	permissions: ["MANAGE_CHANNELS"],
	guildOnly: true,
	callback: ({ message, args }) => {

		const [channelid] = args;

		if (!(channelid in global.data_creationVcs)) {
			embed = new Discord.MessageEmbed()
				.setTitle('Creation vc could not be removed!')
				.setDescription('There is no registered creation vc with the given ID!')
				.setColor(global.errorcolor);
			return embed;
		}

		delete global.data_creationVcs[channelid];
		global.dataHandler.saveCreationVcs();

		embed = new Discord.MessageEmbed()
			.setTitle('Creation vc removed!')
			.setDescription('The channel can now be used like a normal voice channel!')
			.setColor(global.defaultcolor);
		return embed;
	}
};
