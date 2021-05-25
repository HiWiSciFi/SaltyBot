module.exports = {
	slash: true,
	testOnly: true,
	description: 'Create a creation channel',
	minArgs: 2,
	expectedArgs: "<channelid> <channelname>",
	permissions: ["MANAGE_CHANNELS"],
	guildOnly: true,
	callback: ({ message, args }) => {
		const [channelid, name] = args;

		data_creationVcs[channelid] = name;
		dataHandler.saveCreationVcs();

		embed = new Discord.MessageEmbed()
			.setTitle('Creation vc created!')
			.setDescription(`Channel with ID ${channelid} turned into a creation vc with standard name \"${name}\"!`)
			.setColor(defaultcolor);
		return embed;
	}
};
