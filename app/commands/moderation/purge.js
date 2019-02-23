const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const commandLineArgs = require('command-line-args');

module.exports = {
	name: 'Purge',
	description: 'Bulk-delete messages from a channel',
	category: 'moderation',
	documentationURL: 'https://ylngyang.github.io/PaladinJS/moderation/purge.html',
	usage: [`\`${gPrefix}purge [number]\``],
	args: true,
	guildOnly: true,
	aliases: ['prune', 'delete', 'wipe'],
	userPermissions: ['MANAGE_MESSAGES'],
	botPermissions: ['MANAGE_MESSAGES'],
	examples: [`\`${gPrefix}purge 30\``],
	params: [`\`numer\` - The amount of messages you want to delete (between 1 and 99)`],
	cooldown: 30,
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		const argsDefinitions = [
			{ name: 'amount', type: Number, alias: 'n', defaultValue: 100, defaultOption: true },
			{ name: 'bots', type: Boolean, alias: 'b' },
			{ name: 'pinned', type: Boolean, alias: 'p' },
			{ name: 'time', type: Number, alias: 't' },
		];

		args = commandLineArgs(argsDefinitions, { argv: args, partial: true, stopAtFirstUnknown: false });

		args.amount = Math.abs(args.amount);
		const limit = args.amount && args.amount < 100 ? args.amount : 100;

		let messages = await message.channel.messages.fetch({
			limit: limit,
		});

		let again = await message.channel.messages.fetch({ limit: 4, before: messages.last().id });

		let mergedMessages = messages.concat(again)
		mergedMessages.forEach(m => console.log(m.content));

		// console.log('Fetched another ' + again.size);
		// messages.forEach(m => console.log(m.createdAt.toUTCString() + '     --  ' + m.id));
		// console.log(messages.last().id)
		// console.log('###############################');
		// messages.forEach(m => console.log(m.content));
		// console.log('###############################');
		// again.forEach(m => console.log(m.content));


		let user;
		if (message.mentions.users.size)
			user = message.mentions.users.first();

		if (user)
			messages = messages.filter(message => message.author.id === user.id);
		else if (args.bots)
			messages = messages.filter(message => message.author.bot);
		if (!args.pinned)
			messages = messages.filter(message => !message.pinned);
		if (args.time) {
			let requiredTimestamp = message.createdTimestamp - (args.time * 60 * 1000);
			messages = messages.filter(message => message.createdTimestamp >= requiredTimestamp);
		}

		let clearedMessages = await message.channel.bulkDelete(messages, true);
		if (!clearedMessages.size)
			return message.channel.send('there was an error trying to prune messages in this channel!');

		const pinnedMessages = messages.array().filter(m => m.pinned).length;

		embed.setDescription('Deleted').addField('Messages', clearedMessages.size, true)
			.addField('Pinned', args.pinned ? pinnedMessages : 0, true)
			.addField('From', user ? user : args.bots ? 'Bot' : 'everyone', true);
		if (args.time)
			embed.addField('Time', 'last ' + args.time + ' minutes.');
		await message.channel.send(embed).then(m => m.delete({ timeout: 8000 }));
	},
};