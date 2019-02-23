const { MessageEmbed, MessageAttachment } = require('discord.js');
const { gPrefix } = require('../../config.json');
const { images } = require('../util/statics.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
	name: 'Urban',
	description: 'Query the Urban Dictionary API',
	category: 'search',
	documentationURL: 'https://paladin.netlify.com/search/urban.html',
	usage: [`\`${gPrefix}urban [search-term]\``],
	args: true,
	guildOnly: false,
	aliases: ['urban-dictionary', 'urb'],
	examples: [`${gPrefix}urban [loli]`],
	params: ['`[search-term]` - Your query string'],
	cooldown: 10,
	async execute(message, args) {

		const embed = new MessageEmbed();

		const nsfwChannels = message.guild.channels.filter(c => c.nsfw);

		if (!message.channel.nsfw)
			return message.channel.send(embed.setTitle('This not a NSFW Channel. Please go to a NSFW Channel!')
				.setImage(images.nsfw)
				.setDescription(`**This server has ${nsfwChannels.size} NSFW channels**\n${nsfwChannels.map(c => c.toString()).join(',  ')}`));

		const query = querystring.stringify({ term: args.join(' ') });
		const response = await fetch(`https://api.urbandictionary.com/v0/define?${query}`);
		const jsonArray = await response.json().then(r => r['list']);
		const urbanObject = jsonArray[0];

		if (!jsonArray.length)
			return message.channel.send(`No results found for **${args.join(' ')}**.`);

		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

		embed.setColor('#FF00FF')
			.setTitle(urbanObject.word)
			.setURL(urbanObject.permalink)
			.addField('Definition', trim(urbanObject.definition, 1024))
			.addField('Example', trim(urbanObject.example, 1024))
			.addField('\uD83D\uDC4D', urbanObject.thumbs_up, true)
			.addField('\uD83D\uDC4E ', urbanObject.thumbs_down, true);
		if (urbanObject.sound_urls.length > 0) {
			embed.addField('Sound files', urbanObject.sound_urls.map((file, index) => `[sound ${index + 1}](${file})`));
			const attachment = new MessageAttachment(urbanObject.sound_urls[0]);
			return message.channel.send({embed, files: [attachment]});
		}
		message.channel.send(embed);
	},
};