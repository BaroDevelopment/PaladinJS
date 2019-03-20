const { gPrefix } = require('../../config.json');
const { images } = require('../../util/statics.js');
const emote = require('../../util/emote.js');
const Discord = require('discord.js');

const make12Chars = s => {
	while (s.length < 12) {
		s = s.concat(' ');
	}
	return s;
};

module.exports = {
	name: 'Help',
	description: 'List of all Paladin commands',
	aliases: ['commands', 'h'],
	usage: [`${gPrefix}help\n${gPrefix}help [command name]`],
	cooldown: 5,
	category: 'info',
	args: false,
	guildOnly: false,
	documentationURL: 'https://paladin.netlify.com/information/help.html',
	arguments: [
		{ name: 'command', type: String, multiple: true, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		const { commands } = message.client;
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		if (!args.command) {
			embed.setAuthor('HELP COMMAND', message.author.displayAvatarURL(), message.author.displayAvatarURL());

			let infoValue = '```css\n';
			let ownerValue = '```css\n';
			let moderationValue = '```css\n';
			let searchValue = '```css\n';
			let miscValue = '```css\n';
			let mediaValue = '```css\n';

			embed.setDescription(this.description)
			const infoCommands = commands.filter(c => c.category == 'info').map((k, v) => k);
			const ownerCommands = commands.filter(c => c.category == 'owner').map((k, v) => k);
			const moderationCommands = commands.filter(c => c.category == 'moderation').map((k, v) => k);
			const searchCommands = commands.filter(c => c.category == 'search').map((k, v) => k);
			const miscCommands = commands.filter(c => c.category == 'misc').map((k, v) => k);
			const mediaCommands = commands.filter(c => c.category == 'media').map((k, v) => k);

			for (let i = 0; i < infoCommands.length; i++) {
				if (i % 3 === 2)
					infoValue += gPrefix + make12Chars(infoCommands[i]['name'].toLowerCase()) + '\n';
				else
					infoValue += gPrefix + make12Chars(infoCommands[i]['name'].toLowerCase());
			}
			for (let i = 0; i < ownerCommands.length; i++) {
				if (i % 3 === 2)
					ownerValue += gPrefix + make12Chars(ownerCommands[i]['name'].toLowerCase()) + '\n';
				else
					ownerValue += gPrefix + make12Chars(ownerCommands[i]['name'].toLowerCase());
			}
			for (let i = 0; i < moderationCommands.length; i++) {
				if (i % 3 === 2)
					moderationValue += gPrefix + make12Chars(moderationCommands[i]['name'].toLowerCase()) + '\n';
				else
					moderationValue += gPrefix + make12Chars(moderationCommands[i]['name'].toLowerCase());
			}
			for (let i = 0; i < searchCommands.length; i++) {
				if (i % 3 === 2)
					searchValue += gPrefix + make12Chars(searchCommands[i]['name'].toLowerCase()) + '\n';
				else
					searchValue += gPrefix + make12Chars(searchCommands[i]['name'].toLowerCase());
			}
			for (let i = 0; i < miscCommands.length; i++) {
				if (i % 3 === 2)
					miscValue += gPrefix + make12Chars(miscCommands[i]['name'].toLowerCase()) + '\n';
				else
					miscValue += gPrefix + make12Chars(miscCommands[i]['name'].toLowerCase());
			}
			for (let i = 0; i < mediaCommands.length; i++) {
				if (i % 3 === 2)
					mediaValue += gPrefix + make12Chars(mediaCommands[i]['name'].toLowerCase()) + '\n';
				else
					mediaValue += gPrefix + make12Chars(mediaCommands[i]['name'].toLowerCase());
			}
			infoValue += '\n```';
			ownerValue += '\n```';
			moderationValue += '\n```';
			searchValue += '\n```';
			miscValue += '\n```';
			mediaValue += '\n```';

			embed.addField(`Information Commands`, infoValue, false);
			embed.addField(`Moderation Commands`, moderationValue, false);
			embed.addField(`Search Commands`, searchValue, false);
			embed.addField(`Misc Commands`, miscValue, false);
			embed.addField(`Media Commands`, mediaValue, false);
			embed.addField(`Owner Commands`, ownerValue, false);
			embed.addField('How to get the description of all those commands ?', `${gPrefix}help [command]`, false);
			embed.addField('Example', `${gPrefix}help avatar`, false);

			return message.author.send(embed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}


		const name = args.command[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		embed.setAuthor(`${name.toLocaleUpperCase()} COMMAND`, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.setThumbnail(images.helpImage);
		embed.setDescription(command.description)
		embed.addField(`${emote.discord_white} Usage`, command.usage.join('\n'), true);

		if (command.params)
			embed.addField(`${emote.discord_default} Params`, command.params.join('\n'), true);

		if (command.userPermissions)
			embed.addField(`Required USER Perms`, command.userPermissions, true);

		if (command.botPermissions)
			embed.addField('Required BOT Perms', command.botPermissions, true);
		if (command.aliases)
			embed.addField(`${emote.toggle} Aliases`, `${command.aliases.join('\n')}\n${command.name.toLowerCase()}`, true);
		embed.addField(`${emote.vue} Documentation`, `[Click here](${command.documentationURL})`, true);

		if (command.examples)
			embed.addField(`${emote.pin} Examples`, command.examples, true);

		embed.addField(`Cooldown`, `${emote.cursor}${command.cooldown} seconds`, true)
		embed.setImage(images.splash)
		message.channel.send(embed);
	},
};