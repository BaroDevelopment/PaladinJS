const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const statics = require('../util/statics.js');
const util = require('../util/paladinUtils.js');
const emote = require('../util/emote.js');
const {getUptime} = require('./uptime.js');

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'BotInfo',
	description: 'Get an overview about Paladin Stats',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/botinfo.html',
	args: false,
	guildOnly: false,
	aliases: ['paladin', 'stats', 'binfo', 'info'],
	usage: [`\`${gPrefix}botinfo\``],
	cooldown: 60,
	arguments: [
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {

		const guildCounts = await message.client.shard.fetchClientValues('guilds.size');
		const memberCounts = await message.client.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)');
		const channelCounts = await message.client.shard.broadcastEval('this.guilds.reduce((prev, channel) => prev + channel.channels.size, 0)');

		const totalGuilds = guildCounts.reduce((prev, val) => prev + val, 0);
		const totalMembers = memberCounts.reduce((prev, memberCount) => prev + memberCount, 0);
		const totalChannels = channelCounts.reduce((prev, channelCount) => prev + channelCount, 0);



		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
			.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.setThumbnail(statics.images.PaladinAvatar)
			.setDescription('**__Bot Stats__**')
			.addField('Name', message.client.user.toString(), true)
			.addField('Owner', 'KENTARO#2898', true)
			.addField('Shards', message.client.shard.count, true)
			.addField('Servers', totalGuilds, true)
			.addField('Channels', totalChannels, true)
			.addField('Members', totalMembers, true)
			.addField('Commands', message.client.commands.size, true)
			.addField('Ping', message.client.ws.ping.toFixed(0) + ' ms', true)
			.addField('Prefix', message.client.prefixes.get(message.guild.id))
			.addField('Since last restart', `${messagesRecieved} messages recieved\n${commandsExecuted} commands executed`, true)
			.addField('Joined Discord', util.formatDate(message.client.user.createdAt), true)
			.addField('Memory Usage', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)} MB RSS\n`
				+ `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} MB Heap`, true)
			.addField('Uptime', getUptime(message), false)
			.addField('Platforms - Libraries', `${emote.node} Node.js 10.13.0\n\n${emote.discord_js} Discord.js github:discord.js\n\n`
				+ `${emote.ubuntu} Ubuntu 16.04.5 LTS\n\n` +
				`${emote.webstorm} Webstorm 2018.2.2\n\n${emote.paladin} Paladin 1.0.4`);

		message.channel.send(embed);
	},
};