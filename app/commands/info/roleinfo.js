const {MessageEmbed} = require('discord.js');
const { Permissions } = require('discord.js');
const { gPrefix } = require('../../config.json');
const emote = require('../util/emote.js');
const { booldReaction, getRole } = require('../util/paladinUtils.js');
const { images } = require('../util/statics.js');

// get your google_search_engine_id from here -> https://cse.google.com
module.exports = {
	name: 'RoleInfo',
	description: 'Get an overview about a role',
	category: 'info',
	documentationURL: 'https://ylngyang.github.io/PaladinJS/information/roleinfo.html',
	usage: [`\`${gPrefix}roleinfo [@role]\``, `\`${gPrefix}roleinfo [role id]\``, `\`${gPrefix}roleinfo [role-name]\``],
	args: true,
	guildOnly: true,
	aliases: ['rinfo'],
	examples: [`\`${gPrefix}roleinfo @Admin\``],
	params: ['\`[@role]\` - The role as mention', '\`[role-id]\` - id of role', '\`[role-name]\` - name of role'],
	cooldown: 5,
	execute(message, args) {

		const embed = new MessageEmbed().setColor('#FF00FF');
		const target = getRole(message, args);

		if (!target)
			return message.channel.send('No role found!');

		const permissions = new Permissions(target.permissions);

		embed.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL())
			.addField('ID', target.id, true)
			.setThumbnail(images.PaladinAvatar)
			.setDescription('**__Role Overview:__**  ' + target.toString())
			.addField('Mentionable', booldReaction(message, target.mentionable), true)
			.addField('Managed', booldReaction(message, target.managed), true)
			.addField('Hoisted', booldReaction(message, target.hoist), true)
			.addField('Position', target.position, true)
			.addField('Members', target.members.size, true)
			.addField('Hax Color', target.hexColor, true)
			.addField('Permissions', '```prolog\n' + permissions.toArray().map(p => p).join('\n') + '```');
		message.channel.send(embed);
	},
};