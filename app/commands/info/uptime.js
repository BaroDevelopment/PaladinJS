const { gPrefix } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'Uptime',
	description: '',
	category: 'info',
	guildOnly: false,
	documentationURL: 'https://paladin.netlify.com/information/uptime.html',
	usage: [`${gPrefix}uptime`],
	cooldown: 60,
	execute(message) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		embed.setDescription('I\'ve been online for\n' + this.getUptime(message))
		message.channel.send(embed);
	},
	getUptime(message){
		let totalSeconds = (message.client.uptime / 1000).toFixed(0);
		let days = Math.floor(totalSeconds / 86400).toFixed(0);
		let hours = Math.floor(totalSeconds / 3600).toFixed(0);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60).toFixed(0);
		let seconds = (totalSeconds % 60).toFixed(0);

		return `${days == 0 ? '' : days + ' days, '} ${hours == 0 ? '' : hours + ' hours,'}`
			+ `${minutes == 0 ? '' : minutes + ' minutes and '} ${seconds} seconds`
	}
};