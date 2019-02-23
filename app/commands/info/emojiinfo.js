const { MessageEmbed, Util } = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'EmojiInfo',
	description: 'Get an overview about a specific emoji',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/emojiinfo.html',
	usage: [`\`${gPrefix}emojiinfo [emoji name]\``, `\`${gPrefix}emojiinfo [emoji id]\``, `\`${gPrefix}emojiinfo [:emoji:]\``],
	guildOnly: true,
	args: true,
	aliases: ['einfo'],
	params: ['\`[:emoji:]\` - The name emoji as mention', '\`[emoji name]\` - The name of the emoji', '\`[emoji id]\` - The id of the emoji'],
	cooldown: 5,
	execute(message, args) {
		const embed = new MessageEmbed().setColor('#FF00FF');
		let emoji = message.guild.emojis.find(emoji => emoji.name === args.join(' '));

		if (!emoji) {
			emoji = Util.parseEmoji(args.join(' '));
			emoji = message.guild.emojis.find(e => e.id === emoji.id);
		}

		if (!emoji)
			emoji = message.guild.emojis.find(e => e.id === args[0]);

		if (!emoji)
			return message.channel.send(embed.setDescription('Emoji not found'));

		embed.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.addField('ID', emoji.id, true)
			.addField('Name', emoji.name, true)
			.setThumbnail(emoji.url)
			.setDescription('**__Emoji Overview:__**  ')
			.addField('Created at', formatDate(emoji.createdAt), true);

		message.channel.send(embed);
	},
};