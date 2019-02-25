const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'Purge',
	description: 'Bulk-delete messages from a channel',
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
		{ name: 'amount', type: Number, alias: 'n', defaultValue: 100, defaultOption: true },
		{ name: 'bots', type: Boolean, alias: 'b' },
		{ name: 'pinned', type: Boolean, alias: 'p' },
		{ name: 'time', type: Number, alias: 't' },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');

		args.amount = Math.abs(args.amount);
		const limit = args.amount && args.amount < 100 ? args.amount : 100;

		let messages = await message.channel.messages.fetch({
			limit: limit,
		});

		let user;
		if (message.mentions.users.size)
			user = message.mentions.users.first();

		const filteredMessages = this.filter(messages, user, args.bots, args.pinned, args.time);

		let clearedMessages = await message.channel.bulkDelete(filteredMessages, true);

		if (!clearedMessages.size)
			return message.channel.send('there was an error trying to prune messages in this channel!');

		const pinnedMessages = messages.array().filter(m => m.pinned).length;

		embed.setDescription('Deleted').addField('Messages', clearedMessages.size, true)
			.addField('Pinned', args.pinned ? pinnedMessages : 0, true)
			.addField('From', user ? user : args.bots ? 'Bot' : 'everyone', true);
		if (args.time)
			embed.addField('Time', 'last ' + args.time + ' minutes.');

		message.channel.send(embed);
	},
	filter(messages, user, bots, pinned, time) {
		if (user)
			messages = messages.filter(message => message.author.id === user.id);
		else if (bots)
			messages = messages.filter(message => message.author.bot);
		if (!pinned)
			messages = messages.filter(message => !message.pinned);
		if (time) {
			let requiredTimestamp = messages.createdTimestamp - (args.time * 60 * 1000);
			messages = messages.filter(message => message.createdTimestamp >= requiredTimestamp);
		}
		return messages;
	},
};