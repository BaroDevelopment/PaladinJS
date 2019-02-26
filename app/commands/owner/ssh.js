const { MessageEmbed } = require('discord.js');
const { host } = require('../../config.json');
const { gPrefix } = require('../../config.json');
const emote = require('../../util/emote.js');
const SSH = require('ssh2-promise');

module.exports = {
	name: 'SSH',
	description: 'Execute commands using SSH. Mainly used to execute script like start, restart and update',
	usage: [`\`${gPrefix}ssh [command line commands]\``],
	cooldown: 1,
	guildOnly: false,
	args: true,
	params: ['`[command]` - Command to execute in host\'s terminal'],
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	documentationURL: 'https://paladin.netlify.com/owner/ssh.html',
	examples: [
		`\`${gPrefix}ssh sudo apt-get update\``,
		`\`${gPrefix}ssh ls\``,
		`\`${gPrefix}ssh cd PaladinJS && ls\``,
		`\`${gPrefix}ssh sh start.sh\``,
		`\`${gPrefix}ssh sh restart.sh\``,
		`\`${gPrefix}ssh sh update.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh start.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh restart.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh update.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh stop.sh\``,
		`\`${gPrefix}ssh sh restart.sh && cd PaladinJS && sh update.sh\``,
	],
	arguments: [
		{ name: 'command', type: String, multiple: true, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new MessageEmbed().setColor('#FF00FF');
		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

		const ssh = new SSH({
			host: host.ip,
			username: host.username,
			password: host.password,
		});
		const command = args._unknown ? args.command.join(' ') + ' ' + args._unknown.join(' ') : args.command.join(' ')
		ssh.connect().then(embed.setFooter('Connection established', emote.check.url))
			.catch(() => embed.setFooter(' Connection Failed!', emote.xmark.url));
		const data = await ssh.exec(command).catch(e => e);
		data ? embed.setDescription(`\`${trim(data, 1000)}\``) : embed.setDescription('Executed without output');
		message.channel.send(embed);
	},
};