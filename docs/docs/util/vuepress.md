## Vuepress

### Installation

#### Global Installation
```sh
# install globally
yarn global add vuepress # OR npm install -g vuepress

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
vuepress dev

# build
vuepress build
```
#### Inside an Existing Project
```sh
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo '# Hello VuePress' > docs/README.md
```
::: danger Warning
It is currently recommended to use [Yarn](https://yarnpkg.com/en/) instead of npm when installing VuePress into an existing project 
that has webpack 3.x as a dependency. Npm fails to generate the correct dependency tree in this case.
:::

Then, add some scripts to `package.json`:
```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

You can now start writing with:
```sh
yarn docs:dev # OR npm run docs:dev
```
To generate static assets, run:
```sh
yarn docs:build # Or npm run docs:build
```
By default the built files will be in `.vuepress/dist`, which can be configured via the dest field in `.vuepress/config.js`. 
The built files can be deployed to any static file server. 
See [Deployment Guide](https://v1.vuepress.vuejs.org/guide/deploy.html) for guides on deploying to popular services.

### Resources
- [Vuepress Github](https://github.com/vuejs/vuepress)
- [Vuepress 1.x Docs](https://v1.vuepress.vuejs.org/)
- [Vuepress 0.x Docs](https://vuepress.vuejs.org/)
- [Discord.js Guide ](https://discordjs.guide/)
- [Vuepress-theme-yuu](https://github.com/Danktuary/vuepress-theme-yuu)
- [Vue Discord Message](https://github.com/Danktuary/vue-discord-message)
