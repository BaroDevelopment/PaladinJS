const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const { images } = require('../util/statics.js');
const { getMember } = require('../util/paladinUtils.js');

module.exports = {
	name: 'Ban',
	description: 'Ban a member from the server. Banned user will get a DM with reason aswell.',
	category: 'moderation',
	documentationURL: 'https://ylngyang.github.io/PaladinJS/moderation/ban.html',
	usage: [`\`${gPrefix}ban [@user]\``, `\`${gPrefix}ban [user id]\``, `\`${gPrefix}ban [user-name]\``],
	args: true,
	guildOnly: true,
	userPermissions: ['BAN_MEMBERS'],
	botPermissions: ['BAN_MEMBERS'],
	examples: [`\`${gPrefix}ban @YINGYANG#7777 \``],
	params: [`\`@user\` - the user to ban `, `\`user-id\` - the id of the user to ban`, `\`user-name\` - the name of the user to ban`],
	cooldown: 5,
	async execute(message, args) {
		const embed = new Discord.MessageEmbed().setColor('#FF00FF');
		const target = getMember(message, args);
		if (!target)
			return message.channel.send('No user found!');

		const highestAuthorRolePosition = message.member.roles.reduce(((a, role) => a > role.position ? a : role.position), 0);
		const highestTargetRolePosition = target.roles.reduce(((a, role) => a > role.position ? a : role.position), 0);
		const botUser = message.guild.members.find(m => m.id === message.client.user.id);
		const highestBotRolePosition = botUser.roles.reduce(((a, role) => a > role.position ? a : role.position), 0);

		const notOwner = !message.guild.ownerID === message.member.id;

		if (highestTargetRolePosition >= highestAuthorRolePosition && notOwner)
			return message.channel.send(target.toString() + ' has a role equal or higher than your role!');

		if (highestTargetRolePosition >= highestBotRolePosition)
			return message.channel.send('With all respect but ' + target.toString() + ' has a higher or equal role!\nSo I can not ban him.');

		let reason;

		if (message.mentions.users.size > 0 && args.length > 1) {
			args.shift();
			reason = args.join(' ');
		}

		embed.setTitle('Server Member got banned')
			.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.addField('Banned Member', target.toString(), true)
			.addField('Banned from', message.guild.name, true)
			.setThumbnail(target.user.avatarURL())
			.setImage(images.ban);

		if (reason)
			embed.addField('Reason', reason, true);

		await target.send(embed)
			.then(r => embed.addField('Notified', emote.check.mention, true))
			.catch(e => embed.addField('Notified', emote.disabled.mention, true));


		target.ban(reason ? reason : 'Not specified')
			.then(r => message.channel.send(embed))
			.catch(e => console.log(e) && message.channel.send('Upps something went wrong.\nContact the developer about this!'));
	},
};