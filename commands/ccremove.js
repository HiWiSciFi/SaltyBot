module.exports = {
	name: "ccremove",
	description: 'Delete a creation channel',
	options: [
		{
			name: "channelid",
			description: "The ID of the channel to turn back into a normal vc",
			type: 3,
			required: true
		}
	],
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		if (!(args["channelid"] in global.data_creationVcs)) {
			return new Discord.MessageEmbed()
				.setTitle('Creation vc could not be removed!')
				.setDescription('There is no registered creation vc with the given ID!')
				.setColor(global.errorcolor);
		}

		delete global.data_creationVcs[args["channelid"]];
		global.dataHandler.saveCreationVcs();

		return new Discord.MessageEmbed()
			.setTitle('Creation vc removed!')
			.setDescription('The channel can now be used like a normal voice channel!')
			.setColor(global.defaultcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};
