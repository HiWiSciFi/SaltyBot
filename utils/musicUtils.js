const hydraIds = ["547905866255433758","762764142699741195","762764216670617650","696281481395568721"];

function initiate() {
    tcs = Object.keys(global.music.tcByBot).map(bot => global.music.tcByBot[bot]);
    if(!tcs) return;
    for(var i = 1; i < tcs.length; i++) {
        var tc = tcs[i];
        //disables VIEW_CHANNEL for all Overwrites
        for(var [key,permissionOverwrite] of tc.permissionOverwrites){
            permissionOverwrite.update({'VIEW_CHANNEL': false}).catch(missingAccess);
        }
        //disables VIEW_CHANNEL for @everyone
        tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false}).catch(missingAccess); 

        global.music.freeTcs.push(tc);
    }
    lock(tcs[0]);
    global.music.openTc = tcs[0];
}

function terminate() {
    Object.keys(global.music.tcByBot).forEach(key => {
        lock(global.music.tcByBot[key]);
    });
}

function lock(channel){
    if(channel.lockPermissions) {
        channel.lockPermissions();
        channel.updateOverwrite(global.client.user,{'VIEW_CHANNEL': true}).catch(missingAccess);
        hydraIds.forEach(element => {
            channel.updateOverwrite(element,{'VIEW_CHANNEL': true}).catch(error => {
                if (error.name === "TypeError [INVALID_TYPE]" && error.message === "Supplied parameter is not a User nor a Role.")
                    return;
                else
                    missingAccess(error);
            });
        });
    }
    else{
        for(var [key,permissionOverwrite] of channel.permissionOverwrites){
            if(!(isHydra(key) || key === global.clientInformation.user.id)){
                permissionOverwrite.update({'VIEW_CHANNEL': null}).catch(missingAccess);
            }
        }
        channel.updateOverwrite(channel.guild.roles.everyone, {'VIEW_CHANNEL': null}).catch(missingAccess);
    }
} 

function isHydra(user) {
    return hydraIds.includes(user.id ?? user);
}

function missingAccess(error){
    if(error.name === "DiscordAPIError" && error.message === "Missing Access") {
        console.log("The bot is probably missing acces to a hydra channel:")
    }
    console.log(error);
}

module.exports.initiate = initiate;
module.exports.terminate = terminate;
module.exports.isHydra = isHydra;
module.exports.missingAccess = missingAccess;
module.exports.lock = lock;