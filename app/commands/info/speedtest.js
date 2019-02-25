const { gPrefix } = require('../../config.json');
const Discord = require('discord.js');
const emote = require('../util/emote.js');
const { images } = require('../util/statics.js');
var speedTest = require('speedtest-net');
module.exports = {
	name: 'Speedtest',
	description: '',
	category: 'info',
	guildOnly: false,
	documentationURL: 'https://paladin.netlify.com/information/speedtest.html',
	usage: [`${gPrefix}speedtest`],
	cooldown: 60,
	aliases: ['stest'],
	arguments: [
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {
		const start = new Date().getTime();
		let duration = 0;
		await message.react(emote.check.id);
		duration = new Date().getTime() - start;
		const embed = new Discord.MessageEmbed().setColor('#FF00FF')
			.setDescription('Speedtest running ...' + emote.loading.mention);
		const msg = await message.channel.send(embed);

		const test = speedTest({ maxTime: 5000 });

		test.on('data', data => {
			const download = data['speeds']['download'].toFixed(0) + ' MBit/s';
			const upload = data['speeds']['upload'].toFixed(0) + ' MBit/s';
			const host = `${data['server']['host']}`;
			const serverPing = `${ data['server']['ping']} ms`;
			const embed = new Discord.MessageEmbed().setColor('#FF00FF')
				.setDescription('***___Speedtest results___***')
				.setThumbnail(images.shield)
				.addField('Download',download , true)
				.addField('Upload', upload, true)
				.addField('Host', host, true)
				.addField('Server Ping', serverPing, true);
			msg.edit(embed).catch(e => e);
		});

		test.on('error', err => {
			message.channel.send('Whoops ... something went wrong :neutral_face:')
		});
	},
};