<template>
    <v-footer height="auto" color="primary lighten-1">
        <v-layout grey darken-4 justify-center row wrap>

            <v-btn v-for="item in items" class="white--text" :href="item.url" target="_blank" :key="item.url">
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.text }}
            </v-btn>
            <v-flex grey darken-4 py-1 text-xs-center white--text xs12>
                &copy;2019 — <strong>Paladin</strong>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
	export default {
		name: 'Footer',
		data: () => ({
			items: [
				{text: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/SenaxDev/PaladinJS'},
				{text: 'Documentation', icon: 'fas fa-book', url: 'https://paladin.netlify.com/'},
				{text: 'Forum', icon: 'fas fa-link', url: 'https://www.paladinbot.online/'},
				{
					text: 'Support Server',
					icon: 'fab fa-discord',
					url: 'https://discord.gg/RFSYyCU'
				},
				{
					text: 'Add Paladin',
					icon: 'fas fa-plus-circle',
					url: 'https://discordapp.com/oauth2/authorize?client_id=441762003992838155&scope=bot&permissions=2146958847'
				},
				{
					text: 'Upvote',
					icon: 'fas fa-chevron-circle-up',
					url: 'https://discordbots.org/bot/441762003992838155/vote'
				},
				{
					text: 'Donate',
					icon: 'fab fa-paypal',
					url: 'https://donatebot.io/checkout/393207704211947521'
				},
			]
		}),
	};
</script>

<style scoped>

</style>