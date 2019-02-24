const sidebar = require('./sidebar.js');

module.exports = {
	title: 'Paladin Documentation',
	description: 'A Multipurpose Premium Discord Bot with unique features.',
	// markdown: {
	// 	lineNumbers: true
	// }
	dest: 'public',
	plugins: [
		'@vuepress/plugin-back-to-top',
	],
	themeConfig: {
		repo: 'SenaxDev/PaladinJS',
		docsDir: 'docs/',
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
				text: 'Util',
				link: '/util/',
			},
		],
		sidebar,
	},
};