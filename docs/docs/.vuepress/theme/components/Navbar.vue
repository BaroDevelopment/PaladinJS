<template>
    <header class="navbar">
        <v-toolbar app flat>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase headerTitle">
                <span class="font-weight-light">Paladin</span>
                <span>Docs</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
            <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
            <v-spacer></v-spacer>
            <div class="links" :style="linksWrapMaxWidth ? {'max-width': linksWrapMaxWidth + 'px'} : {}">
                <NavLinks class="can-hide"/>
            </div>
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <v-layout column align-center class="nav-drawer">
                <v-flex class="mt-3">
                    <v-avatar size="90">
                        <img class="text-lg-center"
                             src="https://cdn.discordapp.com/attachments/396964573007052800/492135654919241739/PaladinMainAvatar.png">
                    </v-avatar>
                    <p class="white--text subheading mt-2">Paladin Bot</p>
                </v-flex>
                <div class="links" :style="linksWrapMaxWidth ? {'max-width': linksWrapMaxWidth + 'px'} : {}">
                    <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
                    <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
                </div>
            </v-layout>
            <v-divider/>


            <v-list v-for="item in sidebarItems" class="drawerListEntries">
                <v-list-group
                        :prepend-icon="item.icon"
                        value="false"
                >
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile
                            v-for="(child, i) in item.children"
                            :key="i" @click=""
                            :to="child.regularPath"
                            router
                    >
                        <v-list-tile-action>
                            <v-icon></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{child.title}}</v-list-tile-title>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </header>
</template>

<script>
	import AlgoliaSearchBox from '@AlgoliaSearchBox';
	import SearchBox from '@theme/components/SearchBox.vue';
	import SidebarButton from '@theme/components/SidebarButton.vue';
	import NavLinks from '@theme/components/NavLinks.vue';
	import { resolveSidebarItems } from '../util';


	export default {
		components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

		data() {
			return {
				drawer: false,
				linksWrapMaxWidth: null,
			};
		},
		computed: {
			algolia() {
				return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {};
			},

			isAlgoliaSearch() {
				return this.algolia && this.algolia.apiKey && this.algolia.indexName;
			},
			sidebarItems() {
				return resolveSidebarItems(
					this.$page,
					this.$page.regularPath,
					this.$site,
					this.$localePath,
				);
			},
		},
	};
</script>

<style lang="stylus" scoped>
    .nav-drawer
        background-color: #212121 !important
    .drawerListEntries
        background-color: #313131 !important

    @media (max-width: $MQMobile)
        .navbar
            padding-left 4rem

            .can-hide
                display none

            .links
                padding-left 1.5rem

    @media (max-width: $MQMobile)
        .headerTitle
            display none
</style>
