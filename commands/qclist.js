module.exports = {
	name: "qclist",
	description: "List all quote channels",
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		let channels = "";
		for (var i = 0; i < global.data_quoteChannelIDs.length; i++) {
			channels += global.data_quoteChannelIDs[i] + '\n';
		}
		return new Discord.MessageEmbed()
			.setTitle('qclist command')
			.setDescription(`List of quote channels\n${channels}`)
			.setColor(global.defaultcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed().setTitle('Error').setDescription(err).setColor(global.errorcolor);
	}
};