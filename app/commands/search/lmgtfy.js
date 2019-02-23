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
	params: ['[`search term` - Your query string' ],
	cooldown: 5,
	execute(message, args) {
		const url = 'https://lmgtfy.com/?q=' + args.join('+')
		message.channel.send(url)
	},
};