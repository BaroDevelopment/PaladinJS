const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const { images } = require('../../util/statics.js');
const { getMember } = require('../../util/paladinUtils.js');

module.exports = {// TODO: Docs
	name: 'Channeltopic',
	description: 'Change the topic of a channel',
	category: 'moderation',
	documentationURL: 'https://paladin.netlify.com/moderation/channeltopic.html',
	usage: [`\`${gPrefix}channeltopic [topic]\``, 'if no parameter passed then channeltopic will be cleared'],
	args: false,
	guildOnly: true,
	userPermissions: ['MANAGE_CHANNELS'],
	botPermissions: ['MANAGE_CHANNELS'],
	params: [`\`topic\` - the channel topic `, `You can mention users, roles, channels and use emotes in the topic`],
	cooldown: 5,
	arguments: [
		{ name: 'topic', type: String, multiple: true, alias: 't', defaultOption: true },
		{ name: 'reason', type: String, multiple: true, alias: 'r' },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		const topic = args.topic ? args.topic.join(' ') : '';

		!args.reason ?  message.channel.setTopic(topic) : message.channel.setTopic(topic, args.reason.join(' '))
	},
};