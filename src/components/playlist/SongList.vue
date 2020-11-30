<template>
    <perfect-scrollbar id="list-card" :height="containerStyle !== null ? containerStyle.height : null">
        <v-card class="mx-auto text-left h-full song-list-card"
                :max-width="containerStyle !== null ? containerStyle.width : null" :height="containerStyle !== null ? containerStyle.height : null" tile>
            <v-list>
                <v-list-item-group
                        v-model="selectedItem"
                        color="textPrimary"
                >
                    <SongItem v-for="(song, index) in songs" :key="index" :index="index"
                              :class="(listenedSongs.includes(index) && index !== selectedItem ? 'opacity-50' : '')"
                              :active="index === selectedItem"
                              :is-next="nextSongIndex === index"
                              :song="song"
                              @toggleSetNext="toggleSetNext"
                    />
                </v-list-item-group>
            </v-list>
        </v-card>
    </perfect-scrollbar>
</template>

<script>
    import SongItem from "./SongItem";
    export default {
        name: 'Songlist',
        components: {SongItem},
        props:{
            songs: Array,
            containerStyle: Object,
            currentIndex: Number,
            listenedSongs: Array,
            nextSongIndex: Number
        },
        data: () => ({
            selectedItem: 0,
        }),
        methods:{
            toggleSetNext(index){
                this.$emit('toggleSetNext', index);
            }
        },
        watch:{
            selectedItem(newIndex){
                this.$emit('changeSong', newIndex);
            },
            currentIndex(newIndex){
                this.selectedItem = newIndex;
            }
        }
    };
</script>

<style scoped>
    #list-card{
        border-left: solid 2px #ef6c00;
        border-radius: 0 5px 5px 0;
    }
</style>
