<template>
    <header class="navbar">
        <v-toolbar app flat>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">Paladin</span>
                <span>Docs</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="links" :style="linksWrapMaxWidth ? {'max-width': linksWrapMaxWidth + 'px'} : {}">
                <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
                <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
                <NavLinks class="can-hide"/>
            </div>
        </v-toolbar>
        <v-navigation-drawer
                class="nav-drawer"
                v-model="drawer"
                fixed
                temporary
                color="red"
                app
        >
            <v-layout column align-center>
                <v-flex class="mt-3">
                    <v-avatar size="90">
                        <img class="text-lg-center"
                             src="https://cdn.discordapp.com/attachments/396964573007052800/492135654919241739/PaladinMainAvatar.png">
                    </v-avatar>
                    <p class="white--text subheading mt-2">Paladin Bot</p>
                </v-flex>
            </v-layout>

            <v-divider/>


            <v-list>
                <template v-for="item in sidebarItems">
                    <v-list-group>
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-action v-if="item.icon">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-title>
                                    {{ item.title }}
                                </v-list-tile-title>
                            </v-list-tile>
                        </template>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="" router
                                     :to="child.regularPath">
                            <v-list-tile-title class="sidebar-child-entry">{{child.title}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>
    </header>
</template>

<script>
	import AlgoliaSearchBox from '@AlgoliaSearchBox';
	import SearchBox from '@SearchBox';
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
		mounted() {
			console.log(this.sidebarItems);
		},
	};
</script>

<style lang="stylus" scoped>
    .nav-drawer
        background-color: #212121 !important

    .sidebar-child-entry
        text-align center !important

    @media (max-width: ($MQMobile + 90px))
        .navbar
            padding-left 4rem

            .can-hide
                display none

            .links
                padding-left 1.5rem
</style>
