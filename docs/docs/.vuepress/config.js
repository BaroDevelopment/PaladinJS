const sidebar = require('./sidebar.js');

module.exports = {
	title: 'Paladin Documentation',
	description: 'A Multipurpose Premium Discord Bot with unique features.',
	// markdown: {
	// 	lineNumbers: true
	// }
	base: '',
	dest: 'public',
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/nprogress',
		'vuepress-plugin-export',
		['mathjax', {
			target: 'svg',
			presets: [
				'\\def\\lr#1#2#3{\\left#1#2\\right#3}',
			],
			macros: {
				'*': '\\times',
				'\\Z': '\\mathbb{Z}',
				'\\R': '\\mathbb{R}',
				'\\N': '\\mathbb{N}',
				'\\Q': '\\mathbb{Q}',
			},
		}],
	],
	themeConfig: {
		repo: 'SenaxDev/PaladinJS',
		docsDir: 'docs/docs/',
		editLinks: true,
		sidebarDepth: 0,
		lastUpdated: true,
		displayAllHeaders: true,
		logo: 'https://cdn.discordapp.com/attachments/396964573007052800/492135654919241739/PaladinMainAvatar.png',
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
				text: 'Util',
				link: '/util/',
			},
		],
		sidebar,
	},
};
