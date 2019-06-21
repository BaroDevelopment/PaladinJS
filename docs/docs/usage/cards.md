## Cards

### ImageCard

#### Example Code
<br/>

<Expansion lang="vue">

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
        import ImageCard from './ImageCard'
        export default {
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
            name: 'ImageCardExample',
            components: { ImageCard },
        };
    </script>
</Expansion>

<example-ImageCardExample/>

### IconCard
<br/>

<Expansion lang="vue">

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

</Expansion>
<example-IconTextCardExample/>
