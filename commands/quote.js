module.exports = {
	slash: true,
	testOnly: true,
	description: 'Quote an epic gamer',
	minArgs: 2,
	expectedArgs: "<ping> <quote>",
	guildOnly: true,
	callback: ({ message, args }) => {
		const [ping, quote] = args;
		
		embed = new Discord.MessageEmbed()
			.setTitle('Quote')
			.setDescription(`This command has yet to be implemented! ping:${ping}`)
			.setColor(global.errorcolor);
		return embed;
	}
};