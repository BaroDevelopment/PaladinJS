const { gPrefix } = require('../../config.json');
const { MessageEmbed} = require('discord.js');
module.exports = {
	name: 'Embed',
	description: 'Generate a beautiful and easy to create embed powered by [Embed-Visualizer](https://leovoel.github.io/embed-visualizer/)',
	category: 'misc',
	guildOnly: false,
	args: true,
	documentationURL: 'https://paladin.netlify.com/search/embed.html',
	usage: [`${gPrefix}embed [message]`, `${gPrefix}embed [json]`],
	params: ['[`json]` - The JSON code to convert into an embed', '[`message]` - The message to display in an embed'],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		try {
			message.channel.send(JSON.parse(args.msg.join(' ')));
		} catch (e) {
			const embed = new MessageEmbed().setColor('#FF00FF');
			message.channel.send(embed.setDescription(args.msg.join(' ')));
		}
	},
};