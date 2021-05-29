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
				.addFields({name: "Admin Commands", value: "\`/cccreate\`, \`/cclist\`, \`/ccremove\`, \`/update\`"})
				.setColor(global.defaultcolor);
			return embed;
			
		} else {
			if (command.toLowerCase() === 'help' || command.toLowerCase() === '/help') {
				embed = new Discord.MessageEmbed()
					.setTitle('help Command')
					.setDescription('List all available commands')
					.addFields({name: "Usage", value: "\`/help [Command]\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'cccreate' || command.toLowerCase() === '/cccreate') {
				embed = new Discord.MessageEmbed()
					.setTitle('cccreate Command')
					.setDescription('Create a creation channel')
					.addFields({name: "Usage", value: "\`/cccreate <ChannelID> <Name for created channels>\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'cclist' || command.toLowerCase() === '/cclist') {
				embed = new Discord.MessageEmbed()
					.setTitle('cclist Command')
					.setDescription('List all creation channels')
					.addFields({name: "Usage", value: "\`/cclist\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'ccremove' || command.toLowerCase() === '/ccremove') {
				embed = new Discord.MessageEmbed()
					.setTitle('ccremove Command')
					.setDescription('Delete a creation channel')
					.addFields({name: "Usage", value: "\`/ccremove <ChannelID>\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'update' || command.toLowerCase() === '/ccremove') {
				embed = new Discord.MessageEmbed()
					.setTitle('update Command')
					.setDescription('Update the bot code (except for the main file, the discord api and commands)')
					.addFields({name: "Usage", value: "\`/update [confirm?]\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'qccreate' || command.toLowerCase() === '/qccreate') {
				embed = new Discord.MessageEmbed()
					.setTitle('qccreate Command')
					.setDescription('Create a quote channel')
					.addFields({name: "Usage", value: "\`/qccreate <ChannelID>\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'qclist' || command.toLowerCase() === '/qclist') {
				embed = new Discord.MessageEmbed()
					.setTitle('qclist Command')
					.setDescription('List all quote channels')
					.addFields({name: "Usage", value: "\`/qclist\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'qcremove' || command.toLowerCase() === '/qcremove') {
				embed = new Discord.MessageEmbed()
					.setTitle('qcremove Command')
					.setDescription('Delete a quote channel')
					.addFields({name: "Usage", value: "\`/qcremove <ChannelID>\`"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else if (command.toLowerCase() === 'quote' || command.toLowerCase() === '/quote') {
				embed = new Discord.MessageEmbed()
					.setTitle('quote Command')
					.setDescription('Quote an epic gamer')
					.addFields({name: "Usage", value: "\`/quote <Name or ping> <Quote>\` (only works in dedicated channels!)"})
					.setColor(global.defaultcolor);
				return embed;
				
			} else {
				embed = new Discord.MessageEmbed()
					.setTitle('Error!')
					.setDescription(`No command by the name of \"${command}\" found!`)
					.setColor(global.errorcolor);
				return embed;
			}
		}
		return 'Error!';
	}
};
