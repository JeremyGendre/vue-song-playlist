<template>
    <div>
        <div class="mb-4">
            <CreatePlaylistCard/>
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
    import CreatePlaylistCard from "./CreatePlaylistCard";
    import {handleQuerySnapshot} from "../../helpers/functions";
    import Loading from "../loading/Loading";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {Loading, CreatePlaylistCard, HomePlaylistItem},
        data: () => ({
            playlists: [],
            loading: true
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
            }
        }
    };
</script>

<style scoped>
    .loading-div{
        background-color: #212121;
        color: white;
    }
</style>