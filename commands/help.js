module.exports = {
	name: 'help',
	description: 'List all available commands',
	options: [
		{
			name: "command",
			description: "The command to show detailed information for",
			type: 3,/*1:SUB_COMMAND 2:SUB_COMMAND_GROUP 3:STRING 4:INTEGER 5:BOOLEAN 6:USER 7:CHANNEL 8:ROLE 9:MENTIONABLE*/
			required: false
		}
	],
	ephemeral: true,
	callback: (interaction, args, member, guild) => {
		if (!("command" in args)) {
			return new Discord.MessageEmbed()
				.setTitle('')
				.setDescription('')
				.setAuthor("Help Command", client.user.avatarURL())
				.addFields({name: "Everyone Commands", value: "\`/help\`"})
				.addFields({name: "Admin Commands", value: "\`/cccreate\`, \`/cclist\`, \`/ccremove\`, \`/update\`"})
				.setColor(global.defaultcolor);
			
		} else {
			if (args["command"].toLowerCase() === 'help' || args["command"].toLowerCase() === '/help') {
				return new Discord.MessageEmbed()
					.setTitle('help Command')
					.setDescription('List all available commands')
					.addFields({name: "Usage", value: "\`/help [Command]\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'cccreate' || args["command"].toLowerCase() === '/cccreate') {
				return new Discord.MessageEmbed()
					.setTitle('cccreate Command')
					.setDescription('Create a creation channel')
					.addFields({name: "Usage", value: "\`/cccreate <ChannelID> <Name for created channels>\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'cclist' || args["command"].toLowerCase() === '/cclist') {
				return new Discord.MessageEmbed()
					.setTitle('cclist Command')
					.setDescription('List all creation channels')
					.addFields({name: "Usage", value: "\`/cclist\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'ccremove' || args["command"].toLowerCase() === '/ccremove') {
				return new Discord.MessageEmbed()
					.setTitle('ccremove Command')
					.setDescription('Delete a creation channel')
					.addFields({name: "Usage", value: "\`/ccremove <ChannelID>\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'update' || args["command"].toLowerCase() === '/ccremove') {
				return new Discord.MessageEmbed()
					.setTitle('update Command')
					.setDescription('Update the bot code (except for the main file, the discord api and commands)')
					.addFields({name: "Usage", value: "\`/update [confirm?]\`"})
					.setColor(global.defaultcolor);
					
			} else if (args["command"].toLowerCase() === 'qccreate' || args["command"].toLowerCase() === '/qccreate') {
				return new Discord.MessageEmbed()
					.setTitle('qccreate Command')
					.setDescription('Create a quote channel')
					.addFields({name: "Usage", value: "\`/qccreate <ChannelID>\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'qclist' || args["command"].toLowerCase() === '/qclist') {
				return new Discord.MessageEmbed()
					.setTitle('qclist Command')
					.setDescription('List all quote channels')
					.addFields({name: "Usage", value: "\`/qclist\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'qcremove' || args["command"].toLowerCase() === '/qcremove') {
				return new Discord.MessageEmbed()
					.setTitle('qcremove Command')
					.setDescription('Delete a quote channel')
					.addFields({name: "Usage", value: "\`/qcremove <ChannelID>\`"})
					.setColor(global.defaultcolor);
				
			} else if (args["command"].toLowerCase() === 'quote' || args["command"].toLowerCase() === '/quote') {
				return new Discord.MessageEmbed()
					.setTitle('quote Command')
					.setDescription('Quote an epic gamer')
					.addFields({name: "Usage", value: "\`/quote <Name or ping> <Quote>\` (only works in dedicated channels!)"})
					.setColor(global.defaultcolor);
				
			} else {
				return new Discord.MessageEmbed()
					.setTitle('Error!')
					.setDescription(`No command by the name of \"${args["command"]}\" found!`)
					.setColor(global.errorcolor);
			}
		}
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};