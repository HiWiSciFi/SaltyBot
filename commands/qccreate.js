module.exports = {
	name: 'qccreate',
	description: 'Create a quote channel',
	options: [
		{
			name: "channelid",
			description: "The ID of the channel to turn into a quote channel",
			type: 3,
			required: true
		}
	],
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		global.data_quoteChannelIDs.push(args["channelid"]);
		global.dataHandler.saveQuoteChannels();

		return new Discord.MessageEmbed()
			.setTitle('Quote channel created!')
			.setDescription(`Channel with ID ${args["channelid"]} turned into a quote channel!`)
			.setColor(global.defaultcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};