async function createChannel(creationChannel, member) {
	// fetch name data
	let savedchannelname = data_creationVcs[`${creationChannel.id}`];
	let channelname = "-";

	// create vc
	let created_vc = await creationChannel.guild.channels.create(channelname, {
		type: 'voice',
		parent: creationChannel.parent
	});

	// move creator to channel
	member.voice.setChannel(created_vc);

	// create tc
	let created_tc = await creationChannel.guild.channels.create(channelname, {
		type: 'text',
		parent: creationChannel.parent
	});

	// save channel references
	data_createdVcs[created_vc] = created_tc;
	data_createdTcs[created_tc] = created_vc;

	// set tc permissions
	await created_tc.createOverwrite(client.user, {VIEW_CHANNEL: true});
	let tcperms = created_tc.permissionOverwrites;
	tcperms.forEach(tcpermow => {
		if (tcpermow.id !== client.user.id) tcpermow.delete();
	});
	await created_tc.createOverwrite(creationChannel.guild.roles.everyone, {VIEW_CHANNEL: false});
	created_tc.createOverwrite(member.user, {VIEW_CHANNEL: true});

	// assemble channel name
	channelname = '';
	ignore = false;
	for (var i = 0; i < savedchannelname.length; i++) {
		let cc = savedchannelname.charAt(i);
		if (!ignore) {
			if (cc === '\\') {
				ignore = true;
				continue;
			}
			else if (cc === '°') {
				channelname += member.user.username;
				continue;
			}
		}
		channelname += cc;
		ignore = false;
	}

	// update channel names
	created_vc.setName(channelname);
	created_tc.setName(channelname);

	// send configuration message
	let configMsg = await helpers.sendEmbed(created_tc, "Channel Configuration", "react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: unlocked", defaultcolor);
	data_configMsgs[created_tc] = configMsg;

	// add reactions to config msg
	configMsg.react('🔒');
	configMsg.react('🔓');

	// log creation
	console.log(`User ${member.user.username} created Channel \"${channelname}\"`);
	
	// remove if empty
	removeChannelIfEmpty(created_vc);
};

async function removeChannelIfEmpty(channel) {
	if (channel.members.size < 1) {
		// get vc name
		let channelname = channel.name;

		// get tc
		tc = data_createdVcs[channel];

		// remove from lists
		delete data_configMsgs[tc];
		delete data_createdTcs[tc];
		delete data_createdVcs[channel];

		// delete channels
		channel.delete();
		tc.delete();

		// log channel removal
		console.log(`Channel \"${channelname}\" has been deleted`);
	}
};

async function addPerms(voiceChannel, member) {
	await data_createdVcs[voiceChannel].createOverwrite(member.user, {VIEW_CHANNEL: true});
};

async function removePerms(voiceChannel, member) {
	await data_createdVcs[voiceChannel].permissionOverwrites.get(member.id)?.delete();
};

// export functions
module.exports.createChannel = createChannel;
module.exports.removeChannelIfEmpty = removeChannelIfEmpty;
module.exports.addPerms = addPerms;
module.exports.removePerms = removePerms;
