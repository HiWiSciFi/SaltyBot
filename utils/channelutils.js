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
	await member.voice.setChannel(created_vc);

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
	await created_tc.createOverwrite(member.user, {VIEW_CHANNEL: true});

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
	await created_vc.edit({name: channelname});
	await created_tc.edit({name: channelname});

	// send configuration message
	let configMsg = await helpers.sendEmbed(created_tc, "Channel Configuration", "react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: unlocked", defaultcolor);
	data_configMsgs[created_tc] = configMsg.id;

	// add reactions to config msg
	await configMsg.react('🔒');
	await configMsg.react('🔓');

	// delete channel if instantly quit
	await removeChannelIfEmpty(created_vc);

	// log creation
	console.log(`User ${member.user.username} created Channel \"${channelname}\"`);
};

async function removeChannelIfEmpty(channel) {
	if (channel.members.size < 1) {
		// get vc name
		channelname = channel.name;

		// get tc
		tc = data_createdVcs[channel];

		// delete channels
		await channel.delete();
		await tc.delete();

		// remove from lists
		delete data_configMsgs[tc];
		delete data_createdTcs[tc];
		delete data_createdVcs[channel];

		// log channel removal
		console.log(`Channel \"${channelname}\" has been deleted`);
	}
};

async function addPerms(voiceChannel, member) {
	await data_createdVcs[voiceChannel].createOverwrite(member.user, {VIEW_CHANNEL: true});
};

async function removePerms(voiceChannel, member) {
	await data_createdVcs[voiceChannel].permissionOverwrites.get(member.id).delete();
};

// export functions
module.exports.createChannel = createChannel;
module.exports.removeChannelIfEmpty = removeChannelIfEmpty;
module.exports.addPerms = addPerms;
module.exports.removePerms = removePerms;
