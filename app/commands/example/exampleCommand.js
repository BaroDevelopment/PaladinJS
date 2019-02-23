const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const { images } = require('../util/statics.js');

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
	execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');

		// .....
	},
};