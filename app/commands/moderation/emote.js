const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const { images } = require('../../util/statics.js');
const { getMember } = require('../../util/paladinUtils.js');

module.exports = {// TODO: Docs
	name: 'Emote',
	description: 'Add emotes to your server',
	category: 'moderation',
	documentationURL: 'https://paladin.netlify.com/moderation/emote.html',
	usage: [`\`${gPrefix}emote [emote]\``],
	args: false,
	guildOnly: true,
	userPermissions: ['MANAGE_EMOJIS'],
	botPermissions: ['MANAGE_EMOJIS'],
	params: [`\`emote\` - emote to add as :emote: or url`],
	cooldown: 5,
	arguments: [
		{ name: 'name', type: String, alias: 'n', defaultOption: true },
		{ name: 'emoji', type: String, alias: 'e', defaultValue: ''},
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		console.log(args)
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		//message.guild.emojis.create()
	},
};