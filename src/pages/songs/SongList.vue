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
            :search="search"
    >
        <template v-slot:top>
            <div class="text-left d-flex">
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
                                        @click="addDialog = true"
                                >
                                    Add to playlist
                                </v-list-item>
                            </template>
                            <v-card class="pt-4" :loading="loadingDialog" outlined color="blue-grey darken-4">
                                <template slot="progress">
                                    <v-progress-linear
                                            color="secondary"
                                            class="my-2"
                                            indeterminate
                                    ></v-progress-linear>
                                </template>
                                <v-card-text>
                                    <v-alert
                                             v-if="addToPlaylistComplete"
                                            prominent
                                            type="success"
                                    >
                                        <v-row align="center">
                                            <v-col class="grow">
                                                Songs have been successfully added to the selected playlist(s)
                                            </v-col>
                                            <v-col class="shrink">
                                                <v-btn @click="closeModal">Cool !</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-alert>
                                    <div v-else>
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
                                        <ErrorAlert :error="dialogError"/>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            text
                                            :loading="loadingDialog"
                                            :disabled="playlists.length <= 0 || selectedPlaylists.length <= 0 || loadingDialog"
                                            @click="onConfirmAddToPlaylist"
                                    >
                                        Confirm
                                    </v-btn>
                                    <v-btn text
                                           @click="closeModal"
                                           :disabled="loadingDialog || addToPlaylistComplete"
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
                                        @click="deleteDialog = true"
                                >
                                    Delete
                                </v-list-item>
                            </template>
                            <v-card class="pt-4" outlined color="blue-grey darken-4">
                                <v-card-text>
                                    Are you sure to delete the selected songs ?
                                    <ErrorAlert :error="dialogError"/>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            text
                                            :loading="loadingDialog"
                                            :disabled="loadingDialog"
                                            @click="onConfirmDelete"
                                    >
                                        Confirm
                                    </v-btn>
                                    <v-btn text @click="closeModal" :disabled="loadingDialog">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-list>
                </v-menu>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        class="my-auto pt-0 mr-2"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </template>
    </v-data-table>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/storage';
    import {handleQuerySnapshot} from "../../helpers/functions";
    import ErrorAlert from "../../components/alerts/ErrorAlert";
    import {mergeSongs} from "../../data/playlist";

    const database = firebase.firestore();
    const storageRef = firebase.storage().ref();

    export default {
        name: 'SongList',
        components: {ErrorAlert},
        props: {
            songs: Array,
            loading: Boolean,
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
            deleteDialog: false,
            loadingDialog: false,
            dialogError: null,
            addToPlaylistComplete: false,
            search: ''
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
                this.dialogError = null;
                this.loadingDialog = false;
                this.addDialog = false;
                this.deleteDialog = false;
                this.addToPlaylistComplete = false;
            },
            onConfirmDelete(){
                const self = this;
                this.loadingDialog = true;
                this.dialogError = null;
                const promises = [];
                const songIds = [];
                this.selectedSongs.forEach(songToDelete => {
                    const fileRef = storageRef.child('audio/' + songToDelete.fileName);
                    promises.push(fileRef.delete());
                    songIds.push(songToDelete.id);
                });
                Promise.all(promises)
                    .then(() => {
                        self.deleteSongInDB(songIds);
                    })
                    .catch(error => {
                        if(error.code === 'storage/object-not-found'){
                            self.deleteSongInDB(songIds);
                        }else{
                            console.error(error);
                            self.loadingDialog = false;
                            self.dialogError = (error.message ? error.message : 'An error occurred during song\'s file deletion')
                        }
                    })
            },
            deleteSongInDB(songIds){
                const self = this;
                const batch = database.batch();
                songIds.forEach(id => {
                    batch.delete(database.collection("Song").doc(id));
                });
                batch.commit()
                    .then(function () {
                        self.onDeleteSongs(self.selectedSongs);
                        self.closeModal();
                    })
                    .catch(error => {
                        console.error(error);
                        self.dialogError = (error.message ? error.message : 'An error occurred during song\'s deletion');
                    })
                    .finally(() => { self.loadingDialog = false; self.selectedSongs = [] });
            },
            onConfirmAddToPlaylist(){
                this.loadingDialog = true;
                this.dialogError = null;
                const self = this;
                const batch = database.batch();

                this.selectedPlaylists.forEach(selectedPlaylistId => {
                    const playlist = self.playlists.find(onePlaylist => onePlaylist.id === selectedPlaylistId);
                    if(playlist){
                        const playlistRef = database.collection("Playlist").doc(selectedPlaylistId);
                        batch.update(playlistRef, { ...playlist, songs : mergeSongs(playlist.songs, self.selectedSongs) })
                    }
                });

                batch.commit()
                    .then(function () {
                        self.selectedPlaylists = [];
                        self.selectedSongs = [];
                        self.addToPlaylistComplete = true;
                    })
                    .catch(error => {
                        console.error(error);
                        self.dialogError = (error.message ? error.message : 'An error occurred during the process');
                    })
                    .finally(() => { self.loadingDialog = false });
            }
        },
        watch: {
            addDialog(value){
                if(value){
                    this.addToPlaylistComplete = false;
                }
            }
        }
    };
</script>

<style scoped>
    .song-list-menu{
        z-index:200;
    }
</style>