module.exports = {
	slash: true,
	testOnly: true,
	description: 'Delete a creation channel',
	guildOnly: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: ({}) => {
		embed = new Discord.MessageEmbed()
			.setTitle('Error!')
			.setDescription('Command not yet implemented!')
			.setColor(defaultcolor);
		return embed;
	}
};
