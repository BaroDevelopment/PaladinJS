const fs = require('fs');
const consoleColor = require('colors');
const Discord = require('discord.js');
const config = require('./config.json');
const { gPrefix, token } = require('./config.json');
const Postgres = require('pg');
const util = require('./commands/util/paladinUtils.js');
const emote = require('./commands/util/emote.js');
const afk = require('./commands/info/afk.js');

global.messagesRecieved = 0;
global.commandsExecuted = 0;
global.afkUsers = new Map();

const client = new Discord.Client({ fetchAllMembers: true });
(client.shard) ? process.title = `Paladin-Shard-${client.shard.id}` : process.title = 'PaladinJS';

/* ### Internal Sharding ###*/
// const client = new Discord.Client({ shardCount: 'auto' });
// const client = new Discord.Client({ shards: [0, 1, 2] });
client.commands = new Discord.Collection();

client.databaseClient = new Postgres.Client({
	connectionString: config.database,
});

// Database connection
const dbinfo = `${client.databaseClient.database}@${client.databaseClient.host}:${client.databaseClient.port}`;
client.databaseClient.connect().then(() => console.log(`Connected to ${dbinfo}`.blue.bold))
	.catch(reason => console.log(`Failed to connect to database\n${reason}`.red.bold));

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(`---------------------------------
Logged in as: ${client.user.username}#${client.user.discriminator}
User ID: ${client.user.id}
---------------------------------`.magenta.bold);
	initPrefixes();
	loadCommands();
});

// login to Discord with your app's token
client.login(token);

client.on('message', async message => {
		afk.handleAfkMessage(message);
		messagesRecieved++;
		let prefix = message.guild ? client.prefixes.get(message.guild.id) : gPrefix;

		if (!prefix) {
			prefix = gPrefix;
			client.prefixes.set(message.guild.id, gPrefix);
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

		try {
			if (message.guild) {
				const enabled = await commandEnabled(message.guild.id, command.name);
				if (!enabled)
					return message.channel.send(`${command.name} Command is disabled in this server!`);
				command.execute(message, args);
				commandsExecuted++;
			}
			else // DM
				command.execute(message, args);
		} catch (error) {
			console.error(error);
			// message.react(message.client.emojis.get('458010105280069632'));
			// message.reply('there was an error trying to execute that command!');
		}
	},
);

client.on('error', console.error);
// client.on('warn', (e) => console.warn(e));
// client.on('debug', (e) => console.info(e));

function initPrefixes() {
	client.prefixes = new Discord.Collection();
	const query = 'Select id, prefix from settings.guild';
	client.databaseClient.query(query).then(res => {
		res.rows.map(r => client.prefixes.set(r['id'], r['prefix']));
	});
}

async function fixDatabase(id, name) {
	client.databaseClient.query('Select id from settings.guild where id=$1', [id]).then(res => {
		const query = 'Insert into settings.guild values ($1,$2,$3,$4,$5,$6,$7,$8)';
		const values = [id, gPrefix, name, '', '', '', false, ''];
		if (!res.rowCount) {
			client.databaseClient.query(query, values).catch(e => console.log(e));
		}
	});
	insertCommands(id);
}

function insertCommands(id) {
	client.commands.forEach(command => addCommandToDB(id, command.name));
}

async function commandEnabled(id, name) {
	const query = 'Select enabled from settings.commands where id=$1 and name = $2';
	const values = [id, name.toLowerCase()];
	const enabled = await client.databaseClient.query(query, values).catch(e => console.log(e));
	try {
		return enabled.rows[0]['enabled'];
	} catch (e) {
		addCommandToDB(id, name);
	}
	return false;
}

function addCommandToDB(id, name) {
	const query = `Insert into settings.commands values ($1,$2,$3,$4,$5)`;
	const values = [id, name.toLowerCase(), config.commandsEnabled, [], []];
	client.databaseClient.query(query, values).then().catch(e => console.log(e));
}

function loadCommands() {
	const core = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
	const infoCommands = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));
	const ownerCommands = fs.readdirSync('./commands/owner').filter(file => file.endsWith('.js'));
	const moderationCommands = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
	const searchCommands = fs.readdirSync('./commands/search').filter(file => file.endsWith('.js'));

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
}