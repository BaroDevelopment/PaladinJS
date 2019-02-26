const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const { images } = require('../../util/statics.js');

module.exports = {
	name: '',
	description: '',
	category: '',
	documentationURL: '',
	usage: [],
	args: true,
	guildOnly: false,
	aliases: [],
	userPermissions: [],
	botPermissions: [],
	examples: [],
	params:[],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'amount', type: Number, alias: 'n', defaultValue: 100},
		{ name: 'bots', type: Boolean, alias: 'b' },
		{ name: 'pinned', type: Boolean, alias: 'p' },
		{ name: 'time', type: Number, alias: 't' },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');

		// .....
	},
};