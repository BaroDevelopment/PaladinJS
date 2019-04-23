module.exports = {
	'/util/': [
		{
			title: 'Home',
			collapsable: false,
			children: ['/'],
		},
		{
			title: 'Vuepress',
			icon: 'fab fa-vuejs',
			collapsable: true,
			children: ['/util/vuepress'],
		},
		{
			title: 'Monitoring',
			collapsable: true,
			icon: 'fas fa-desktop',
			children: ['/util/monitoring'],
		},
		{
			title: 'Markdown',
			collapsable: true,
			icon: 'fas fa-terminal',
			children: ['/util/markdown', '/util/markdown/container'],
		},
		{
			title: 'LaTeX',
			icon: 'fas fa-calculator',
			collapsable: true,
			children: ['/util/latex'],
		},
		{
			title: 'Discord.js',
			icon: 'fab fa-discord',
			collapsable: true,
			children: ['/util/discordjs'],
		},
	],
	'/': [
		{
			title: 'Home',
			collapsable: false,
			children: ['/', 'welcome'],
			icon: 'dashboard'
		},
		{
			title: 'Owner Commands',
			collapsable: true,
			icon: 'fas fa-code',
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
			icon: 'fas fa-balance-scale',
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
			icon: 'fab fa-dashcube',
			children: [
				'/misc/json',
			],
		},
		{
			title: 'Media Commands',
			collapsable: true,
			icon: 'fas fa-images',
			children: [
				'/media/belike',
			],
		},
		{
			title: 'Search Commands',
			collapsable: true,
			icon: 'fas fa-search',
			children: [
				'/search/google',
				'/search/lmgtfy',
				'/search/urban',
				'/search/dictionary',
			],
		},
		{
			title: 'Information Commands',
			icon: 'fas fa-info-circle',
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