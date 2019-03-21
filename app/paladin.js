const Discord = require('discord.js');
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const config = require('./config.json');
const util = require('./util/paladinUtils.js');
const emote = require('./util/emote.js');
const afk = require('./commands/info/afk.js');
const { commandModel, guildModel } = require('./sequelize.js');
require('colors');

global.messagesRecieved = 0;
global.commandsExecuted = 0;
global.afkUsers = new Map();

const client = new Discord.Client({ fetchAllMembers: true });
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

client.login(config.token);

client.shard ? process.title = `Paladin-Shard-${client.shard.id}` : process.title = 'PaladinJS';

client.once('ready', async () => {
	console.log(`---------------------------------
Logged in as: ${client.user.username}#${client.user.discriminator}
User ID: ${client.user.id}
---------------------------------`.magenta.bold);
	await initPrefixes();
	loadCommands();
});



client.on('message', async message => {
		afk.handleAfkMessage(message);
		messagesRecieved++;
		let prefix = message.guild ? client.prefixes.get(message.guild.id) : config.gPrefix;

		if (!prefix) {
			prefix = config.gPrefix;
			client.prefixes.set(message.guild.id, config.gPrefix);
			fixDatabase(message.guild.id, message.guild.name).catch(e => console.log(e));
		}

		// check prefix and do not respond to bots
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);  //regex
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be:\n${command.usage.join('\n')}`;
			}
			message.react(emote.xmark.id);
			return message.channel.send(reply);
		}

		// handling guildOnly
		if (command.guildOnly && message.channel.type !== 'text') {
			message.react(emote.xmark.id);
			return message.reply('I can\'t execute that command inside DMs!');
		}

		// check user permissions
		if (message.guild) {
			const userPerms = message.member.permissions.toArray();
			const botPerms = message.guild.member(message.client.user).permissions.toArray();
			if (command.userPermissions && !command.userPermissions.every(perm => userPerms.includes(perm)) && command.guildOnly)
				return message.channel.send(`You don\'t have the permission to run this command. Permission needed:\n ${command.userPermissions}`);
			if (command.botPermissions && !command.botPermissions.every(perm => botPerms.includes(perm)))
				return message.channel.send(`I need this permissions to run this command:\n ${command.botPermissions}`);
		}

		const isBotOwner = config.botOwners.includes(message.author.id);

		// check bot permissions
		if (command.userPermissions && command.userPermissions.includes('BOT_OWNER') && !isBotOwner)
			return message.channel.send('Only Bot Owner can execute this command.');

		if (util.hasCoolDown(command, cooldowns, message, isBotOwner)) return;

		const params = commandLineArgs(command.arguments, { argv: args, partial: true, stopAtFirstUnknown: false });

		try {
			if (message.guild) {
				const enabled = await commandEnabled(message.guild.id, command);
				if (!enabled)
					return message.channel.send(`${command.name} Command is disabled in this server!`);
				command.execute(message, params);
				commandsExecuted++;
			}
			else // DM
				command.execute(message, params);
		} catch (error) {
			console.error(error);
			// message.react(message.client.emojis.get('458010105280069632'));
			// message.reply('there was an error trying to execute that command!');
		}
		if (params.delete)
			message.delete({ timeout: 2000 });
	},
);

client.on('guildCreate', guild => {
	fixDatabase(guild.id, guild.name)
})

client.on('error', console.error);
// client.on('warn', (e) => console.warn(e));
// client.on('debug', (e) => console.info(e));

async function initPrefixes() {
	client.prefixes = new Discord.Collection();
	const res = await guildModel.findAll({ attributes: ['id', 'prefix'], raw: true }).catch(e => e);
	res.forEach(r => {
		client.prefixes.set(r['id'], r['prefix']);
	});
}

async function fixDatabase(id, name) {
	await guildModel.create({
		id: id,
		prefix: config.gPrefix,
		name: name.toLowerCase(),
		welcomeMessage: '',
		welcomeAvatar: '',
		ticketMessage: '',
		welcomeDM: false,
		ticketChannel: '',
	}).catch(e => e);
	insertCommands(id);
}

function insertCommands(id) {
	console.log('Inserting ALL Commands')
	client.commands.forEach(command => addCommandToDB(id, command));
}

async function commandEnabled(id, command) {
	const enabled = await commandModel.findOne({ raw: true, where: { enabled: true, id: id, name: command.name.toLowerCase()} });
	if (enabled == null)
		insertCommands(id)
	return !!enabled
}

function addCommandToDB(id, command) {
	// console.log('Adding new Command: (' + id + '  ' , command.name + ' )')
	commandModel.create({
		id: id,
		name: command.name.toLowerCase(),
		category: command.category,
		description: command.description,
		enabled: true,
		bannedChannels: [],
		bannedRoles: [],
	}).catch(e => e);
}

function loadCommands() {
	const core = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
	const infoCommands = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));
	const ownerCommands = fs.readdirSync('./commands/owner').filter(file => file.endsWith('.js'));
	const moderationCommands = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
	const searchCommands = fs.readdirSync('./commands/search').filter(file => file.endsWith('.js'));
	const miscCommands = fs.readdirSync('./commands/misc').filter(file => file.endsWith('.js'));
	const mediaCommands = fs.readdirSync('./commands/media').filter(file => file.endsWith('.js'));

	for (const file of core) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}

	for (const file of infoCommands) {
		const command = require(`./commands/info/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
	for (const file of ownerCommands) {
		const command = require(`./commands/owner/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
	for (const file of moderationCommands) {
		const command = require(`./commands/moderation/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
	for (const file of searchCommands) {
		const command = require(`./commands/search/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
	for (const file of miscCommands) {
		const command = require(`./commands/misc/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
	for (const file of mediaCommands) {
		const command = require(`./commands/media/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
}