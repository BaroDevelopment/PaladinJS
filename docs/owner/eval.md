# Eval Command
Evaluate and execute Javascript code through Discord

### User Permissions needed
`BOT_OWNER`
### Bot Permissions needed
`none`

---
### Alias:
>`none`

---
### Parameters
`[JAVASCRIPT]` - Your Javascript Code to execute

---
### Cooldown
`1 seconds`

---
### Usage
`-javascript [JAVASCRIPT]` 

### Examples

>Calculate
```js
-eval 5 + 6
-eval Math.pow(5, 8)
```

> Display all servers the bot is in (only from 1 shard)
```js
-eval message.client.guilds.map(g=>g.name).join('\n')
```


> Leave server with id: 285532310466461697

```js
-eval message.client.shard.broadcastEval('if(this.guilds.get(\'285532310466461697\'))this.guilds.get(\'285532310466461697\').leave()')
```

---
::: danger Hint
Make sure only the BOT_OWNER has access to this command
It can break your bot and is really really dangerous!
:::

---

### Previev
![Avatar Usage Preview](https://cdn.discordapp.com/attachments/469576672128139275/545675052503531550/unknown.png)

---

<CustomLayout/>