module.exports = {
	'/util/': [
		{
			title: 'Home',
			collapsable: false,
			children: ['/'],
		},
		{
			title: 'Vuepress',
			collapsable: true,
			children: ['/util/vuepress'],
		},
		{
			title: 'Monitoring',
			collapsable: true,
			children: ['/util/monitoring'],
		},
		{
			title: 'Markdown',
			collapsable: true,
			children: ['/util/markdown'],
		},
		{
			title: 'Discord.js',
			collapsable: true,
			children: ['/util/discordjs'],
		},
	],
	'/': [
		{
			title: 'Home',
			collapsable: false,
			children: ['/', 'welcome'],
		},
		{
			title: 'Owner Commands',
			collapsable: true,
			children: [
				'/owner/eval',
				'/owner/ssh',
				'/owner/exec',
				'/owner/setAvatar',
				'/owner/setActivity',
				'/owner/leaveServer',
				'/owner/setUsername',
				'/owner/setNickname',
			],
		},
		{
			title: 'Moderation Commands',
			collapsable: true,
			children: [
				'/moderation/kick',
				'/moderation/ban',
				'/moderation/purge',
				'/moderation/channeltopic',
				'/moderation/emote',
			],
		},
		{
			title: 'Misc Commands',
			collapsable: true,
			children: [
				'/misc/json',
			],
		},
		{
			title: 'Search Commands',
			collapsable: true,
			children: [
				'/search/google',
				'/search/lmgtfy',
				'/search/urban',
				'/search/dictionary',
			],
		},
		{
			title: 'Information Commands',
			collapsable: true,
			children: [
				'/information/help',
				'/information/avatar',
				'/information/userinfo',
				'/information/serverinfo',
				'/information/roleinfo',
				'/information/emojiinfo',
				'/information/botinfo',
				'/information/channelinfo',
				'/information/shardinfo',
				'/information/afk',
				'/information/ping',
				'/information/uptime',
				'/information/speedtest',
			],
		},
	],
};