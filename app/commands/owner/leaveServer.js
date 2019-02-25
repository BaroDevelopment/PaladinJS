const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'LeaveServer',
	description: 'Let the bot leave a Server',
	category: 'owner',
	documentationURL: 'https://paladin.netlify.com/owner/leaveServer.html',
	args: true,
	guildOnly: false,
	aliases: ['leaveGuild', 'leaveguild'],
	usage: [`\`${gPrefix}leaveServer [server_id]\``],
	userPermissions: ['BOT_OWNER'],
	params: ['`[server_id]` - The id of the server to leave'],
	cooldown: 1,
	arguments: [
		{ name: 'serverid', type: String, defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		console.log(args);
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		let result = await message.client.shard.broadcastEval(`this.guilds.get('${args.serverid}') && this.guilds.get('${args.serverid}').leave().catch(console.error)`);
		result = result.filter(e => e != null);
		if (result.length > 0)
			return message.channel.send(embed.setDescription('Successfully left the server!'));

		message.channel.send(embed.setDescription('Server not found'));
	},
};