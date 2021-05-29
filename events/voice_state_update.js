client.on('voiceStateUpdate', async (before, after) => {
	// cancel if error
	if (before.channel === null && after.channel === null) {
		return;
	}

	// cancel if same channel
	if (before.channel === after.channel) {
		return;
	}

	// cancel if moved from a creation channel
	if (before.channel !== null) {
		if (`${before.guild.id}` === permittedServer) {
			if (`${before.channel.id}` in data_creationVcs) {
				return;
			}
		}
	}

	// entered a channel
	if (after.channel !== null) {
		// if server is correct
		if (`${after.guild.id}` === permittedServer) {
			// if creation channel
			if (`${after.channel.id}` in data_creationVcs) {
				channelutils.createChannel(after.channel, after.member);
			}

			// if created channel
			if (after.channel in data_createdVcs) {
				console.log("Entered created channel!");
				channelutils.addPerms(after.channel, after.member);
			}
		}
	}

	// exited a channel
	if (before.channel !== null) {
		// if server is correct
		if (`${before.guild.id}` === permittedServer) {
			// if created vc
			if (before.channel in data_createdVcs) {
				console.log("Exited created channel!");
				await channelutils.removePerms(before.channel, before.member);
				channelutils.removeChannelIfEmpty(before.channel);
			}
		}
	}
});
