<template>
    <div :class="['admonition', type]">
        <v-expansion-panel dark expand :value="expand">
            <v-expansion-panel-content class="admonitionContainer">
                <template v-slot:actions>
                    <v-icon>{{items[type]['icon']}}</v-icon>
                </template>
                <template v-slot:header class="admonitionHeader">
                    <div class="admonition-title">
                        {{title}}
                    </div>
                </template>
                <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
	export default {
		name: 'Admonition',
		data() {
			return {
				items: {
					note: { icon: 'create' },
					abstract: { icon: 'file_copy' },
					information: { icon: 'info' },
					tip: { icon: 'code' },
					check: { icon: 'check_circle_outline' },
					question: { icon: 'help' },
					warn: { icon: 'warning' },
					fail: { icon: 'close' },
					err: { icon: 'flash_on' },
					bug: { icon: 'bug_report' },
					example: { icon: 'bookmarks' },
					quote: { icon: 'format_quote' },
				},
			};
		},
		props: {
			type: {
				default: 'note',
				type: String,
			},
			text: {
				type: String,
				required: true,
			},
            expand:{
				type: Number,
                default: 0,
            },
			title: {
				type: String,
				required: true,
			},
		},
        computed:{
			expandable(){
				return this.expand ? [true] : [false]
            }
        }
	};
</script>

<style lang="stylus" scoped>

    /*.admonitionContent, .admonitionContainer*/
    /*border-left: .4rem solid #0288D1 !important*/

    /*    .theme--dark.v-expansion-panel .v-expansion-panel__container
            background-color: rgba(#0288D1, 0.2) !important*/

    $admonition
        //box-shadow 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2)
        position relative
        margin 1.5625em 0
        border-radius .2rem
        overflow hidden

    html .admonition > :last-child
        margin-bottom 1.2rem

    .admonition .admonition
        margin 1em 0

    .admonition p
        margin-top: 0.5em

    $admonition-icon
        position absolute
        left 1.2rem
        font-family: "Material Icons"
        font-weight: normal;
        font-style: normal;
        font-size: 24px
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';

    $admonition-title
        margin 0 -1.2rem
        padding .8rem 1.2rem .8rem 4rem
        border-bottom .1rem solid rgba(68, 138, 255, .1)
        background-color rgba(68, 138, 255, .1)
        font-weight 700

    .admonition > .admonition-title:last-child
        margin-bottom 0

    admonition_types = {
    note: {color: #0288D1, icon: "create"},
    abstract: {color: #c5d845, icon: "speaker_notes_filled"},
    information: {color: #19d8f5, icon: "info"}
    tip: {color: #00bfa5, icon: "code"},
    check: {color: #00c853, icon: "check_circle_outline"},
    question: {color: #64dd17, icon: "help"},
    warn: {color: #ff9100, icon: "warning"},
    fail: {color: #ff5252, icon: "close"},
    err: {color: #c2185b, icon: "flash_on"},
    bug: {color: #e040fb, icon: "bug_report"},
    example: {color: #651fff, icon: "bookmarks"},
    quote: {color: #9e9e9e, icon: "format_quote"}
}

    for name, val in admonition_types
        .admonition.{name}
            @extend $admonition
            .theme--dark.v-expansion-panel .v-expansion-panel__container
                background-color: rgba(val[color], 0.2)

            .admonitionContent, .admonitionContainer
                border-left: .4rem solid val[color]
        .admonition.{name} > .admonition-title
            @extend $admonition-title
            border-bottom-color: .1rem solid rgba(val[color], 0.2)
            background-color: rgba(val[color], 0.2)
            color lighten($textColor, 60%)

        .admonition.{name} > .admonition-title:before
            @extend $admonition-icon
            color: val[color]
            content: val[icon]
</style>