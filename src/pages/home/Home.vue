<template>
    <div>
        <div class="mb-4">
            <NewPlaylist v-if="creating" :on-cancel="handleCreationCancel"/>
            <v-btn v-else @click="creating = true" class="rounded opacity-75 new-playlist-btn">
                New playlist
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <div class="d-flex flex-wrap">
            <Loading v-if="loading" no-container/>
            <HomePlaylistItem v-for="playlist in playlists"
                              :key="playlist.id"
                              :playlist="playlist"
                              :on-delete="deletePlaylist"
            />
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import HomePlaylistItem from "./HomePlaylistItem";
    import {handleQuerySnapshot} from "../../helpers/functions";
    import Loading from "../loading/Loading";
    import NewPlaylist from "./NewPlaylist";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {NewPlaylist, Loading, HomePlaylistItem},
        data: () => ({
            playlists: [],
            loading: true,
            creating: false
        }),
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
        created(){
            const self = this;
            database.collection('Playlist')
                .where("userId", '==', firebase.auth().currentUser.uid)
                .orderBy('name')
                .get()
                .then(querySnapshot => {
                    self.playlists = handleQuerySnapshot(querySnapshot);
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => { this.loading = false })
        },
        methods: {
            deletePlaylist(id){
                this.playlists = this.playlists.filter(playlist => playlist.id !== id);
            },
            handleCreationCancel(){
                this.creating = false
            }
        }
    };
</script>

<style scoped>
    .new-playlist-btn:hover{
        opacity: 1;
    }
</style>