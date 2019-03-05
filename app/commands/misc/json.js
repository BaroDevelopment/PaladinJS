const { gPrefix } = require('../../config.json');
const { postToHastebin } = require('../../util/paladinUtils.js');

module.exports = {
	name: 'Json',
	description: 'Get the json code of a MessageEmbed',
	category: 'misc',
	guildOnly: true,
	args: true,
	documentationURL: 'https://paladin.netlify.com/search/json.html',
	usage: [`${gPrefix}json [channel-id] [message-id]`],
	params: ['[`channel-id` - ID of the channel where the embed is in', '[`message-id` - ID of the message'],
	cooldown: 30,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'i', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const m = args.msg.length === 1 ?
			await message.channel.messages.fetch(args.msg[0]).catch(e => e) :
			await message.guild.channels.get(args.msg[0]).messages.fetch(args.msg[1]).catch(e => e);

		if (!m || !m.embeds || !m.embeds.length)
			return message.channel.send('Message not found or is not a embed');
		const json = toJSON(m.content, m.embeds[0]);
		postToHastebin(json, 'json', message);
	},
};

function toJSON(content, messageEmbed) {
	let json = {};
	if (content)
		json.content = content;
	json.embed = {};
	if (messageEmbed.title)
		json.embed.title = messageEmbed.title;
	if (messageEmbed.description)
		json.embed.description = messageEmbed.description;
	if (messageEmbed.url)
		json.embed.url = messageEmbed.url;
	if (messageEmbed.color)
		json.embed.color = messageEmbed.color;
	if (messageEmbed.timestamp)
		json.embed.timestamp = new Date(messageEmbed.timestamp);
	if (messageEmbed.footer) {
		json.embed.footer = {};
		if (messageEmbed.footer.iconURL)
			json.embed.footer.icon_url = messageEmbed.footer.iconURL;
		if (messageEmbed.footer.text)
			json.embed.footer.text = messageEmbed.footer.text;
	}
	if (messageEmbed.thumbnail) {
		json.embed.thumbnail = {};
		if (messageEmbed.thumbnail.url)
			json.embed.thumbnail.url = messageEmbed.thumbnail.url;
	}
	if (messageEmbed.image) {
		json.embed.image = {};
		if (messageEmbed.image.url)
			json.embed.image.url = messageEmbed.image.url;
	}
	if (messageEmbed.author) {
		json.embed.author = {};
		if (messageEmbed.author.url)
			json.embed.author.url = messageEmbed.author.url;
		if (messageEmbed.author.name)
			json.embed.author.name = messageEmbed.author.name;
		if (messageEmbed.author.iconURL)
			json.embed.author.icon_url = messageEmbed.author.iconURL;
	}
	if (messageEmbed.fields)
		json.embed.fields = messageEmbed.fields;
	return JSON.stringify(json, undefined, 2);
}