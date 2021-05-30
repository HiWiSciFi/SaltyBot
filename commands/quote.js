module.exports = {
	name: "quote",
	description: "Quote an epic gamer",
	options: [
		{
			name: "quote",
			description: "The Quote (set it in quotation marks to make it look more epic)",
			type: 3,
			required: true
		},
		{
			name: "ping",
			description: "Who did the deed?",
			type: 6,
			required: false
		}
	],
	ephemeral: true, // TEMP -> SET TO FALSE ONCE IMPLEMENTED
	permissions: ["SEND_MESSAGES"],
	callback: (interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Quote')
			.setDescription(`This command has yet to be implemented! ping:${args["ping"]}`)
			.setColor(global.errorcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};