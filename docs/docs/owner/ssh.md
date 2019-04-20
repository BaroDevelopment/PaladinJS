## SSH Command
Execute command line commands on connected device using SSH. 
Mainly used to execute scripts like start, restart and update

The starting point/ base of the command is `/root/`.

::: tip 
This command is the same like [exec](./exec.md).
It is executing a given command on the cli the device is connected to via ssh.
:::

### User Permissions needed
`BOT_OWNER`

### Bot Permissions needed
`none`

### Parameters
`[command]` - Your command line code to execute

### Cooldown
`1 second`

### Usage
`-ssh [command]`

## Examples

```bash
-ssh sudo apt-get update                            => Update Linux host
-ssh ls                                             => check content in /root
-ssh cd PaladinJS && ls                             => check content in PaladinJS folder
-ssh sh start.sh                                    => start Paladin
-ssh sh restart.sh                                  => restart Paladin
-ssh sh update.sh                                   => Update Paladin
-ssh cd PaladinJS && sh start.sh                    => start PaladinJS
-ssh cd PaladinJS && sh stop.sh                     => shutdown PaladinJS
-ssh cd PaladinJS && sh restart.sh                  => restart PaladinJS
-ssh cd PaladinJS && sh update.sh                   => Update PaladinJS
-ssh sh restart.sh && cd PaladinJS && sh update.sh  => restart Paladin and update PaladinJS
```

::: tip How to stop the bot
```bash
-ssh tmux kill-session -t Paladin         => Shutdown Paladin
-ssh tmux kill-session -t PaladinJS       => Shutdown Paladin
```
:::

## Handling Script with Tmux (Paladin)

> Paladin start script
```bash
tmux new -d -s Paladin 'cd /root/Paladin/build/libs/ && java -jar Paladin-1.0-all.jar'
```

> Paladin restart script
```bash
cd /root/Paladin/ && tmux kill-session -t Paladin && tmux new -d -s Paladin 'cd build/libs/ && java -jar Paladin-1.0-all.jar'
```

> Paladin update script
```bash
 cd /root/Paladin/ && git pull && tmux kill-session -t Paladin && tmux new -d -s Paladin 'cd build/libs/ && java -jar Paladin-1.0-all.jar'
```

For more informations about Tmux click [HERE](https://gist.github.com/MohamedAlaa/2961058) 

## Handling Script with PM2 (PaladinJS)
> PaladinJS start script
```bash
cd /root/PaladinJS/app && pm2 start index.js --name PaladinJS --watch
```

> PaladinJS restart script
```bash
pm2 restart PaladinJS
```

> PaladinJS update script
```bash
git pull && pm2 restart PaladinJS
```

> PaladinJS stop script
```bash
pm2 delete PaladinJS
```

For more informations about PM2 click [here](https://pm2.keymetrics.io/) 