module.exports = {
	title: 'Paladin Documentation',
	description: 'A Multipurpose Premium Discord Bot with unique features.',
	//base: '/PaladinJS/',
	dest: 'public',
	themeConfig: {
		yuu: {
			colorThemes: ['blue', 'red'],
		},
		//repo: 'YlNGYANG/PaladinJS',
		// docsDir: 'pages/',
		editLinks: true,
		sidebarDepth: 3,
		lastUpdated: true,
		displayAllHeaders: true,
		nav: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'Docs',
				link: '/welcome',
			},
			{
				text: 'Markdown',
				link: '/util/',
			},
		],
		sidebar: {
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
					],
				},
				{
					title: 'Moderation Commands',
					collapsable: true,
					children: [
						'/moderation/kick',
						'/moderation/ban',
						'/moderation/purge',
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
			'/util/': [
				{
					title: 'MarkDown',
					collapsable: false,
					children: ['/util/'],
				},
			],
		},
	},
};