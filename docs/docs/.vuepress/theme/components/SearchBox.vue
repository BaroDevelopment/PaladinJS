<template>


    <!--            <v-text-field
                v-model="query"
                outline
                clearable
                label="Search"
                type="text"
                aria-label="Search"
                :value="query"
                :class="{ 'focused': focused }"
                autocomplete="off"
                spellcheck="false"
                @focus="focused = true"
                @blur="focused = false"
                @keyup.enter="go(focusIndex)"
                @keyup.up="onUp"
                @keyup.down="onDown"
        >
            <template v-slot:append>
                <v-fade-transition leave-absolute>
                    <v-progress-circular
                            v-if="true"
                            size="24"
                            color="info"
                            indeterminate
                    ></v-progress-circular>
                    <v-icon v-else width="24" height="24">search</v-icon>
                </v-fade-transition>
            </template>
        </v-text-field>-->


    <!--        <div class="search-box">
                <input
                        @input="query = $event.target.value"
                        aria-label="Search"
                        :value="query"
                        :class="{ 'focused': focused }"
                        autocomplete="off"
                        spellcheck="false"
                        @focus="focused = true"
                        @blur="focused = false"
                        @keyup.enter="go(focusIndex)"
                        @keyup.up="onUp"
                        @keyup.down="onDown"
                >
                <ul
                        class="suggestions"
                        v-if="showSuggestions"
                        :class="{ 'align-right': alignRight }"
                        @mouseleave="unfocus"
                >
                    <li
                            class="suggestion"
                            v-for="(s, i) in suggestions"
                            :class="{ focused: i === focusIndex }"
                            @mousedown="go(i)"
                            @mouseenter="focus(i)"
                    >
                        <a :href="s.path" @click.prevent>
                            <span class="page-title">{{ s.title || s.path }}</span>
                            <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
                        </a>
                    </li>
                </ul>
            </div>-->


    <!--
        solo

-->

    <v-autocomplete
            v-model="model"
            :items="items"
            :loading="loading"
            :search-input.sync="query"
            item-text="title"
            item-value="path"
            clearable
            label="Search"
            auto-select-first
            color="light-blue accent-3"
            dark
            dense
            hide-no-data
            hide-selected
            class="search-box"
            append-icon="search"
            success-messages
            height="20px"
    ></v-autocomplete>

</template>

<script>
	/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS */
	export default {
		data() {
			return {
				query: null,
				focused: false,
				focusIndex: 0,
				loading: false,
				model: null,
				items: [],
			};
		},
		watch: {
			query(newVal) {
				console.log(this.items)
				if (!newVal || newVal.length <= 0) {
					this.items = [];
					return;
				}
				this.suggestions();
			},
		},
		computed: {
			showSuggestions() {
				return (
					this.focused
					&& this.suggestions
					&& this.suggestions.length
				);
			},
			// make suggestions align right when there are not enough items
			alignRight() {
				const navCount = (this.$site.themeConfig.nav || []).length;
				const repo = this.$site.repo ? 1 : 0;
				return navCount + repo <= 2;
			},
		},
		methods: {
			suggestions() {
				this.loading = true
				const query = this.query.trim().toLowerCase();
				if (!query) {
					return;
				}
				const { pages } = this.$site;
				const max = SEARCH_MAX_SUGGESTIONS;
				const localePath = this.$localePath;
				const matches = item => (
					item.title
					&& item.title.toLowerCase().indexOf(query) > -1
				);
				const res = [];
				for (let i = 0; i < pages.length; i++) {
					if (res.length >= max) break;
					const p = pages[i];
					// filter out results that do not match current locale
					if (this.getPageLocalePath(p) !== localePath) {
						continue;
					}
					// filter out results that do not match searchable paths
					if (!this.isSearchable(p)) {
						continue;
					}
					if (matches(p)) {
						res.push(p);
					}
					else if (p.headers) {
						for (let j = 0; j < p.headers.length; j++) {
							if (res.length >= max) break;
							const h = p.headers[j];
							if (matches(h)) {
								res.push(Object.assign({}, p, {
									path: p.path + '#' + h.slug,
									header: h,
								}));
							}
						}
					}
				}
				this.loading = false
				this.items = res
                const route = this.items.filter(e => e.title ===  this.query)
				if (route.length > 0){
					console.log('Redirecting now to .... ', route)
					console.log(window.location.href + route[0].path)

					this.$router.push(route[0].path)
					// window.location.href = window.location.href + route.path
				}
				// return;
			},
			getPageLocalePath(page) {
				for (const localePath in this.$site.locales || {}) {
					if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
						return localePath;
					}
				}
				return '/';
			},
			isSearchable(page) {
				let searchPaths = SEARCH_PATHS;
				// all paths searchables
				if (searchPaths === null) {
					return true;
				}
				searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths);
				return searchPaths.filter(path => {
					return page.path.match(path);
				}).length > 0;
			},
			onUp() {
				if (this.showSuggestions) {
					if (this.focusIndex > 0) {
						this.focusIndex--;
					}
					else {
						this.focusIndex = this.suggestions.length - 1;
					}
				}
			},
			onDown() {
				if (this.showSuggestions) {
					if (this.focusIndex < this.suggestions.length - 1) {
						this.focusIndex++;
					}
					else {
						this.focusIndex = 0;
					}
				}
			},
			go(i) {
				if (!this.showSuggestions) {
					return;
				}
				this.$router.push(this.suggestions[i].path);
				this.query = '';
				this.focusIndex = 0;
			},
			focus(i) {
				this.focusIndex = i;
			},
			unfocus() {
				this.focusIndex = -1;
			},
		},
	};
</script>

<style lang="stylus">
    .search-box
        display inline-block
        position relative
        padding-top 30px

        input
            width 10rem
</style>