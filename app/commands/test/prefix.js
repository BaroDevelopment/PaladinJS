const { gPrefix } = require('../config.json');
const { guildModel } = require('../sequelize.js');

module.exports = {
	name: 'Prefix',
	description: 'Set new prefix',
	aliases: [],
	usage: `${gPrefix}prefix [new prefix]`,
	cooldown: 5,
	args: true,
	guildOnly: true,
	category: 'undefined',
	userPermissions: ['MANAGE_GUILD'],
	botPermissions: [],
	documentationURL: '',
	arguments: [
		{ name: 'prefix', type: String, multiple: true, alias: 'p', defaultOption: true },
	],
	async execute(message, args) {
		message.client.prefixes.set(message.guild.id, args.prefix[0]);
		const update = await guildModel.update({ prefix: args.prefix[0] }, { where: { id: message.guild.id } });
		message.channel.send(`New Prefix is ${args.prefix[0]}`)
	},
};