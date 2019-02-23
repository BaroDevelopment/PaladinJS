# Purge Command

### User Permissions needed
> <Badge text="MANAGE_MESSAGES" type="error" vertical="middle"/>
### Bot Permissions needed
> <Badge text="MANAGE_MESSAGES" type="error" vertical="middle"/>

### Parameters
`n` - The amount of messages you want to delete (between 1 and 99) - Default is 100

::: danger 
You can not delete more than 100 messages and messages posted 2 weeks ago or more.
This is a Discord restriction!
:::

### Cooldown
`30 seconds`

### Example
`-purge 42`

### Usage
`-purge [n]`

### Advanced Usage
```bash
-t [n]      => purge messages that got pasted n ago
-b          => purge only messages from bots (if user mentioned this will be ignored)
-p          => delete also pinned messages
-n          => the ammount of messages you wanna delete
@user       => delete messages only from mentioned user
```

>Example
---
---
---
purge from last 40 messages (including pinned ones) where 
the author is a bot, and the message is not older than 30 min 

#### Those are all equivalent to each other
`-purge 100 -bpt 30` 

`-purge -n 100 -bpt 30` 

`-purge -n 100 -b -p -t 30` 

`-purge --amount=100 --bots --pinned --time=30` 

---
---
---

Purge only messages from Stalista#7777

`-purge 100 @Stalista#7777`

<CustomLayout/>