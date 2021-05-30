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

	if(after.channel && before.channel) {
		if (`${after.guild.id}` === permittedServer && `${before.guild.id}` === permittedServer) 
			onSwitch(before, after);
	}
	else {
		// entered a channel
		if (after.channel !== null) {
			// if server is correct
			if (`${after.guild.id}` === permittedServer) 
				onJoin(before, after);
		}

		// exited a channel
		if (before.channel !== null) {
			// if server is correct
			if (`${before.guild.id}` === permittedServer) 
				onExit(before, after);
		}
	}
});

function onSwitch(before, after) {
	onExit(before, after);
	onEnter(before, after);

	const isHydra = global.musicHandler.isHydra(after.member);
	if(isHydra) {
		if(global.music.toByVc[after.channel].id === global.music.tcByBot[after.member].id)
		{
			return;
		}

		const tc = global.music.tcByBot[after.member];
		if(global.music.tcByVc[after.channel]) {
			after.member.edit({channel: before.channel});
			return;
		}

		before.channel.members.forEach(member => {
			tc.updateOverwrite(member, {'VIEW_CHANNEL': false});
			before.channel.members.forEach(member => {
				((index = global.music.listeners.findIndex(element => element.id === member.id)) =>
				{
					if (index > -1) {
						global.music.listeners.splice(index, -1);
					}
				})();
			});
			global.music.openTc.updateOverwrite(member, {'VIEW_CHANNEL': true})
		});

		after.channel.members.forEach(member => {
			tc.updateOverwrite(member, {'VIEW_CHANNEL': true});
			global.music.listeners.push(member);
			global.music.openTc.updateOverwrite(member, {'VIEW_CHANNEL': false})
		});
	}
}

//TODO add Hydra 1. of April rickroll
function onJoin(before, after){
	onEnter(before, after);

	const isHydra = global.musicHandler.isHydra(after.member);
	if(isHydra) {
		const tc = global.tcByBot[after.member];
		if(global.tcByVc[after.channel]) {
			after.member.edit({channel: null});
			return;
		}
		global.tcByVc[after.channel] = tc;
		for(var [key,permissionOverwrite] of tc.permissionOverwrites){
			permissionOverwrite.update({'VIEW_CHANNEL': false});
		}
		tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false});

		after.channel.members.forEach(([key, member]) => {
			global.music.listeners.push(member);
			tc.updateOverwrite(member, {'VIEW_CHANNEL': true});
		});

		if(tc.id === global.music.openTc.id) {
			global.music.openTc = global.music.freeTcs.pop();
			global.musicHandler.lock(global.music.openTc);
			global.music.listeners.forEach(member => {
				global.music.openTc.updateOverwritetc(member, {'VIEW_CHANNEL': false});
			});
		}
		var index = global.music.freeTcs.findIndex(element => element.id === tc.id)
		if (index > -1) {
			global.music.freeTcs.splice(index, -1);
		}
	}
}

//explicit leave to nothing
function onExit(before, after){
	onLeave(before, after);
	if(global.music.tcByVc[before.channel]){
		const tc = global.music.tcByVc[before.channel];
		const isHydra = global.musicHandler.isHydra(before.member);

		if (isHydra) {
			if(global.music.openTc) {
				//disables VIEW_CHANNEL for all Overwrites
                for(var [key,permissionOverwrite] of tc.permissionOverwrites){
                    permissionOverwrite.update({'VIEW_CHANNEL': false});
                }
                //disables VIEW_CHANNEL for @everyone
                tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false});
				global.music.freeTcs.push(tc);
				delete global.tcByVc[before.channel];
			}
			else {
				global.musicHandler.lock(tc);
				global.music.openTc = tc;
				global.music.listeners.forEach(member => {
					tc.updateOverwritetc(member, {'VIEW_CHANNEL': true});
				});
				delete global.music.tcByVc[before.channel];
			}
			before.channel.members.forEach(member => {
				var index = global.music.listeners.findIndex(element => element.id === member.id);
				if (index > -1) {
					global.music.listeners.splice(index, -1);
				}
			});
		}
	}
}

//inclusive come from nothing / from another channel
function onEnter(before, after){
	// if creation channel
	if (`${after.channel.id}` in data_creationVcs) {
		channelutils.createChannel(after.channel, after.member);
	}

	// if created channel
	if (after.channel in data_createdVcs) {
		console.log("Entered created channel!");
		channelutils.addPerms(after.channel, after.member);
	}

	const isHydra = global.musicHandler.isHydra(after.member);

	if(!isHydra){
		if(global.music.tcByVc[after.channel]){
			var index = global.music.listeners.findIndex(element => element.id === after.member.id);
			if (index === -1) {
				listeners.push(after.member);
			}
			global.music.tcByVc[after.channel].updateOverwrite(after.member, {'VIEW_CHANNEL': true})
		}
	}
}

//inclusive leave to nothing / to another channel
function onLeave(before, after){
	// if created vc
	if (before.channel in data_createdVcs) {
		console.log("Exited created channel!");
		(async() => {
			await channelutils.removePerms(before.channel, before.member);
			channelutils.removeChannelIfEmpty(before.channel);
		})();
	}


	const isHydra = global.musicHandler.isHydra(before.member);
	if(!isHydra){
		if(global.music.tcByVc[before.channel]){
			var index = global.music.listeners.findIndex(element => element.id === before.member.id);
			if (index > -1) {
				global.music.listeners.splice(index, -1);
			}
			global.music.tcByVc[before.channel].updateOverwrite(before.member, {'VIEW_CHANNEL': false})
		}
	}
}