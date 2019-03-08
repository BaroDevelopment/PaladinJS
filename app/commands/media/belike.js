const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const { images } = require('../../util/statics.js');

module.exports = {
	name: 'BeLike',
	description: 'Show others your coolness and send a Be-Like-Bill Meme',
	category: 'media',
	documentationURL: 'https://paladin.netlify.com/media/belike.html',
	usage: [`${gPrefix}belike`],
	args: false,
	guildOnly: false,
	aliases: ['belike', 'bl'],
	cooldown: 30,
	params:['`[name]` - The name to show. If not given your name will be choosen'],
	arguments: [
		{ name: 'name', type: String, multiple: true, alias: 'n', defaultOption: true },
		{ name: 'sex', type: String, alias: 's' },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		const sex = args.sex ? args.sex : getSex();
		const name = args.name ? args.name : message.author.username;
		const url = `https://belikebill.ga/billgen-API.php?default=1&name=${name}&sex=${sex}`;
		embed.setImage(url);
		message.channel.send(embed);
	},
};

function getSex() {
	const choice = ['f', 'm'];
	return choice[Math.floor(Math.random() * 2)];
}