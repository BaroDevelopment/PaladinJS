const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'SetAvatar',
	description: 'Change Paladin\'s avatar',
	usage: [`\`${gPrefix}setAvatar [avatar_url]\``],
	cooldown: 1,
	args: true,
	guildOnly: false,
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	params: ['`[avatar_url]` - The url of your avatar'],
	documentationURL: 'https://paladin.netlify.com/owner/setAvatar.html',
	arguments: [
		{ name: 'url', type: String, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		const regex = /^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i.test(args.url);

		if (!regex)
			return message.channel.send(embed.setDescription('Invalid URL'));

		await message.client.user.setAvatar(args.url)
		message.channel.send(embed.setDescription('You have successfully changed my avatar!'));
	},
};