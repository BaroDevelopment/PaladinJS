const sidebar = require('./sidebar.js');

const config = {
	title: 'Paladin Documentation',
	description: 'A Multipurpose Premium Discord Bot with unique features.',
	markdown: {
		lineNumbers: false,
	},
	base: '',
	dest: 'public',
	head: [
		['link', { rel: 'icon', href: '/favicon.png' }],
		['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }],
		['link', { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' }],
		['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css' }],
		['meta', {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
		}],
		['script', { src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3', async: true, defer: true }, `
			const button = new Crate({
			location: ['bottom', 'right'],
			server: '393207704211947521',
			channel: '441694036785627157',
			shard: 'https://cl3.widgetbot.io'
			})
			button.notify('Need a hand? Leave a message!')
		`],
	],
	plugins: [
		'@vuepress/nprogress',
		'@vuepress/medium-zoom',
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-nprogress',
		'tabs',
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
		['container', {
			type: 'tip',
			defaultTitle: {
				'/zh/': '提示',
			},
		}],
		['container', {
			type: 'warning',
			defaultTitle: {
				'/zh/': '注意',
			},
		}],
		['container', {
			type: 'danger',
			defaultTitle: {
				'/zh/': '警告',
			},
		}],
		['container', {
			type: 'info',
			defaultTitle: {
				'/zh/': '警告',
			},
		}],
		['container', {
			type: 'vue',
			before: '<pre class="vue-container"><code>',
			after: '</code></pre>',
			defaultTitle: {
				'/zh/': '警告',
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
		algolia: {
			apiKey: '9923ebe5f42cc67f0904b3ea6e5cd718',
			indexName: 'paladinbot',
		},
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

module.exports = config;