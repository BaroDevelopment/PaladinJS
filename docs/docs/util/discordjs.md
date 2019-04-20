## DiscordJS Utils

#### fetch more than 100 messages
```js
const limit = args.amount && args.amount < 100 ? args.amount : 100;
let messages = await message.channel.messages.fetch({
    limit: 100,
});
let messages_2 = await message.channel.messages.fetch({ limit: 4, before: messages.last().id });

let mergedMessages = messages.concat(messages_2)
```

#### Collector
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
