const { MessageEmbed, MessageAttachment } = require('discord.js');
const { gPrefix } = require('../../config.json');
const { images } = require('../util/statics.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'Dictionary',
	description: 'A oxford dictionary lookup to get the definition of a word',
	category: 'search',
	documentationURL: 'https://paladin.netlify.com/search/dictionary.html',
	usage: [`\`${gPrefix}define [search-term]\``],
	args: true,
	guildOnly: false,
	aliases: ['define', 'dic'],
	examples: [`${gPrefix}define ace`],
	params: ['`[search-term]` - Your query string'],
	cooldown: 10,
	arguments: [
		{ name: 'word', type: String, multiple: true, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {

		const embed = new MessageEmbed();

		const app_id = '4f5d735f';
		const app_key = 'e679f7ec77cc18a1949785656e4dc29c';
		const lang = 'en';
		const url = `https://od-api.oxforddictionaries.com:443/api/v1/entries/${lang}/${args.word.join(' ').toLowerCase()}`;
		embed.setColor('#FF00FF').setDescription(`Definition for **${args.word.join(' ').toUpperCase()}**`);

		let audioFile;

		const response = await fetch(url, {
			headers: {
				Accept: 'application/json',
				app_key: app_key,
				app_id: app_id,
			},
		});

		let json;
		let senses;

		try {
			json = await response.json().then(r => r['results'][0]['lexicalEntries'][0]);
			senses = json['entries'][0]['senses'];
		} catch (e) {
			return message.channel.send(embed.setDescription('Word not found'));
		}
		embed.setThumbnail(images.oxford_dictionary);
		for (let i = 0; i < senses.length; i++) {
			let domain;
			let example;
			let definition;
			try {
				domain = senses[i]['domains'][0];
			} catch (e) {
			}
			try {
				definition = senses[i]['definitions'][0];
			} catch (e) {
			}
			try {
				example = senses[i]['examples'][0]['text'];
			} catch (e) {
			}
			if (definition)
				embed.addField(`Definition ${i + 1}  ${domain ? '#' + domain : ''}`,
					`${definition}\n\n${example ? '__Example:__\n' : ''}${example ? example : ''}`);
		}
		try {
			audioFile = json['pronunciations'][0]['audioFile'];
		} catch (e) {
		}
		if (audioFile)
			return message.channel.send({ embed, files: [audioFile] });
		message.channel.send(embed);
	},
};