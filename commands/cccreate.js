module.exports = {
	name: "cccreate",
	description: "Create a creation channel",
	options: [
		{
			name: "channelid",
			description: "The ID of the channel to turn into a creation channel",
			type: 3,/*1:SUB_COMMAND 2:SUB_COMMAND_GROUP 3:STRING 4:INTEGER 5:BOOLEAN 6:USER 7:CHANNEL 8:ROLE 9:MENTIONABLE*/
			required: true
		},
		{
			name: "channelname",
			description: "The defaultname of the created channels",
			type: 3,
			required: true
		}
	],
	ephemeral: true,
	permissions: ["MANAGE_CHANNELS"],
	callback: (interaction, args, member, guild) => {
		global.data_creationVcs[args["channelid"]] = args["channelname"];
		global.dataHandler.saveCreationVcs();

		return new Discord.MessageEmbed()
			.setTitle('Creation vc created!')
			.setDescription(`Channel with ID ${args["channelid"]} turned into a creation vc with standard name \"${args["name"]}\"!`)
			.setColor(global.defaultcolor);
	},
	errorcallback: (err, interaction, args, member, guild) => {
		return new Discord.MessageEmbed()
			.setTitle('Error')
			.setDescription(err)
			.setColor(global.errorcolor);
	}
};