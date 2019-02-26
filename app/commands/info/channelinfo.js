const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const { booldReaction, getChannel, formatDate } = require('../../util/paladinUtils.js');
const { images } = require('../../util/statics.js');

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'ChannelInfo',
	description: 'Get an overview about a channel',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/channelinfo.html',
	usage: [`\`${gPrefix}channelinfo [#channel]\``, `\`${gPrefix}channelinfo [channel id]\``, `\`${gPrefix}channelinfo [channel-name]\``],
	guildOnly: true,
	aliases: ['cinfo'],
	examples: [`\`${gPrefix}channelinfo #general\``],
	params: ['\`[#channel]\` - The channel as mention', '\`[channel-id]\` - id of channel', '\`[channel-name]\` - name of channel'],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {

		const embed = new MessageEmbed().setColor('#FF00FF');
		const target = getChannel(message, args.msg);

		if (!target)
			return message.channel.send('No channel found!');

		embed.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.addField('ID', target.id, true)
			.addField('Name', target.toString(), true)
			.setThumbnail(images.PaladinAvatar)
			.setDescription('**__Channel Overview:__**  ')
			.addField('NSFW', booldReaction(message, target.nsfw), true)
			.addField('Created at', formatDate(target.createdAt), true)
			.addField('Type', target.type.toUpperCase(), true)
			.addField('Members', target.members.size, true)
			.addField('Topic', target.topic ? target.topic.toString() : emote.disabled.mention);

		message.channel.send(embed);
	},
};