## Netdata
![Netdata](https://cdn.discordapp.com/attachments/396964573007052800/549687338352115715/netdata.gif)
### Installation (Linux)
```sh
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```
(do not `sudo` this command, it will do it by itself as needed)

### Getting Started
To access the netdata dashboard, navigate with your browser to:
>http://your.server.ip:19999/

### Starting and stopping Netdata
Netdata installer integrates Netdata to your init / systemd environment.
To start/stop Netdata, depending on your environment, you should use:
```sh
systemctl start netdata and systemctl stop netdata
service netdata start and service netdata stop
/etc/init.d/netdata start and /etc/init.d/netdata stop
```
### Monitoring MySQL/ PostgresSQL
run
```sh
sudo /etc/netdata/edit-config python.d/nginx.conf
```
and check if python.d enabled - if not then enable it
```sh
# Enable / disable the whole python.d.plugin (all its modules)
enabled: yes

# ----------------------------------------------------------------------
# Enable / Disable python.d.plugin modules
default_run: yes
```
restart netdata using
```sh
systemctl restart netdata
```

For postgres you have to run
```sh
sudo apt-get install python-psycopg2
```

For MySQL you have to install the python library MySQLdb
```sh
sudo apt-get install python-pip python-dev libmysqlclient-dev
pip install mysqlclient
```

now run 
```sh
ln -s /usr/bin/python /usr/libexec/netdata/plugins.d/python
```

and enable the plugins in `/etc/netdata/netdata.conf`
it should look like this:
```
[plugins]
	# PATH environment variable = /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin
	PYTHONPATH environment variable = /usr/libexec/netdata/plugins.d:/usr/bin:/sbin:/usr/local/bin:/usr/local/sbin
	proc = yes
	diskspace = yes
	cgroups = yes
	tc = yes
	idlejitter = yes
	enable running new plugins = yes
	check for new plugins every = 60
	apps = yes
	fping = yes
	go.d = yes
	charts.d = yes
	node.d = yes
	python.d = yes
```

create `mysql.conf` and/or `postgres.conf` in `/etc/netdata/python.d/`

and paste + edit this lines
>mysql.conf

```yaml
update_every : 10
priority     : 90100

MYSQL:
  user     : 'DB_USER_NAME'
  pass : 'DB_PASSWORD'
  socket   : '/var/run/mysqld/mysqld.sock'
  update_every : 1
```

>postgres.conf
```yaml
update_every: 30

tcp:
    name     : 'Postgres'
    database : 'DB_NAME'
    user     : 'postgres'
    host     : 'localhost'
    password : 'DB_USER_PASSWORD'
    port     : 5432    
```

Finally restart netdata
```sh
systemctl restart netdata
```
and open `http://your.server.ip:19999`

It might take a few second for netdata to detect the new plugins
In case you can not see it simply press F5.

You should be able to see your newly added plugins on the right sidebar!

### Discord Notifications
- Go to `/etc/netdata/` and open `health_alarm_notify.conf`
- Search for `SEND_DISCORD="YES"`
- paste and edit this lines
```
#------------------------------------------------------------------------------
# discord (discordapp.com) global notification options

# multiple recipients can be given like this:
#                  "CHANNEL1 CHANNEL2 ..."

# enable/disable sending discord notifications
SEND_DISCORD="YES"

# Create a webhook by following the official documentation -
# https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks
DISCORD_WEBHOOK_URL="YOUR_WEBHOOK_URL_HERE"

# if a role's recipients are not configured, a notification will be send to
# this discord channel (empty = do not send a notification for unconfigured
# roles):
DEFAULT_RECIPIENT_DISCORD="alarms"


#------------------------------------------------------------------------------
```

don't forget to save and restart netdata!

### Uninstall netdata
```sh
cd /usr/src/netdata.git./netdata-uninstaller.sh --force
```

### Resources
- [Netdata Github](https://github.com/netdata/netdata)
- [Netdata Docs](https://docs.netdata.cloud/)
- [Discord Webhook](https://docs.netdata.cloud/health/notifications/discord/)

## Other tools

- [Grafana](https://grafana.com/)
