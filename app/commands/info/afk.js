const { MessageEmbed } = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const paladin = require('../../paladin.js');

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'AFK',
	description: 'Set your afk message',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/afk.html',
	usage: [`\`${gPrefix}afk [afk message]\``],
	examples: [`\`${gPrefix}afk sleeping ... leave me a DM\``],
	params: ['\`[afk message]\` - The message to display if someone mentions you.'],
	cooldown: 10,
	execute(message, args) {
		const embed = new MessageEmbed().setColor('#FF00FF');
		const afkMessage = args.length ? args.join(' ') : 'I am afk.';
		afkUsers.set(message.author.id, {
			afkMessage: afkMessage,
			displayAvatarUrl: message.author.displayAvatarURL(),
			timestamp: message.createdTimestamp,
		});
		try {
			message.react(emote.check.id);
		} catch (e) {
			embed.setTitle(`Your afk message is`).setDescription(`${afkMessage}`);
			message.channel.send(embed);
		}
	},
	handleAfkMessage(message) {
		const afkStatus = afkUsers.get(message.author.id);
		if (afkStatus) {
			const embed = new MessageEmbed().setColor('#FF00FF');
			embed.setTitle('Welcome back ' + message.author.username)
				.setDescription('Your afk status has been removed');
			afkUsers.delete(message.author.id);
			return message.channel.send(embed);
		}
		const mentionedAfkUsers = message.mentions.users.filter(u => afkUsers.get(u.id));
		if (mentionedAfkUsers.size > 0) {
			const embed = new MessageEmbed().setColor('#FF00FF');
			const onlyOneMention = mentionedAfkUsers.size === 1;
			mentionedAfkUsers.forEach(u => {
				const user_afk = afkUsers.get(u.id);
				if (onlyOneMention) {
					embed.setAuthor(`${u.username} is afk`, user_afk.displayAvatarUrl, user_afk.displayAvatarUrl)
						.setDescription(`${user_afk.afkMessage}\n${getTime(new Date().getTime(), user_afk.timestamp)}`);
				}
				else
					embed.addField(`${u.username} is afk`, `${user_afk.afkMessage}\nafk since: ${getTime(new Date().getTime(), user_afk.timestamp)}`);
			});
			message.channel.send(embed);
		}
	},
};

function getTime(timestamp_1, timestamp_2) {

	let difference = timestamp_1 - timestamp_2;

	const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

	difference -= daysDifference * 1000 * 60 * 60 * 24;

	const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
	difference -= hoursDifference * 1000 * 60 * 60;

	const minutesDifference = Math.floor(difference / 1000 / 60);
	difference -= minutesDifference * 1000 * 60;

	const secondsDifference = Math.floor(difference / 1000);

	return `${daysDifference === 0 ? '' : daysDifference + ' days  '}` +
		`${hoursDifference === 0 ? '' : '**' + hoursDifference + '** hours  '}` +
		`${minutesDifference === 0 ? '' : '**' + minutesDifference + '** minutes  '}` +
		`${secondsDifference === 0 ? '' : '**' + secondsDifference + '** seconds'}`;
}

