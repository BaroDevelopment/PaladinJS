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
	params: [`\`emote\` - emote to add as or url`],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, alias: 'm', multiple: true, defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		if (args.msg.length !== 2)
			return message.channel.send(embed.setDescription('Invalid URL'))

		message.guild.emojis.create(args.msg[1], args.msg[0])
			.then(emoji => message.channel.send(embed.setDescription('Successfully added new emote: ' + emoji.toString())))
			.catch(e => message.channel.send(embed.setDescription('Invalid URL')));
	},
};