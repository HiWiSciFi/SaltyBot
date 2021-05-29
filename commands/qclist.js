module.exports = {
	slash: true,
	testOnly: true,
	description: 'List all quote channels',
	permissions: ["MANAGE_CHANNELS"],
	guildOnly: true,
	callback: ({}) => {
		let channels = "";
		for (var i = 0; i < global.data_quoteChannelIDs.length; i++) {
			channels += global.data_quoteChannelIDs[i] + '\n';
		}
		embed = new Discord.MessageEmbed()
			.setTitle('qclist command')
			.setDescription(`List of quote channels\n${channels}`)
			.setColor(global.defaultcolor);
		return embed;
	}
};
