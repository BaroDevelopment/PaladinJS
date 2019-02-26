const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'SetUsername',
	description: 'Change Paladin\'s username',
	usage: [`\`${gPrefix}setUsername [name]\``],
	cooldown: 1,
	args: true,
	guildOnly: false,
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	params: ['`[name]` - Paladin\'s new username'],
	documentationURL: 'https://paladin.netlify.com/owner/setUsername.html',
	arguments: [
		{ name: 'name', type: String, multiple: true, alias: 'n', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		await message.client.user.setUsername(args.name.join(' ')).then(
			message.channel.send(embed.setDescription('You have successfully changed my username!'))
		).catch(e => e)
	},
};