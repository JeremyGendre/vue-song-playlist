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
                                :disabled="selectedSongs.length === 0"
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
                        <v-dialog
                                v-model="addDialog"
                                persistent
                                max-width="290"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item
                                        v-bind="attrs"
                                        v-on="on"
                                        link
                                        @click="onAddPlaylist"
                                >
                                    Add to playlist
                                </v-list-item>
                            </template>
                            <v-card class="pt-4" outlined color="blue-grey darken-4">
                                <v-card-text>
                                    <v-select
                                            v-if="playlists.length > 0"
                                            v-model="selectedPlaylists"
                                            :items="playlists"
                                            item-text="name"
                                            item-value="id"
                                            label="Playlists"
                                            multiple
                                            chips
                                    ></v-select>
                                    <div v-else>No playlists found</div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            text
                                            :disabled="playlists.length <= 0 || selectedPlaylists.length <= 0"
                                            @click="onConfirmAddToPlaylist"
                                    >
                                        Confirm
                                    </v-btn>
                                    <v-btn
                                            text
                                            @click="closeModal"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog
                                v-model="deleteDialog"
                                persistent
                                max-width="290"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item
                                        v-bind="attrs"
                                        v-on="on"
                                        link
                                        @click="onDelete"
                                >
                                    Delete
                                </v-list-item>
                            </template>
                            <v-card class="pt-4" outlined color="blue-grey darken-4">
                                <v-card-text>Are you sure to delete the selected songs ?</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            text
                                            @click="onConfirmDelete"
                                    >
                                        Confirm
                                    </v-btn>
                                    <v-btn
                                            text
                                            @click="closeModal"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
            loading: Boolean,
            onAddSongsToPlaylist: Function,
            onDeleteSongs: Function
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
            selectedSongs: [],
            selectedPlaylists: [],
            addDialog: false,
            deleteDialog: false
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
            closeModal(){
                this.addDialog = false;
                this.deleteDialog = false;
            },
            onDelete() {
                this.deleteDialog = true;
            },
            onConfirmDelete(){
                this.onDeleteSongs(this.selectedSongs);
            },
            onAddPlaylist() {
                this.addDialog = true;
            },
            onConfirmAddToPlaylist(){
                this.onAddSongsToPlaylist(this.selectedSongs, this.selectedPlaylists);
            },
        }
    };
</script>

<style scoped>
    .song-list-menu{
        z-index:200;
    }
</style>