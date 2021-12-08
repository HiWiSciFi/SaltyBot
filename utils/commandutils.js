const fs = require('fs');
const path = require('path');

// permission list by discord
const availablePerms = [
	"ADMINISTRATOR",
	"CREATE_INSTANT_INVITE",
	"KICK_MEMBERS",
	"BAN_MEMBERS",
	"MANAGE_CHANNELS",
	"MANAGE_GUILD",
	"ADD_REACTIONS",
	"VIEW_AUDIT_LOG",
	"PRIORITY_SPEAKER",
	"STREAM",
	"VIEW_CHANNEL",
	"SEND_MESSAGES",
	"SEND_TTS_MESSAGES",
	"MANAGE_MESSAGES",
	"EMBED_LINKS",
	"ATTACH_FILES",
	"READ_MESSAGE_HISTORY",
	"MENTION_EVERYONE",
	"USE_EXTERNAL_EMOJIS",
	"VIEW_GUILD_INSIGHTS",
	"CONNECT",
	"SPEAK",
	"MUTE_MEMBERS",
	"DEAFEN_MEMBERS",
	"MOVE_MEMBERS",
	"USE_VAD",
	"CHANGE_NICKNAME",
	"MANAGE_NICKNAMES",
	"MANAGE_ROLES",
	"MANAGE_WEBHOOKS",
	"MANAGE_EMOJIS"
];

// get application through client api
function getApp() {
	return global.client.api.applications(global.client.user.id).guilds(process.env.SERVER);
};

function assembleOptionDict(options) {
	let optionDict = { };
	options.forEach(option => {
		optionDict[option.name] = option.value;
	});
	return optionDict;
};

async function loadCommands() {
	console.log("Loading commands...");
	// read commands directory
	await fs.readdir(path.join(__dirname, '../commands'), async (err, files) => {
		if (err) {
			throw console.log('Unable to scan directory: ' + err);
		}
		
		// load code
		let commandFiles = [];
		files.forEach(file => {
			if (path.extname(file) === '.js') commandFiles.push(require('../commands/' + file));
		});
		
		// register commands
		commandFiles.forEach(async (command) => {
			await getApp().commands.post({
				data: {
					// the command string
					name: command.name,
					// command description
					description: command.description === undefined ? "" : command.description,
					// command parameters
					options: command.options === undefined ? [ ] : command.options,
					// if commands is usually available on servers
					default_permission: command.default_permission === undefined ? true : command.default_permission
				}
			});
		});
		
		// interaction callback
		await global.client.ws.on('INTERACTION_CREATE', async (interaction) => {
			// get command name
			const commandText = interaction.data.name.toLowerCase();
			const args = interaction.data.options === undefined ? { } : assembleOptionDict(interaction.data.options);
			
			// register callbacks
			let guild = await global.client.guilds.fetch(process.env.SERVER);
			for (var i = 0; i < commandFiles.length; i++) {
				let command = commandFiles[i];
				if (commandText === command.name) {
					let msg;
					
					// get member who called interaction
					let member = new Discord.GuildMember(global.client, interaction.member, guild);
					
					// check permissions
					let permitted = true;
					
					for (var i = 0; i < (command.permissions === undefined ? 0 : command.permissions.length); i++) {
						// if permission string is not valid
						if (!availablePerms.includes(command.permissions[i])) {
							permitted = false;
							msg = await command.errorcallback('Permission unknown! Available Permissions: ' + availablePerms, interaction, args, member, guild);
							break;
						}
					}
					
					if (permitted) {
						// if member does not have required permissions
						if (!member.hasPermission(command.permissions, { checkAdmin: true, checkOwner: false })) {
							permitted = false;
							msg = await command.errorcallback('You do not have the permissions to use this command!', interaction, args, member, guild);
						}
					}
					
					// call command callback if permitted
					if (permitted) msg = await command.callback(interaction, args, member, guild);
					
					// check if returned value is a message
					let embed = false;
					if (msg instanceof Discord.MessageEmbed) embed = true;
					
					// send interaction reply
					global.client.api.interactions(interaction.id, interaction.token).callback.post({
						data: {
							type: 4,
							data: {
								flags: command.ephemeral === undefined ? true : (command.ephemeral ? 64 : 0),
								content: embed ? undefined : msg,
								embeds: embed ? [msg] : [ ]
							}
						}
					});
					break;
				}
			}
		});
	});
	console.log('Commands loaded!');
};

async function unloadCommands() {
	console.log("Unloading commands...");
	// get commands from web api
	const commands = await getApp().commands.get();
	// iterate over all commands and delete by id
	for (var i = 0; i < commands.length; i++) {
		command = getApp().commands(commands[i]);
		console.log(command);
		/*if (true) {
			await getApp().commands(commands[i].id).delete();
		}*/
	}
	console.log('Commands unloaded!');
};

module.exports.loadCommands = loadCommands;
module.exports.unloadCommands = unloadCommands;