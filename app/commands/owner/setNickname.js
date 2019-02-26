const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'SetNickname',
	description: 'Change Paladin\'s username',
	usage: [`\`${gPrefix}setNickname [name]\``],
	cooldown: 1,
	args: true,
	guildOnly: false,
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	params: ['`[name]` - Paladin\'s new nickname', '`[reason]` - for audit-logs (optional)'],
	documentationURL: 'https://paladin.netlify.com/owner/setNickname.html',
	arguments: [
		{ name: 'name', type: String, multiple: true, alias: 'n', defaultOption: true },
		{ name: 'reason', type: String, multiple: true, alias: 'r'}, // For audit logs
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		const reason = args.reason ? args.reason.join(' ') : '';
		message.guild.me.setNickname(args.name.join(' '), reason).then(
			message.channel.send(embed.setDescription('You have successfully changed my nickname!'))
		).catch(e => e)

	},
};