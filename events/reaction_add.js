client.on('messageReactionAdd', async (reaction, user) => {
    //exits if the reaction is by the bot
    if(user.id === global.client.user.id) return;

    //if the reaction is on a config Msg
    if(global.data_configMsgs?.[reaction.message.channel] === reaction.message.id){
        //gets the vc
        var vc = global.data_createdTcs[reaction.message.channel];
        switch (reaction.emoji.toString()) {
            //lock vc
            case "🔒":
                console.log(user.username + " locked " + vc.name + " 🔒");
                //disables VIEW_CHANNEL for all Overwrites
                for(var permissionOverwrite of vc.permissionOverwrites){
                    permissionOverwrite[1].update({'VIEW_CHANNEL': false});
                }
                //disables VIEW_CHANNEL for @everyone
                vc.updateOverwrite(vc.guild.roles.everyone, {'VIEW_CHANNEL': false});
                break;

            //unlock vc
            case "🔓":
                console.log(user.username + " unlocked " + vc.name + " 🔓");
                //synchonizes the channel with the category
                vc.lockPermissions();
                break;
        }
        
        //removes the reaction
        reaction.users.remove(user);
    }
});