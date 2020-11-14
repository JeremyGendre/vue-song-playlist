<template>
    <v-data-table
            :headers="tableHeader"
            :items="songs"
            :loading="loading || loadingPlaylists"
            :items-per-page="10"
            v-model="selectedSongs"
            show-select
            :single-select="false"
            item-key="id"
            class="elevation-1 rounded"
            mobile-breakpoint="500"
    >
        <template v-slot:top>
            <div class="text-left">
                <v-menu
                        bottom
                        left
                        top
                        offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                fab
                                small
                                dark
                                v-bind="attrs"
                                v-on="on"
                                class="ma-2"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list class="rounded song-list-menu">
                        <v-list-item link @click="onAddPlaylist()">Add to</v-list-item>
                        <v-list-item link @click="onDelete()">Delete</v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>
    </v-data-table>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import {handleQuerySnapshot} from "../../helpers/functions";

    const database = firebase.firestore();

    export default {
        name: 'SongList',
        props: {
            songs: Array,
            loading: Boolean
        },
        data: () => ({
            tableHeader: [
                { text: 'Artist', value: 'artist' },
                { text: 'Title', value: 'title' },
                {
                    text: '',
                    sortable: false,
                    value: 'actions',
                },
            ],
            loadingPlaylists: true,
            playlists : [],
            selectedSongs: []
        }),
        created(){
            const self = this;
            database
                .collection('Playlist')
                .where('userId', '==', firebase.auth().currentUser.uid)
                .get()
                .then(querySnapshot => {
                    self.playlists = handleQuerySnapshot(querySnapshot);
                })
                .catch(console.error)
                .finally(() => { this.loadingPlaylists = false; });
        },
        methods: {
            onDelete() {
                console.log('delete');
            },
            onAddPlaylist() {
                console.log('add');
            }
        },
        watch: {
            selectedSongs(newSongs){
                console.log(newSongs);
            }
        }
    };
</script>

<style scoped>
    .song-list-menu{
        z-index:200;
    }
</style>