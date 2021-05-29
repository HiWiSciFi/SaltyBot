module.exports = {
	slash: true,
	testOnly: true,
	description: 'Delete a quote channel',
	minArgs: 1,
	expectedArgs: "<channelid>",
	permissions: ["MANAGE_CHANNELS"],
	guildOnly: true,
	callback: ({ message, args }) => {
		const [channelid] = args;

		if (!global.data_quoteChannelIDs.includes(channelid)) {
			embed = new Discord.MessageEmbed()
				.setTitle('Quote channel could not be removed!')
				.setDescription('There is no registered quote channel with the given ID!')
				.setColor(global.errorcolor);
			return embed;
		}

		global.data_quoteChannelIDs.splice(global.data_quoteChannelIDs.indexOf(channelid), 1);
		global.dataHandler.saveQuoteChannels();

		embed = new Discord.MessageEmbed()
			.setTitle('Quote channel removed!')
			.setDescription('The channel can now be used like a normal text channel!')
			.setColor(global.defaultcolor);
		return embed;
	}
};
