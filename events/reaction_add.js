client.on('messageReactionAdd', async (reaction, user) => {
    if(user.id === global.client.user.id) return;

    if(global.data_configMsgs?.[reaction.message.channel] === reaction.message.id){
        switch (reaction.emoji.toString()) {
            case "🔒":
                console.log("🔒");
                break;
            case "🔓":
                console.log("🔓");
                break;
        }
        var remove = reaction.users.remove(user);
    }
    await remove;
});