module.exports = {
	slash: true,
	testOnly: true,
	description: 'List all available commands',
	minArgs: 0,
	expectedArgs: "[command]",
	callback: ({ message, args }) => {

		const [command] = args;

		if (command === undefined) {
			embed = new Discord.MessageEmbed()
				.setTitle('')
				.setDescription('')
				.setAuthor("Help Command", client.user.avatarURL())
				.addFields({name: "Everyone Commands", value: "\`/help\`"})
				.addFields({name: "Admin Commands", value: "\`/cccreate\`, \`/cclist\`, \`/ccremove\`"})
				.setColor(defaultcolor);
			return embed;
		} else {
			if (command.toLowerCase() === 'help' || command.toLowerCase() === '/help') {
				embed = new Discord.MessageEmbed()
					.setTitle('help Command')
					.setDescription('List all available commands')
					.addFields({name: "Usage", value: "\`/help [Command]\`"})
					.setColor(defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'cccreate' || command.toLowerCase() === '/cccreate') {
				embed = new Discord.MessageEmbed()
					.setTitle('cccreate Command')
					.setDescription('Create a creation channel')
					.addFields({name: "Usage", value: "\`/cccreate <ChannelID> <Name for created channels>\`"})
					.setColor(defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'cclist' || command.toLowerCase() === '/cclist') {
				embed = new Discord.MessageEmbed()
					.setTitle('cclist Command')
					.setDescription('List all creation channels')
					.addFields({name: "Usage", value: "\`/cclist\`"})
					.setColor(defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'ccremove' || command.toLowerCase() === '/ccremove') {
				embed = new Discord.MessageEmbed()
					.setTitle('ccremove Command')
					.setDescription('Delete a creation channel')
					.addFields({name: "Usage", value: "\`/ccremove <ChannelID>\`"})
					.setColor(defaultcolor);
				return embed;
			} else {
				embed = new Discord.MessageEmbed()
					.setTitle('Error!')
					.setDescription(`No command by the name of \"${command}\" found!`)
					.setColor(defaultcolor);
				return embed;
			}
		}
		return 'Error!';
	}
};
