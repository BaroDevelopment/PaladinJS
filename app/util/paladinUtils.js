const emote = require('./emote.js');
const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	getMember(message, args) {
		if (message.mentions.users.size > 0)
			return target = message.guild.members.get(message.mentions.users.first().id);

		if (args) {
			target = message.guild.members.find(m => m.user.username === args.join(' '));
			if (!target)
				target = message.guild.members.find(m => m.user.id === args.join(' '));
			return target;
		}
		return message.guild.members.find(m => m.id === message.author.id);
	},
	getUser(message, args) {
		if (message.mentions.users.size > 0)
			return target = message.mentions.users.first();
		if (args) {
			target = message.client.users.find(u => u && u.username === args.join(' '));
			if (!target)
				target = message.client.users.find(u => u && u.id === args.join(' '));
			return target;
		}
		return message.author;
	},
	getRole(message, args) {
		if (message.mentions.roles.size > 0)
			return target = message.mentions.roles.first();
		if (args) {
			target = message.guild.roles.find(r => r && r.name === args.join(' '));
			if (!target)
				target = message.guild.roles.find(r => r && r.id === args.join(' '));
			return target;
		}
	},
	getChannel(message, args) {
		if (message.mentions.channels.size > 0)
			return target = message.mentions.channels.first();
		if (args) {
			target = message.guild.channels.find(c => c && c.name === args.join(' '));
			if (!target)
				target = message.guild.channels.find(c => c && c.id === args.join(' '));
			return target;
		}
		return message.channel;
	},
	booldReaction(message, bool) {
		return bool ? emote.on : emote.off;
	},
	formatDate(str) {
		return str.toISOString().slice(0, 10).split('-').reverse().join('.');
	},
	hasCoolDown(command, cooldowns, message, isBotOwner) {
		// handling cooldowns

		if (isBotOwner) return false;

		if (!cooldowns.has(command.name))
			cooldowns.set(command.name, new Discord.Collection());
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				message.author.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				return true;
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		return false;
	},
	postToHastebin(code, extension, message) {
		const axios = require('axios');
		if (!code)
			return console.log('Input argument is required.');
		axios.post('https://hastebin.com/documents', code)
			.then(body => {
				const url = 'https://hastebin.com/' + body.data.key + ((extension) ? '.' + extension : '');
				message.channel.send('I have pasted your code to Hastebin:\n' + url);
			}).catch(e => message.channel.send('Failed to upload ot hastebin.com'));
	},
};