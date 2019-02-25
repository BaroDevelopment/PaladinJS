const { MessageEmbed } = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const util = require('../util/paladinUtils.js');


const memberCount = guild => guild.members.filter(m => !m.user.bot);
const botCount = guild => guild.members.filter(m => m.user.bot);

const roles = (asMention, guild) => guild.roles.map(r => asMention ? `${r.toString()} \`${r.members.size}\`   ` : `${r.name} \`(${r.members.size}\`)`).join(',  ');

const members = (message, guild) =>
	`**${memberCount(guild).size}**\n${online(message, memberCount(guild))} ${dnd(message, memberCount(guild))}`
	+ `${idle(message, memberCount(guild))} ${offline(message, memberCount(guild))}` +
	`${streaming(message, memberCount(guild))}`;

const bots = (message, guild) =>
	`**${botCount(guild).size}**\n${online(message, botCount(guild))} ${dnd(message, botCount(guild))}`
	+ `${idle(message, botCount(guild))} ${offline(message, botCount(guild))}` +
	`${streaming(message, botCount(guild))}`;

const totalMember = (message, guild) =>
	`**${guild.members.size}**\n${online(message, guild.members)} ${dnd(message, guild.members)}`
	+ `${idle(message, guild.members)} ${offline(message, guild.members)}` +
	`${streaming(message, guild.members)}`;

const online = (message, members) => emote.online +
	members.filter(m => m.presence.status === 'online').size;
const dnd = (message, members) => emote.dnd +
	members.filter(m => m.presence.status === 'dnd').size;
const idle = (message, members) => emote.idle +
	members.filter(m => m.presence.status === 'idle').size;
const offline = (message, members) => emote.offline +
	members.filter(m => m.presence.status === 'offline').size;
const streaming = (message, members) => emote.streaming +
	members.filter(m => m.presence.game && m.presence.game.streaming).size;

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'ServerInfo',
	description: 'Display full information about a discord server',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/serverinfo.html',
	usage: [`\`${gPrefix}serverinfo\``, `\`${gPrefix}serverinfo [server id]\``, `\`${gPrefix}serverinfo [name-name]\``],
	args: false,
	guildOnly: false,
	aliases: ['sinfo'],
	examples: [`\`${gPrefix}serverinfo Paladin Bot\``],
	params: ['\`[server-id]\` - id of server', '\`[server-name]\` - name of server'],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		const embed = new MessageEmbed().setColor('#FF00FF');

		if (!message.guild && !args.msg)
			return message.channel.send('Please provide arguments');

		const target = getServer(message, args.msg);
		if (!target)
			return message.channel.send('No server found!');

		const textChannelCount = target.channels.filter(c => c.type == 'text').size;
		const voiceChannelCount = target.channels.filter(c => c.type == 'voice').size;

		const afkChannel = target.afkChannel ? target.afkChannel.name : emote.disabled.mention;

		embed.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.setThumbnail(target.iconURL(true).replace('.jpg', '.png'))
			.setDescription('**__SERVER STATS__**')
			.addField('Server Name', target.name, true)
			.addField('Server ID', target.id, true)
			.addField('Server Owner', target.owner.toString(), true)
			.addField('Server Region', getRegionIcon(message, target.region) + target.region.toUpperCase(), true)
			.addField('AFK Channel', afkChannel, true)
			.addField('Channels', `**Text Channels:** ${textChannelCount}\n**Voice Channels:** ${voiceChannelCount}`, true)
			.addField('Creation Date', util.formatDate(target.createdAt), true)
			.addField('Shard', message.client.shard.id, true)
			.addField('Ping', message.client.ws.ping.toFixed(0), true)
			.addField('Members - Bots', `${emote.member} Members: ${members(message, target)}`
				+ `\n${emote.botTag} Bots: ${bots(message, target)}`
				+ `\n${emote.hypesquad} **__TOTAL__**: ${totalMember(message, target)}`)

		let roles_1 = '';
		let roles_2 = '';
		let roles_3 = '';
		const Roles = message.guild && target.id === message.guild.id ? roles(true, target) : roles(false, target);
		for (let i = 0; i < Roles.length; i++) {
			if (roles_1.length < 900)
				roles_1 += Roles[i];
			else if (roles_2.length < 900)
				roles_2 += Roles[i];
			else roles_3 += Roles[i];
		}
		embed.addField('Roles', roles_1, false);
		if (roles_2.length > 0)
			embed.addField('Roles', roles_2, false);

		embed.addField('Verification Level', target.verificationLevel, true);
		embed.addField('Emotes Count', `Static: ${target.emojis.filter(e => !e.animated).size}`
			+ `\nAnimated: ${target.emojis.filter(e => e.animated).size}\n**Total:** ${target.emojis.size}`, true);

		let emotes_1 = '';
		let emotes_2 = '';
		let emotes_3 = '';
		let emotes_4 = '';
		const emojis = target.emojis.array();
		for (let i = 0; i < emojis.length; i++) {
			if (emotes_1.length < 950)
				emotes_1 += `${emojis[i]}  `;
			else if (emotes_2.length < 950)
				emotes_2 += `${emojis[i]}  `;
			else if (emotes_3.length < 950)
				emotes_3 += `${emojis[i]}  `;
			else emotes_4 += `${emojis[i]}  `;
		}
		embed.addField('Emotes', emotes_1, false);

		if (emotes_2.length > 0)
			embed.addField('Emotes', emotes_2, false);
		if (emotes_3.length > 0)
			embed.addField('Emotes', emotes_3, false);
		if (emotes_4.length > 0)
			embed.addField('Emotes', emotes_4, false);

		message.channel.send(embed);
	},
};


function formatDate(str) {
	return str.toISOString().slice(0, 10).split('-').reverse().join('.');
}

function getRegionIcon(message, region) {
	switch (region) {
		case 'eu-central':
		case 'eu-west':
			return ':flag_eu: ';
		case 'brazil':
			return ':flag_br: ';
		case 'hongkong':
			return ':flag_hk: ';
		case 'japan':
			return ':flag_jp: ';
		case 'russia':
			return ':flag_ru: ';
		case 'singapore':
			return ':flag_sg: ';
		case 'southafrica':
			return '🇿🇦 ';
		case 'sydney':
			return '🇦🇺';
		case 'us-central':
		case 'us-east':
		case 'us-south':
		case 'us-west':
			return ':flag_us:';
		default:
			return ' ';
	}
	;
}

function getServer(message, args) {
	if (args.length > 0) {
		target = message.client.guilds.find(g => g.id === args.join(' '));
		if (!target)
			target = message.client.guilds.find(g => g.name === args.join(' '));
		return target;
	}
	return message.guild;
}