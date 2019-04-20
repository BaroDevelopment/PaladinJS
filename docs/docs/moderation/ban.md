## Ban Command
Ban a member from the server. Banned user will get a DM with reason aswell.

### User Permissions needed
> <Badge text="BAN_MEMBERS" type="error" vertical="middle"/>
### Bot Permissions needed
> <Badge text="BAN_MEMBERS" type="error" vertical="middle"/>

### Parameters
`@user` - The user to ban

`user-id` - The id of the user to ban

`user-name` - The name of the user to ban

::: danger 
If you provide `user-name` as parameter and multiple users have the same name
then bot will target the first match and you might end up banning wrong user!
:::

### Cooldown
`5 seconds`


### Usage
`-ban [@user]`

`-ban [user id]`

`-ban [user-name]`

::: warning
You can only ban 1 user with 1 command.
:::


### Previev

![Avatar Usage Preview](https://cdn.discordapp.com/attachments/469576672128139275/547781278259347456/unknown.png)


#### If DM is enabled then bot will send the banned user the same notification via DM
