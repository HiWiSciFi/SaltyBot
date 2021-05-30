function initiate() {
    tcs = Object.keys(global.music.tcByBot).map(bot => global.music.tcByBot[bot]);
    if(!tcs) return;
    for(var i = 1; i < tcs.length; i++) (tc = tcs[i]) => {
        //disables VIEW_CHANNEL for all Overwrites
        for(var [key,permissionOverwrite] of tc.permissionOverwrites){
            permissionOverwrite.update({'VIEW_CHANNEL': false});
        }
        //disables VIEW_CHANNEL for @everyone
        tc.updateOverwrite(tc.guild.roles.everyone, {'VIEW_CHANNEL': false}); 

        global.music.freeTcs.push(tc);
    }
    tcs[0].lock();
    global.music.openTc = tcs[0];
}

function terminate() {
    Object.keys(global.music.tcByBot).forEach(key => {
        global.music.tcByBot[key].lock();
    });
}

function isHydra(user) {
    return ["547905866255433758","762764142699741195","762764216670617650","696281481395568721"].includes(user);
}

module.exports.initiate = initiate;
module.exports.terminate = terminate;
module.exports.isHydra = isHydra;