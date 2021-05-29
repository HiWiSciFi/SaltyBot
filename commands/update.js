module.exports = {
	slash: true,
	testOnly: true,
	description: 'Update the bot code (except for the main file, the discord api and commands)',
	minArgs: 0,
	expectedArgs: "[confirm]",
	permissions: ["MANAGE_GUILD"],
	guildOnly: true,
	callback: ({ message, args }) => {
		const [confirm] = args;
		
		if (confirm === undefined) {
			embed = new Discord.MessageEmbed()
				.setTitle('Confirm')
				.setDescription(`Do you really want to update the bot? If so, type \`/update true\``)
				.setColor(global.defaultcolor);
			return embed;
		} else if (confirm.toLowerCase() === "true") {
			require('../utils/updater').update();
			embed = new Discord.MessageEmbed()
				.setTitle('Bot updated!')
				.setDescription(`The Bot has been updated to the newest version available [here](https://github.com/hiwiscifi/SaltyBot).`)
				.setColor(global.defaultcolor);
			return embed;
		} else {
			embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(`Wrong command syntax! Please type \`/help update\` for syntax information!`)
				.setColor(global.errorcolor);
			return embed;
		}
	}
};
