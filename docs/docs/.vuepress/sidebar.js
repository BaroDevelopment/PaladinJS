module.exports = {
	'/usage/': [
		{
			title: 'Home',
			collapsable: false,
			children: ['/'],
		},
		{
			title: 'Vuepress',
			icon: 'fab fa-vuejs',
			collapsable: true,
			children: [
				'/usage/vuepress',
				'/usage/markdown',
				'/usage/cards',
				'/usage/container',
				'/usage/latex'
			],
		},
		{
			title: 'Javascript',
			icon: 'fab fa-discord',
			collapsable: true,
			children: ['/usage/discordjs/'],
		},
		{
			title: 'Monitoring',
			collapsable: true,
			icon: 'fas fa-desktop',
			children: ['/usage/monitoring'],
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
			icon: 'code',
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
			icon: 'gavel',
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
			icon: 'table_chart',
			children: [
				'/misc/json',
			],
		},
		{
			title: 'Media Commands',
			collapsable: true,
			icon: 'camera',
			children: [
				'/media/belike',
			],
		},
		{
			title: 'Search Commands',
			collapsable: true,
			icon: 'search',
			children: [
				'/search/google',
				'/search/lmgtfy',
				'/search/urban',
				'/search/dictionary',
			],
		},
		{
			title: 'Information Commands',
			icon: 'info',
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