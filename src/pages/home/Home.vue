<template>
    <div class="d-flex flex-wrap">
        <CreatePlaylistCard/>
        <div v-if="loading" class="ma-auto ml-8 loading-div px-4 py-2">Fetching data ...</div>
        <HomePlaylistItem v-for="playlist in playlists"
                          :key="playlist.id"
                          :playlist="playlist"
                          :on-delete="deletePlaylist"
        />
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import HomePlaylistItem from "./HomePlaylistItem";
    import CreatePlaylistCard from "./CreatePlaylistCard";
    import {handleQuerySnapshot} from "../../helpers/functions";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {CreatePlaylistCard, HomePlaylistItem},
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