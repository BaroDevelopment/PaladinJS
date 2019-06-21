<template>
    <v-container class="my-5">
        <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg4 xl6 v-for="item in items" :key="item.name" mb-3>
                <div @click="categoryURL(item)">
                    <IconTextCard
                            :icon="item.icon"
                            :locked="item.locked"
                            :title="item.name"
                            :description="item.description"
                            :banner="item.new"
                            :hoverColor="item.hoverColor"
                    />
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>

</style>

<script>
	import IconTextCard from './../IconTextCard';

	export default {
		components: { IconTextCard },
		name: "IconTextCardExample",
		data() {
			return {
				items: [
                    {
                        icon: 'https://cdn.discordapp.com/attachments/396964573007052800/554790690857418752/search.png',
                        locked: true,
                        title: 'Locked Search Item',
                        description: 'Search is disabled at the moment',
                        hoverColor: '#0f0f0f',
                        new: true
                    },
					{
						icon: 'https://cdn.discordapp.com/attachments/396964573007052800/556013408223494145/large_1x_database_lock.png',
						locked: false,
						title: 'Database',
						description: 'Database settings',
						hoverColor: '#00c8ff',
						new: true
					},
					{
						icon: 'https://cdn.discordapp.com/attachments/396964573007052800/556016768829620225/314068430854684672.png',
						locked: false,
						title: 'HypeSquad',
						description: 'Are you hyped?',
						hoverColor: 'yellow',
						new: true
					},
					{
						icon: 'https://cdn.discordapp.com/attachments/396964573007052800/556017095087882250/314003252830011395.png',
						locked: false,
						title: 'Discord',
						description: 'Join our amazing server',
						hoverColor: '#0f0f0f',
						new: false
					}
                ],
			};
		},
	};
</script>
