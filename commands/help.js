module.exports = {
	slash: true,
	testOnly: true,
	description: 'List all available commands',
	minArgs: 0,
	expectedArgs: "[command]",
	callback: ({ message, args }) => {

		const [command] = args;

		if (command === undefined) {
			embed = new global.Discord.MessageEmbed()
				.setTitle('')
				.setDescription('')
				.setAuthor("Help Command", global.client.user.avatarURL())
				.addFields({name: "Everyone Commands", value: "\`/help\`"})
				.addFields({name: "Admin Commands", value: "\`/cccreate\`, \`/cclist\`, \`/ccremove\`"})
				.setColor(global.defaultcolor);
			return embed;
		} else {
			if (command.toLowerCase() === 'help' || command.toLowerCase() === '/help') {
				embed = new global.Discord.MessageEmbed()
					.setTitle('help Command')
					.setDescription('List all available commands')
					.addFields({name: "Usage", value: "\`/help [Command]\`"})
					.setColor(global.defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'cccreate' || command.toLowerCase() === '/cccreate') {
				embed = new global.Discord.MessageEmbed()
					.setTitle('cccreate Command')
					.setDescription('Create a creation channel')
					.addFields({name: "Usage", value: "\`/cccreate <ChannelID> <Name for created channels>\`"})
					.setColor(global.defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'cclist' || command.toLowerCase() === '/cclist') {
				embed = new global.Discord.MessageEmbed()
					.setTitle('cclist Command')
					.setDescription('List all creation channels')
					.addFields({name: "Usage", value: "\`/cclist\`"})
					.setColor(global.defaultcolor);
				return embed;
			} else if (command.toLowerCase() === 'ccremove' || command.toLowerCase() === '/ccremove') {
				embed = new global.Discord.MessageEmbed()
					.setTitle('ccremove Command')
					.setDescription('Delete a creation channel')
					.addFields({name: "Usage", value: "\`/ccremove <ChannelID>\`"})
					.setColor(global.defaultcolor);
				return embed;
			} else {
				embed = new global.Discord.MessageEmbed()
					.setTitle('Error!')
					.setDescription(`No command by the name of \"${command}\" found!`)
					.setColor(global.defaultcolor);
				return embed;
			}
		}
		return 'Error!';
	}
};
