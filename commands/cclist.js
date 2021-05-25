module.exports = {
	slash: true,
	testOnly: true,
	description: 'List all creation channels',
	guildOnly: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: ({}) => {
		embed = new Discord.MessageEmbed()
			.setTitle('cclist command')
			.setDescription('List of creation channels')
			.setColor(defaultcolor);
		for (let k in data_creationVcs) {
			embed.addFields({name: k, value: data_creationVcs[k], inline: true});
		}
		return embed;
	}
};
