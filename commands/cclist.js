module.exports = {
	name: "cclist",
	description: "List all creation channels",
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		let embed = new Discord.MessageEmbed()
			.setTitle('cclist command')
			.setDescription('List of creation channels')
			.setColor(global.defaultcolor);
		for (let k in global.data_creationVcs) {
			embed.addFields({name: k, value: global.data_creationVcs[k], inline: true});
		}
		return embed;
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed().setTitle('Error').setDescription(err).setColor(global.errorcolor);
	}
};