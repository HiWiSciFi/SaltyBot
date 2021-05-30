const util = require('util');

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
	// console.log(before.member.displayName + " switched channel");
	

	// const isHydra = global.musicHandler.isHydra(after.member);
	// if(isHydra) {
	// 	if(global.music.tcByVc[after.channel]?.id === global.music.tcByBot[after.member].id)
	// 	{
	// 		console.log("leave")
	// 	}
	// 	else{
	// 		const tc = global.music.tcByBot[after.member];
	// 		if(global.music.tcByVc[after.channel]) {
	// 			console.log("hydra already exists")
	// 			after.member.edit({channel: before.channel});
	// 		}
	// 		else{
	// 			before.channel.members.forEach(member => {
	// 				if(!(global.musicHandler.isHydra(member) || member.id === global.client.user.id)){
	// 					tc.updateOverwrite(member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 				}
	// 				before.channel.members.forEach(member => {
	// 					((index = global.music.listeners.findIndex(element => element.id === member.id)) =>
	// 					{
	// 						if (index > -1) {
	// 							global.music.listeners.splice(index, 1);
	// 						}
	// 					})();
	// 				});
	// 				if(global.music.openTc)
	// 					global.music.openTc.updateOverwrite(member, {'VIEW_CHANNEL': true}).catch(global.musicHandler.missingAccess);
	// 			});

	// 			after.channel.members.forEach(member => {
	// 				if(!(global.musicHandler.isHydra(member) || member.id === global.client.user.id)){
	// 					tc.updateOverwrite(member, {'VIEW_CHANNEL': true}).catch(global.musicHandler.missingAccess);;
	// 					global.music.listeners.push(member);
	// 					if(global.music.openTc)
	// 						global.music.openTc.updateOverwrite(member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 				}
	// 			});
	// 			delete global.music.tcByVc[before.channel];
	// 			global.music.tcByVc[after.channel] = tc;
	// 		}
	// 	}
	// }
	onLeave(before, after);
	onEnter(before, after);
	// console.log(util.inspect(global.music, {depth: 1}));
}

//TODO add Hydra 1. of April rickroll
function onJoin(before, after){
	// console.log(after.member.displayName + " joined channel");
	
	// const isHydra = global.musicHandler.isHydra(after.member);
	// if(isHydra) {
	// 	const tc = global.music.tcByBot[after.member];
	// 	if(global.music.tcByVc[after.channel]) {
	// 		console.log("fuck you")
	// 		//TODO test
	// 		after.member.edit({channel: null});
	// 		return;
	// 	}
	// 	else {
	// 		global.music.tcByVc[after.channel] = tc;
	// 		for(var [key,permissionOverwrite] of tc.permissionOverwrites){
	// 			if(!(global.musicHandler.isHydra(key) || key === global.client.user.id)){
					
	// 				permissionOverwrite.update({'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 			}
	// 		}  
	// 		tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);

	// 		for(var [key, member] of after.channel.members){
	// 			if(!(global.musicHandler.isHydra(key) || key === global.client.user.id)){
	// 				global.music.listeners.push(member);
	// 				tc.updateOverwrite(member, {'VIEW_CHANNEL': true}).catch(global.musicHandler.missingAccess);
	// 			}
	// 		}

	// 		if(tc.id === global.music.openTc?.id) {
	// 			global.music.openTc = global.music.freeTcs.pop();
	// 			if(global.music.openTc){
	// 				global.musicHandler.lock(global.music.openTc);
	// 				global.music.listeners.forEach(member => {
	// 					global.music.openTc.updateOverwritetc(member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 				});
	// 			}
	// 		}

	// 		var index = global.music.freeTcs.findIndex(element => element.id === tc.id)
	// 		if (index > -1) {
	// 			global.music.freeTcs.splice(index, 1);
	// 		}
	// 	}
	// }
	onEnter(before, after);
	// console.log(util.inspect(global.music, {depth: 1}));
}

//explicit leave to nothing
function onExit(before, after){
	// console.log(before.member.displayName + " left channel");
	
	// if(global.music.tcByVc[before.channel]){
	// 	const tc = global.music.tcByVc[before.channel];
	// 	const isHydra = global.musicHandler.isHydra(before.member);

	// 	if (isHydra) {

	// 		before.channel.members.forEach(member => {
	// 			var index = global.music.listeners.findIndex(element => element.id === member.id);
	// 			if (index > -1) {
	// 				global.music.listeners.splice(index, 1);
	// 			}
	// 		});
	// 		if(global.music.openTc) {
	// 			//disables VIEW_CHANNEL for all Overwrites
    //             for(var [key,permissionOverwrite] of tc.permissionOverwrites){
	// 				if(!(global.musicHandler.isHydra(key) || key === global.client.user.id)){
	// 					permissionOverwrite.update({'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);;
	// 				}
	// 			}
    //             //disables VIEW_CHANNEL for @everyone
    //             tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);;
	// 			global.music.freeTcs.push(tc);
	// 			delete global.music.tcByVc[before.channel];
	// 		}
	// 		else {
	// 			global.musicHandler.lock(tc);
	// 			global.music.openTc = tc;
	// 			global.music.listeners.forEach(member => {
	// 				if(!(global.musicHandler.isHydra(member) || member.id === global.client.user.id)){
	// 					tc.updateOverwrite(member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 				}
	// 			});
	// 			delete global.music.tcByVc[before.channel];
	// 		}
			
	// 	}
	// }
	
	onLeave(before, after);
	// console.log(util.inspect(global.music, {depth: 1}));
}

//inclusive come from nothing / from another channel
function onEnter(before, after){
	// const isHydra = global.musicHandler.isHydra(after.member);

	// if(!isHydra){
	// 	if(global.music.tcByVc[after.channel]){
	// 		var index = global.music.listeners.findIndex(element => element.id === after.member.id);
	// 		if (index === -1) {
	// 			global.music.listeners.push(after.member);
	// 		}
	// 		global.music.tcByVc[after.channel].updateOverwrite(after.member, {'VIEW_CHANNEL': true}).catch(global.musicHandler.missingAccess);;
	// 		if(global.music.openTc && after.member.id !== global.client.user.id){
	// 			global.music.openTc.updateOverwrite(after.member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);;
	// 		}
	// 	}
	// }

	// if creation channel
	if (`${after.channel.id}` in data_creationVcs) {
		channelutils.createChannel(after.channel, after.member);
	}

	// if created channel
	if (after.channel in data_createdVcs) {
		channelutils.addPerms(after.channel, after.member);
	}

}

//inclusive leave to nothing / to another channel
function onLeave(before, after){
	// const isHydra = global.musicHandler.isHydra(before.member);
	// if(!isHydra){
	// 	if(global.music.tcByVc[before.channel]){
	// 		var index = global.music.listeners.findIndex(element => element.id === before.member.id);
	// 		if (index > -1) {
	// 			global.music.listeners.splice(index, 1);
	// 		}
	// 		if(before.member.id !== global.client.user.id){
	// 			global.music.tcByVc[before.channel].updateOverwrite(before.member, {'VIEW_CHANNEL': false}).catch(global.musicHandler.missingAccess);
	// 			if (global.music.openTc) {
	// 				global.music.openTc.updateOverwrite(after.member, {'VIEW_CHANNEL': true}).catch(global.musicHandler.missingAccess);;
	// 			}
	// 		}
	// 	}
	// }

	// if created vc
	if (before.channel in data_createdVcs) {
		(async() => {
			await channelutils.removePerms(before.channel, before.member);
			channelutils.removeChannelIfEmpty(before.channel);
		})();
	}
}