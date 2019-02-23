const Discord = require('discord.js');
const { gPrefix, google_search_engine_id, google_api_key } = require('../../config.json');
const fetch = require('node-fetch');
// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'Google',
	description: 'Google a word',
	category: 'search',
	documentationURL: 'https://paladin.netlify.com/search/google.html',
	usage: [`\`${gPrefix}google [search-term]\``],
	args: true,
	guildOnly: false,
	aliases: ['g'],
	examples: ['`-g malaka`'],
	params: ['`[search-term]` - Your query string'],
	cooldown: 5,
	execute(message, args) {

		const query = args.join(' ');
		const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${google_search_engine_id}&key=${google_api_key}`;

		fetch(url, {
			headers: {
				Accept: 'application/json',
			},
		}).then(res => res.json()).then(response => {
			try {
				message.channel.send(response['items'][0]['link']);
			} catch (e) {
				message.channel.send('Nothing found');
			}
		}).catch(console.error);
	},
};