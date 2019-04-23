<template>
    <router-link class="nav-link" :to="link" v-if="!isExternal(link)" :exact="exact">
        {{ item.text }}
    </router-link>

<!--    <router-link class="" :to="link" v-if="!isExternal(link)" :exact="exact">
        <v-btn color="#303133" class="white&#45;&#45;text nav-link external">
            {{ item.text }}
        </v-btn>
    </router-link>-->

<!--    <a
            v-else
            :href="link"
            class="nav-link external"
            :target="isMailto(link) || isTel(link) ? null : '_blank'"
            :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
    >
        {{ item.text }}
        <OutboundLink/>
    </a>-->
    <v-btn v-else color="#303133" class="white--text nav-link external"  :href="link"
           :target="isMailto(link) || isTel(link) ? null : '_blank'"
           :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'">
        {{ item.text }}
        <OutboundLink/>
    </v-btn>
</template>

<script>
	import { isExternal, isMailto, isTel, ensureExt } from '../util';

	export default {
		props: {
			item: {
				required: true,
			},
		},

		computed: {
			link() {
				return ensureExt(this.item.link);
			},

			exact() {
				if (this.$site.locales) {
					return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
				}
				return this.link === '/';
			},
		},

		methods: {
			isExternal,
			isMailto,
			isTel,
		},
	};
</script>

<style scoped lang="stylus">
/*    .nav-item > a:not(.external):hover, .nav-item > a:not(.external).router-link-active
        border-bottom: none !important*/
</style>
