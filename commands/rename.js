module.exports = {
	name: "rename",
	description: "rename your current voice channel",
	options: [
		{
			name: "name",
			description: "The new name for the channel",
			type: 3,
			required: true
		}
	],
	ephemeral: true,
	permissions: ["SEND_MESSAGES"],
	callback: (interaction, args, member, guild) => {
		
		if (member.voice.channel === null) {
			return new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription('Please enter a voice channel first!')
				.setColor(global.errorcolor);
		} else if (member.voice.channel in global.data_createdVcs) {
			member.voice.channel.setName(args["name"]);
			data_createdVcs[member.voice.channel].setName(args["name"]);
			return new Discord.MessageEmbed()
				.setTitle('Channel renamed!')
				.setDescription('The channel has been renamed to ' + args["name"])
				.setColor(global.defaultcolor);
		} else {
			return new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription('I don\'t have access to that channel!')
				.setColor(global.errorcolor);
		}
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};