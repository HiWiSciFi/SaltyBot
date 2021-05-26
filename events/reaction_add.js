client.on('messageReactionAdd', async (reaction, user) => {

    if(global.data_configMsgs?.[reaction.message.channel] === reaction.message.id){
        switch (reaction.emoji.toString()) {
            case "🔒":
                console.log("🔒");
                break;
            case "🔓":
                console.log("🔓");
                break;
        }
        var reomve = reaction.remove();
    }

    await reomve;
});
