const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'SetActivity',
	description: 'Change Paladin\'s activity',
	usage: [`\`${gPrefix}setActivity [activity]\``],
	cooldown: 1,
	args: true,
	guildOnly: false,
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	params: ['`[activity]` - The message to display'],
	documentationURL: 'https://paladin.netlify.com/owner/setActivity.html',
	arguments: [
		{ name: 'msg', type: String, alias: 'm', multiple: true, defaultOption: true },
		{ name: 'type', type: String, alias: 't', defaultValue: 'PLAYING' },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {

		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
		/** available types
		 PLAYING
		 STREAMING
		 LISTENING
		 WATCHING
		 */
		try {
			await message.client.user.setActivity(args.msg.join(' '), {type: args.type}).catch(console.error)
		}catch (e) {
			await message.client.user.setActivity(args._unknown.join(' '), {type: args.type}).catch(console.error)
		}
		message.channel.send(embed.setDescription('You have successfully changed my activity!'));
	},
};