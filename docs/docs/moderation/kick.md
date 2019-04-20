## Kick Command
Kick a member from the server. Kicked user will get a DM with reason aswell.

### User Permissions needed
> <Badge text="KICK_MEMBER" type="error" vertical="middle"/>
### Bot Permissions needed
> <Badge text="KICK_MEMBER" type="error" vertical="middle"/>

### Parameters
`@user` - The user to kick

`user-id` - The id of the user to kick

`user-name` - The name of the user to kick

::: danger 
If you provide `user-name` as parameter and multiple users have the same name
then bot will target the first match and you might end up kicking wrong user!
:::

### Cooldown
`5 seconds`


### Usage
`-kick [@user]`

`-kick [user id]`

`-kick [user-name]`

::: warning
You can only kick 1 user with 1 command.
:::


### Previev

![Avatar Usage Preview](https://cdn.discordapp.com/attachments/469576672128139275/547776229735006227/unknown.png)


#### If DM is enabled then bot will send the kicked user the same notification via DM
