const {MessageEmbed} = require('discord.js');
const { gPrefix } = require('../../config.json');
const { getUser } = require('../util/paladinUtils.js');

module.exports = {
	name: 'Avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	category: 'info',
	guildOnly: false,
	documentationURL: 'https://paladin.netlify.com/information/avatar.html',
	usage: [`${gPrefix}avatar`, `${gPrefix}avatar [@user]`, `${gPrefix}avatar [user-name]`, `${gPrefix}avatar [user-id]`],
	aliases: ['icon', 'pfp'],
	params: ['`[@user]` - user as mention', '`[@user1 @user2 ... @user5]` - get up to 5 avatars.',
		'`[user-id]` - id of the user',
		'`[user-name]` - the username',
	],
	cooldown: 5,
	execute(message, args) {
		if (message.mentions.users.size > 1) {
			const mentionedUsers = message.mentions.users.array().slice(0, 5);
			mentionedUsers.map(user => {
				const exampleEmbed = new Discord.RichEmbed().setColor('#FF00FF');
				exampleEmbed.setImage(user.displayAvatarURL());
				exampleEmbed.setAuthor(user.username, user.displayAvatarURL(), user.displayAvatarURL());
				return message.channel.send(exampleEmbed);
			});
			return;
		}

		const target = getUser(message, args);

		if (!target)
			return message.channel.send('No user found!');

		const exampleEmbed = new MessageEmbed().setColor('#FF00FF');
		exampleEmbed.setImage(target.displayAvatarURL());
		exampleEmbed.setAuthor(target.username, target.displayAvatarURL(), target.displayAvatarURL());
		return message.channel.send(exampleEmbed);
	},
};