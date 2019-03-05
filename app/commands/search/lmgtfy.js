const { gPrefix } = require('../../config.json');

module.exports = {
	name: 'LMGTFY',
	description: 'Act like a smartass and provide a https://googleitfor.me link with your search query.',
	category: 'search',
	guildOnly: false,
	args: true,
	documentationURL: 'https://paladin.netlify.com/search/lmgtfy.html',
	usage: [`${gPrefix}lmgtfy [search-term]`],
	aliases: ['lmgify'],
	params: ['[`search term` - Your query string'],
	cooldown: 5,
	arguments: [
		{ name: 'query', type: String, multiple: true, alias: 'q', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {
		const url = 'https://lmgtfy.com/?q=' + args.query.join('+');
		message.channel.send(url);
	},
};