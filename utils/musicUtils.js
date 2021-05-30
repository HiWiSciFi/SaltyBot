function initiate() {
    tcs = Object.keys(global.music.tcByBot).map(bot => global.music.tcByBot[bot]);
    if(!tcs) return;
    for(var i = 1; i < tcs.length; i++) {
        var tc = tcs[i];
        //disables VIEW_CHANNEL for all Overwrites
        for(var [key,permissionOverwrite] of tc.permissionOverwrites){
            permissionOverwrite.update({'VIEW_CHANNEL': false});
        }
        //disables VIEW_CHANNEL for @everyone
        tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false}); 

        global.music.freeTcs.push(tc);
    }
    if(tcs[0].lockPermissions) {
        tcs[0].lockPermissions();
    }
    else{
        for(var [key,permissionOverwrite] of tcs[0].permissionOverwrites){
            permissionOverwrite.update({'VIEW_CHANNEL': null});
        }
        tcs[0].updateOverwrite(tcs[0].guild.roles.everyone, {'VIEW_CHANNEL': null}); 
    }
    global.music.openTc = tcs[0];
}

function terminate() {
    Object.keys(global.music.tcByBot).forEach(key => {
        var tc = global.music.tcByBot[key];
        if(tc.lockPermissions) {
            tc.lockPermissions();
        }
        else{
            for(var [key,permissionOverwrite] of tc.permissionOverwrites){
                permissionOverwrite.update({'VIEW_CHANNEL': null});
            }
            tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': null}); 
        }
    });
}

function isHydra(user) {
    return ["547905866255433758","762764142699741195","762764216670617650","696281481395568721"].includes(user);
}

module.exports.initiate = initiate;
module.exports.terminate = terminate;
module.exports.isHydra = isHydra;