global.errorcolor = 0xB81512;
global.defaultcolor = 0x3DA894;

function getEmbed(title, description, color) {
	return new Discord.MessageEmbed()
	.setTitle(title)
	.setDescription(description)
	.setColor(color);
};

async function sendEmbed(channel, title, description, color) {
	return await channel.send(getEmbed(title, description, color));
};

module.exports.getEmbed = getEmbed;
module.exports.sendEmbed = sendEmbed;
