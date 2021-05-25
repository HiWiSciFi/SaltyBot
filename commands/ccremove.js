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

		if (!(channelid in data_creationVcs)) {
			embed = new Discord.MessageEmbed()
				.setTitle('Creation vc could not be removed!')
				.setDescription('There is no registered creation vc with the given ID!')
				.setColor(defaultcolor);
			return embed;
		}

		delete data_creationVcs[channelid];
		dataHandler.saveCreationVcs();

		embed = new Discord.MessageEmbed()
			.setTitle('Creation vc removed!')
			.setDescription('The channel can now be used like a normal voice channel!')
			.setColor(defaultcolor);
		return embed;
	}
};
