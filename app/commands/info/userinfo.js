const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const { getMember, formatDate } = require('../util/paladinUtils.js');

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'UserInfo',
	description: 'Get an overview about a user',
	category: 'info',
	documentationURL: 'https://paladin.netlify.com/information/userinfo.html',
	usage: [`\`${gPrefix}userinfo [@user]\``, `\`${gPrefix}userinfo [user id]\``, `\`${gPrefix}userinfo [user-name]\``],
	args: false,
	guildOnly: true,
	aliases: ['uinfo'],
	examples: [`\`${gPrefix}userinfo @YINGYANG#7777\``],
	params: ['\`[@user]\` - The user as mention', '\`[user-id]\` - id of user', '\`[user-name]\` - name of user'],
	cooldown: 5,
	arguments: [
		{ name: 'msg', type: String, multiple: true, alias: 'm', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	execute(message, args) {

		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		const target = getMember(message, args.msg);
		if (!target)
			return message.channel.send('No user found!');

		const owner = target.id === message.guild.owner.id ? emote.check.mention :
			emote.disabled.mention;

		const inVoice = target.voiceChannel ? target.voiceChannel.name : emote.disabled.mention;
		const isBot = target.user.bot ? emote.botTag : emote.member;
		// const game = !target.presence.game ? emote.getPaladinEmote(message, 'disabled') : target.presence.game.name;

		embed.setAuthor(target.user.username, target.user.displayAvatarURL(), target.user.displayAvatarURL())
			.addField('ID', target.id, true)
			.setDescription(target.user.toString())
			.setThumbnail(target.user.displayAvatarURL())
			.addField('Usertag', `\n${target.user.username}#${target.user.discriminator}`, true)
			.addField('Is Server Owner', owner, true)
			.addField('Status', emote[target.presence.status], true)
			.addField('In Voice', inVoice, true)
			.addField('Account-Type', isBot, true)
			.addField('Joined', formatDate(target.user.createdAt), true)
			.addField('Registered', formatDate(target.joinedAt), true)
			.addField('Key Permissions', '```prolog\n' + target.permissions.toArray().map(p => p).join('\n') + '```')
			// .addField('Game', game, true)
			.addField('Roles', target.roles.map(r => r.toString()).join('\n'), true);

		// if (target.presence.game && target.presence.game.assets)
		// 	embed.setImage(target.presence.game.assets.largeImageURL);

		message.channel.send(embed);
	},
};