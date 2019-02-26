const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'Quote',
	description: '',
	category: 'moderation',
	documentationURL: 'https://paladin.netlify.com/moderation/purge.html',
	usage: [`\`${gPrefix}purge [number]\``],
	args: true,
	guildOnly: true,
	aliases: ['prune', 'delete', 'wipe'],
	userPermissions: ['MANAGE_MESSAGES'],
	botPermissions: ['MANAGE_MESSAGES'],
	examples: [`\`${gPrefix}purge 30\``],
	params: [`\`number\` - The amount of messages you want to delete (between 1 and 99)`],
	cooldown: 30,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');

		let channel = message.channel;

		if (args.msg.length < 1) {
			throw 'You must provide a message ID';
		}

		if (!/^\d{18}$/.test(args.msg[0])) {
			throw 'You must provide a valid message ID.';
		}

		if (args.msg[1] && /^<#\d{18}>$|^\d{18}$/.test(args.msg[1])) {
			channel = message.client.channels.get(args.msg[1].replace(/[<#>]/g, ''));
		}

		if (!channel) {
			throw 'That channel could not be found!';
		}

		const messages = await channel.messages.fetch({ around: args.msg[0], limit: 1 });

		if (!messages || messages.size < 1) {
			throw 'That message could not be found!';
		}

		let msg = messages.first();

		let options = {
			timestamp: msg.editedTimestamp || msg.createdTimestamp,
			footer: false,
		};

		let attachment = msg.attachments.first();

		if (attachment && (attachment.width || attachment.height)) {
			options.image = attachment.url;
		}

		let field = '';

		if ((message.guild || {}).id !== (channel.guild || {}).id) {
			field = `**in ${(channel.guild || { name: 'DMs' }).name} <#${channel.id}>:**`;
		}
		else if (channel.id !== msg.channel.id) {
			field = `**in <#${channel.id}>:**`;
		}

		message.delete();
		message.channel.send(msg.content);
	},
};