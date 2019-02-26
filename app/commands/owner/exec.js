const { MessageEmbed } = require('discord.js');
const { host } = require('../../config.json');
const { gPrefix } = require('../../config.json');
const util = require('util');

module.exports = {
	name: 'Exec',
	description: 'Execute something on the command line the bot is running on',
	usage: [`\`${gPrefix}exec [command line commands]\``],
	cooldown: 1,
	guildOnly: false,
	args: true,
	params: ['`[command]` - Command to execute in terminal'],
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	documentationURL: 'https://paladin.netlify.com/owner/exec.html',
	examples: [
		`\`${gPrefix}exec ls\``,
	],
	arguments: [
		{ name: 'command', type: String, multiple: true, alias: 'c', defaultOption: true },
		{ name: 'delete', type: Boolean, alias: 'd' },
	],
	async execute(message, args) {

		const embed = new MessageEmbed().setColor('#FF00FF');
		const exec = util.promisify(require('child_process').exec);
		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

		if (!args.command)
			return message.channel.send('No arguments given');

		args = args.command.join(' ');

		let res;
		res = await exec(args, { timeout: 60 * 1000 }).catch(e => e);
		const stdout = res.stdout;
		const stderr = res.stderr;

		let output;

		stdout ? output = `\`${trim(stdout, 1000)}\`` : stderr ? output = `\`${trim(stdout, 1000)}\`` :
			'```bash\nExecuted successfully without output```';
		if (output.length <= 2)
			output = `Failed to execute!`;
		return message.channel.send(embed.setDescription(output));
	},
};