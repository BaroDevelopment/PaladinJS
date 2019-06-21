## DiscordJS Utils

### Update all dependencies/package.json
cd to the folder where the `package.json` is and then execute:
```sh
npm i -g npm-check-updates
ncu -u
npm install
```

### fetch more than 100 messages
```js
const limit = args.amount && args.amount < 100 ? args.amount : 100;
let messages = await message.channel.messages.fetch({
    limit: 100,
});
let messages_2 = await message.channel.messages.fetch({ limit: 4, before: messages.last().id });

let mergedMessages = messages.concat(messages_2)
```

### Get random reacted user
```js
const msg = await message.channel.messages.fetch(args.msgID);
const fetchedUsers = await msg.reactions.first().users.fetch([100]);
const users = fetchedUsers.map(u => u.username.toString());
const embed = new Discord.MessageEmbed().setDescription(users[[Math.floor(Math.random() * users.length)]]);
message.channel.send(embed);
``` 

### Collector
```js
  let confirmation = await message.channel.send({
    embed: {
      description: 'Are you sure you want to shut me down?'
    }
  });

  const collector = confirmation.channel.createMessageCollector(m => client.credentials.ownerId.includes(m.author.id) && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no')),
    {
      time: 30 * 1000,
      maxMatches: 1
    }
  );

  collector.on('collect', async answer => {
    if (answer.content.toLowerCase().startsWith('yes')) {
      await message.channel.send({
        embed: {
          description: 'GoodBye :wave:! See you soon.'
        }
});
      
 await client.shard.broadcastEval('this.destroy().then(() => process.exitCode = 0)');
```
