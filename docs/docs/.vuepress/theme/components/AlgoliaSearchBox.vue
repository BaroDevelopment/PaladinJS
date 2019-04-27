<template>
  <v-form
          id="search-form"
          class="algolia-search-wrapper search-box"
          role="search"
  >
    <v-autocomplete
            :search-input.sync="query"
            label="Search"
            color="light-blue accent-3"
            dense
            hide-no-data
            class="search-query"
            height="20px"
            id="algolia-search-input"
            clearable
    >
      <template v-slot:append>
        <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
        ></v-progress-circular>
        <v-icon v-else width="24" height="24">search</v-icon>
      </template>
    </v-autocomplete>
  </v-form>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				query: null,
			};
		},
		props: ['options'],

		mounted() {
			this.initialize(this.options, this.$lang);
		},
		methods: {
			initialize(userOptions, lang) {
				Promise.all([
					import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
					import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css'),
				]).then(([docsearch]) => {
					docsearch = docsearch.default;
					const { algoliaOptions = {} } = userOptions;
					docsearch(Object.assign(
						{},
						userOptions,
						{
							inputSelector: '#algolia-search-input',
							// #697 Make docsearch work well at i18n mode.
							algoliaOptions: Object.assign({
								'facetFilters': [`lang:${lang}`].concat(algoliaOptions.facetFilters || []),
							}, algoliaOptions),
						},
					));
				});
			},

			update(options, lang) {
				this.$el.innerHTML = '<input id="algolia-search-input" class="search-query">';
				this.initialize(options, lang);
			},
		},
		watch: {
			$lang(newValue) {
				this.update(this.options, newValue);
			},
			options(newValue) {
				this.update(newValue, this.$lang);
			},
			query(newVal) {
				this.loading = true;
				setTimeout(() => this.loading = false, 400);
			},
		},
	};
</script>

<style lang="stylus">
  .ds-dataset-1
    background-color #0f0f0f !important
  .search-box
    display inline-block
    position relative
    padding-top 30px
    padding-bottom 15px

  .algolia-search-wrapper
    & > span
      vertical-align middle

    .algolia-autocomplete
      line-height normal

      .ds-dropdown-menu
        /*background-color #fff !important*/
        /*border 1px solid #999 !important*/
        border-radius 4px
        font-size 16px
        margin 6px 0 0
        padding 4px
        text-align left

        &:before
          border-color #999

        [class*=ds-dataset-]
          border none
          padding 0

        .ds-suggestions
          margin-top 0

        .ds-suggestion
          border-bottom .2px solid $borderColor

      .algolia-docsearch-suggestion--highlight
        color $accentColor

      .algolia-docsearch-suggestion
        border-color $borderColor
        padding 0

        .algolia-docsearch-suggestion--category-header
          padding 5px 10px
          margin-top 0
          background $accentColor
          color #fff
          font-weight 600

        .algolia-docsearch-suggestion--wrapper
          padding 0
          background-color #424242

        .algolia-docsearch-suggestion--title
          font-weight 600
          margin-bottom 0
          color lighten($textColor, 50%)

        .algolia-docsearch-suggestion--subcategory-column
          vertical-align top
          padding 5px 7px 5px 5px
          border-color $borderColor
          background #424242

          &:after
            display none

        .algolia-docsearch-suggestion--subcategory-column-text
          color lighten($textColor, 50%)

      .algolia-docsearch-footer
        border-color $borderColor

      .ds-cursor .algolia-docsearch-suggestion--content
        color $textColor

  @media (min-width: $MQMobile)
    .algolia-search-wrapper
      .algolia-autocomplete
        .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--subcategory-column
            float none
            width 150px
            min-width 150px
            display table-cell

          .algolia-docsearch-suggestion--content
            float none
            display table-cell
            width 100%
            vertical-align top

          .ds-dropdown-menu
            min-width 515px !important

  @media (max-width: $MQMobile)
    .algolia-search-wrapper
      .ds-dropdown-menu
        min-width calc(100vw - 4rem) !important
        max-width calc(100vw - 4rem) !important

      .algolia-docsearch-suggestion--wrapper
        padding 5px 7px 5px 5px !important

      .algolia-docsearch-suggestion--subcategory-column
        padding 0 !important
        background white !important

      .algolia-docsearch-suggestion--subcategory-column-text:after
        content " > "
        font-size 10px
        line-height 14.4px
        display inline-block
        width 5px
        margin -3px 3px 0
        vertical-align middle
</style>
