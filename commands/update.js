module.exports = {
	name: "update",
	description: "Update the bot code (except for the main file, the discord api and commands)",
	options: [
		{
			name: "confirm",
			description: "true, to confirm updating the bot",
			type: 3,
			required: false
		}
	],
	ephemeral: true,
	permissions: ["MANAGE_GUILD"],
	callback: (interaction, args, member, guild) => {
		if (!("confirm" in args)) {
			return new Discord.MessageEmbed()
				.setTitle('Confirm')
				.setDescription(`Do you really want to update the bot? If so, type \`/update true\``)
				.setColor(global.defaultcolor);
		} else if (confirm.toLowerCase() === "true") {
			require('../utils/updater').update();
			return new Discord.MessageEmbed()
				.setTitle('Bot updated!')
				.setDescription(`The Bot has been updated to the newest version available [here](https://github.com/hiwiscifi/SaltyBot).`)
				.setColor(global.defaultcolor);
		} else {
			return new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(`Wrong command syntax! Please type \`/help update\` for syntax information!`)
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