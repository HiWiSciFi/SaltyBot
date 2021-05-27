const channelutils = require('../utils/channelutils');

global.client.on('voiceStateUpdate', async (before, after) => {
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
		if (`${before.guild.id}` === process.env.SERVER) {
			if (`${before.channel.id}` in global.data_creationVcs) {
				return;
			}
		}
	}

	// entered a channel
	if (after.channel !== null) {
		// if server is correct
		if (`${after.guild.id}` === process.env.SERVER) {
			// if creation channel
			if (`${after.channel.id}` in global.data_creationVcs) {
				await channelutils.createChannel(after.channel, after.member);
			}

			// if created channel
			if (after.channel in global.data_createdVcs) {
				console.log("Entered created channel!");
				await channelutils.addPerms(after.channel, after.member);
			}
		}
	}

	// exited a channel
	if (before.channel !== null) {
		// if server is correct
		if (`${before.guild.id}` === process.env.SERVER) {
			// if created vc
			if (before.channel in global.data_createdVcs) {
				console.log("Exited created channel!");
				await channelutils.removePerms(before.channel, before.member);
				await channelutils.removeChannelIfEmpty(before.channel);
			}
		}
	}
});
