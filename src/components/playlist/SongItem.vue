<template>
    <v-list-item two-line>
        <v-list-item-content>
            <v-list-item-title v-text="song.title"/>
            <v-list-item-subtitle v-text="song.artist"/>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn v-if="!active" icon @click="toggleSetNext" small>
                <v-icon v-if="isNext" color="grey lighten-1">mdi-skip-next-circle</v-icon>
                <v-icon v-else color="grey lighten-1">mdi-skip-next-outline</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    export default {
        name: 'SongItem',
        props: {
            index: Number,
            song: Object,
            active: Boolean,
            isNext: Boolean
        },
        methods: {
            /*toggleFavorite(){
                database.collection("Playlist").doc(this.$route.params.id)
                    .set({ ...this.song, isFavorite : !this.song.isFavorite })
            },*/
            toggleSetNext(e){
                e.preventDefault();
                e.stopPropagation();
                this.$emit('toggleSetNext', this.index);
            }
        }
    };
</script>