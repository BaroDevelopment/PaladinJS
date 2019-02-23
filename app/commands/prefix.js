const { gPrefix } = require('../config.json');

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
	execute(message, args) {
		message.react(message.client.emojis.find(value => value.name === 'check')).catch(reason => reason);
			message.client.prefixes.set(message.guild.id, args[0]);
			const query = 'Update settings.guild set prefix = $1 where id = $2';
			const values = [args[0], message.guild.id];
			message.client.databaseClient.query(query, values).then(message.channel.send(`New Prefix is ${args[0]}`))
	},
};