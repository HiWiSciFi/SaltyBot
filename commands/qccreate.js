module.exports = {
	slash: true,
	testOnly: true,
	description: 'Create a quote channel',
	minArgs: 1,
	expectedArgs: "<channelid>",
	permissions: ["MANAGE_CHANNELS"],
	guildOnly: true,
	callback: ({ message, args }) => {
		const [channelid] = args;

		global.data_quoteChannelIDs.push(channelid);
		global.dataHandler.saveQuoteChannels();

		embed = new Discord.MessageEmbed()
			.setTitle('Quote channel created!')
			.setDescription(`Channel with ID ${channelid} turned into a quote channel!`)
			.setColor(global.defaultcolor);
		return embed;
	}
};
