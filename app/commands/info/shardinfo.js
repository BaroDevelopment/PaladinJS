const { gPrefix } = require('../../config.json');
const Discord = require('discord.js');
const emote = require('../util/emote.js');

module.exports = {
	name: 'ShardInfo',
	description: 'Get an overview about the shards',
	category: 'info',
	guildOnly: false,
	documentationURL: 'https://ylngyang.github.io/PaladinJS/information/shardinfo.html',
	usage: [`${gPrefix}shardinfo`],
	aliases: ['shards', 'shard'],
	cooldown: 60,
	async execute(message) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
			.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL());
		const shardArray = await message.client.shard.fetchClientValues('shard.client.guilds');
		const shardStatus = await message.client.shard.fetchClientValues('shard.mode');
		const shardPings = await message.client.shard.fetchClientValues('shard.client.ws.ping');
		let totalMembers = 0;
		let totalGuilds = 0;
		let totalChannels = 0;
		let pings = [];
		for (let i = 0; i < shardArray.length; i++) {
			let members = 0;
			let guilds = 0;
			let channels = 0;
			let ping = 0;
			for (let j = 0; j < shardArray[i].length; j++) {
				members += shardArray[i][j].memberCount;
				totalMembers += shardArray[i][j].memberCount;
				channels += shardArray[i][j].channels.length;
				totalChannels += shardArray[i][j].channels.length;
				guilds++;
				totalGuilds++;
			}
			ping = shardPings[i];
			pings.push(ping.toFixed(0));
			const status = shardStatus[i] === 'process' ? emote.online : emote.offline;
			embed.addField(`${status}\nShard ${i}`, `${members} Users\n${guilds} Servers\n${channels} Channels\n${ping.toFixed(0)} ms`, true);
		}
		const avgShardPing = (pings.reduce((a, ping) => a + ping, 0) / pings.length).toFixed(0);
		embed.addField('Total', `${totalGuilds} Servers\n${totalMembers} Users\n${totalChannels} Channels`)
			.setFooter(`Avg Ping: ${avgShardPing} ms`);
		message.channel.send(embed);
	},
};