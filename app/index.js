
const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');
const manager = new ShardingManager('./paladin.js', { totalShards: 'auto', token: token });
// const manager = new ShardingManager('./paladin.js', {  token: token });

manager.spawn();

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));