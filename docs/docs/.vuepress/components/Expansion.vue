<template>
    <v-expansion-panel expand>
        <v-expansion-panel-content>
            <template v-slot:actions>
                <v-icon color="primary">fas fa-code</v-icon>
            </template>
            <template v-slot:header>
                <div>{{title}}</div>
            </template>
            <v-card>
                <div :class="['language-' + lang, 'extra-class']">
                    <v-card-text class="white--text">
                        <slot></slot>
                    </v-card-text>
                </div>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
	export default {
		name: 'Expansion',
        props: {
			title:{
				default: 'Show Code',
                type: String
            },
            lang:{
				default: 'md',
                type: String
            }
        },
		components: {},
	};
</script>

<style scoped lang="stylus">

</style>