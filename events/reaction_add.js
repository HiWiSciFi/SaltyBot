client.on('messageReactionAdd', async (reaction, user) => {
    //exits if the reaction is by the bot
    if(user.id === global.client.user.id) return;

    //if the reaction is on a config Msg
    if(global.data_configMsgs?.[reaction.message.channel].id === reaction.message.id){
        //gets the vc / tc
        var tc = reaction.message.channel;
        var vc = global.data_createdTcs[tc];
        switch (reaction.emoji.toString()) {
            //lock vc
            case "🔒":
                console.log(user.username + " locked " + vc.name + " 🔒");
                //disables VIEW_CHANNEL for all Overwrites
                for(var [key,permissionOverwrite] of vc.permissionOverwrites){
                    permissionOverwrite.update({'VIEW_CHANNEL': false});
                }
                //disables VIEW_CHANNEL for @everyone
                vc.updateOverwrite(vc.guild.roles.everyone, {'VIEW_CHANNEL': false});
                //update embed
                global.data_configMsgs[tc].edit(helpers.getEmbed("Channel Configuration", "react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: locked", defaultcolor))
                    .then(msg => global.data_configMsgs[tc] = msg);
                break;

            //unlock vc
            case "🔓":
                console.log(user.username + " unlocked " + vc.name + " 🔓");
                //synchonizes the channel with the category
                if(vc.lockPermissions)
                    vc.lockPermissions();
                else {
                    for(var [key,permissionOverwrite] of vc.permissionOverwrites){
                        permissionOverwrite.update({'VIEW_CHANNEL': null});
                    }
                    cc.updateOverwrite(cc.guild.roles.everyone, {'VIEW_CHANNEL': null}); 
                }
                //update embed
                global.data_configMsgs[tc].edit(helpers.getEmbed("Channel Configuration", "react with 🔒 to make the voice channel private and with 🔓 to make it public again!\nCurrent status: unlocked", defaultcolor))
                    .then(msg => global.data_configMsgs[tc] = msg);
                break;
        }
        
        //removes the reaction
        reaction.users.remove(user);
    }
});