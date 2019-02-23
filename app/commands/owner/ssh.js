const {MessageEmbed} = require('discord.js');
const { host } = require('../../config.json');
const { gPrefix } = require('../../config.json');
var SSH = require('simple-ssh');

module.exports = {
	name: 'SSH',
	description: 'Execute commands using SSH. Mainly used to execute script like start, restart and update',
	usage: [`\`${gPrefix}ssh [command line commands]\``],
	cooldown: 1,
	guildOnly: false,
	params: ['`[command]` - Command to execute in host\'s terminal'],
	category: 'owner',
	userPermissions: ['BOT_OWNER'],
	documentationURL: 'https://ylngyang.github.io/PaladinJS/owner/ssh.html',
	examples: [
		`\`${gPrefix}ssh sudo apt-get update\``,
		`\`${gPrefix}ssh ls\``,
		`\`${gPrefix}ssh cd PaladinJS && ls\``,
		`\`${gPrefix}ssh sh start.sh\``,
		`\`${gPrefix}ssh sh restart.sh\``,
		`\`${gPrefix}ssh sh update.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh start.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh restart.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh update.sh\``,
		`\`${gPrefix}ssh cd PaladinJS && sh stop.sh\``,
		`\`${gPrefix}ssh sh restart.sh && cd PaladinJS && sh update.sh\``,
	],
	execute(message, args) {

		var ssh = new SSH({
			host: host.ip,
			user: host.username,
			pass: host.password,
		});

		ssh.on('error', function(err) {
			message.channel.send('Oops, something went wrong.');
			message.channel.send(err);
			ssh.end();
		});
		ssh.on('ready', function (ready){
			const embed = new MessageEmbed().setColor('#04ff00');
			embed.setDescription('Successfully Connected')
			message.channel.send(embed)
		});

		const toExecute = args.join(' ');
		// let limit = 0;
		ssh.exec(toExecute, {
			out: function(stdout) {
				message.channel.send(stdout);
				console.log(stdout);
			},
			// },
		}).start();
	},
};