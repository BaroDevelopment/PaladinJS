## Messages

#### fetch more than 100 messages
```js
const limit = args.amount && args.amount < 100 ? args.amount : 100;
let messages = await message.channel.messages.fetch({
    limit: 100,
});
let messages_2 = await message.channel.messages.fetch({ limit: 4, before: messages.last().id });

let mergedMessages = messages.concat(messages_2)
```

<CustomLayout/>