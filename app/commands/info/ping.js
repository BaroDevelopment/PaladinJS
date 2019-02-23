const { gPrefix } = require('../../config.json');
const Discord = require('discord.js');
const emote = require('../util/emote.js');
const { images } = require('../util/statics.js');

module.exports = {
	name: 'Ping',
	description: '',
	category: 'info',
	guildOnly: false,
	documentationURL: 'https://ylngyang.github.io/PaladinJS/information/ping.html',
	usage: [`${gPrefix}ping`],
	botPermissions: ['ADD_REACTIONS'],
	cooldown: 60,
	async execute(message) {
		const start = new Date().getTime();
		let duration = 0;
		await message.react(emote.check.id);
		duration = new Date().getTime() - start;
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
			.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.setThumbnail(images.shield)
			.addField('Gateway (Rest) Ping', duration + ' ms', true)
			.addField('Discord Websocket', message.client.ws.ping.toFixed(0), true);
		message.channel.send(embed);
	},
};