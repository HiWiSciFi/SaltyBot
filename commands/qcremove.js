module.exports = {
	name: "qcremove",
	description: "Turn a quote channel back into a normal tc",
	options: [
		{
			name: "channelid",
			description: "The ID of the channel to turn back into a normal tc",
			type: 3,
			required: true
		}
	],
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		if (!global.data_quoteChannelIDs.includes(args["channelid"])) {
			return new Discord.MessageEmbed()
				.setTitle('Quote channel could not be removed!')
				.setDescription('There is no registered quote channel with the given ID!')
				.setColor(global.errorcolor);
		}

		global.data_quoteChannelIDs.splice(global.data_quoteChannelIDs.indexOf(args["channelid"]), 1);
		global.dataHandler.saveQuoteChannels();

		return new Discord.MessageEmbed()
			.setTitle('Quote channel removed!')
			.setDescription('The channel can now be used like a normal text channel!')
			.setColor(global.defaultcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};