const Discord = require('discord.js');
const { gPrefix } = require('../../config.json');

const clean = text => {
	if (typeof (text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	}
	else {
		return text;
	}
};
module.exports = {
	name: 'Eval',
	description: 'Evaluate Javascript code',
	usage: [`\`${gPrefix}eval [Javascript Code]\``],
	cooldown: 1,
	args: true,
	guildOnly: false,
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	params: ['`[Javascript code]` - Your Javascript code to execute.'],
	documentationURL: 'https://paladin.netlify.com/owner/eval.html',
	examples: [
		`\`${gPrefix}eval Math.pow(5, 8)\``,
		`\`${gPrefix}eval 5 + 6\``,
		`\`${gPrefix}eval message.client.guilds.map(g=>g.name).join('\\n')\``,
		`\`${gPrefix}eval message.client.shard.broadcastEval(\'if(this.guilds.get(\\'285532310466461697\\'))this.guilds.get(\\'285532310466461697\\').leave()\')\``,
	],
	arguments: [
		{ name: 'code', type: String, multiple: true, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) { //TODO: for all shards

		const code = args.code.join(' ');
		let evaled = eval(code);
		try {
			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled);
			const embed = new Discord.MessageEmbed().setColor('#FF00FF')
				.addField('Input', `\` ${message.content} \``, false)
				.addField('Output', clean(evaled), false);

			message.channel.send(embed);

		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};