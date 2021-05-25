module.exports = {
	slash: true,
	testOnly: true,
	description: 'List all creation channels',
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
