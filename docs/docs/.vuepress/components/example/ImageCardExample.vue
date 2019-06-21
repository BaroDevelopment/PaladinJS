<template>
    <v-container class="my-3">
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 xl3 v-for="item in items" :key="item.title">
                <div @click="">
                    <ImageCard
                            :height="item.height"
                            :width="item.width"
                            :img="item.img"
                            :title="item.title"
                            :hoverColor="item.color"
                            :hover-text="item.hoverText"
                    />
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	import ImageCard from './../ImageCard'
	export default {
		name: 'ImageCardExample',
		components: { ImageCard },
		data(){
			return{
				items: [
					{
						color: 'red',
						hoverText: 'Watch me!',
						title: 'Red Shadow',
						img: 'https://cdn.discordapp.com/attachments/396964573007052800/492135655871086612/PaladinRed.png',
						height: 200,
						width: 200,
					},
					{
						color: '#0065FF',
						hoverText: 'Amazing ;)',
						title: 'Blue Shadow',
						img: 'https://cdn.discordapp.com/attachments/506538203855978517/530059732879147033/SealPotato200.gif',
						height: 200,
						width: 200,
					},
					{
						color: 'yellow',
						hoverText: 'Golden Shine;)',
						title: 'Yellow Shadow',
						img: 'https://cdn.discordapp.com/attachments/396964573007052800/492135667439108098/PaladinGold.png',
						height: 200,
						width: 200,
					},
					{
						color: '#0f0f0f',
						hoverText: 'Good thing;)',
						title: 'Dark Shadow',
						img: 'https://cdn.discordapp.com/attachments/396964573007052800/492135655175094274/PaladinMusterErd.png',
						height: 200,
						width: 200,
					}
				],
			}
		},
	};
</script>

<style scoped>

</style>