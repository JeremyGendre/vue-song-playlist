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
    import {updateBackground} from "../../helpers/functions";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import HomePlaylistItem from "./HomePlaylistItem";
    import fetchRandomImage from "../../data/backgroundImage";
    import CreatePlaylistCard from "./CreatePlaylistCard";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {CreatePlaylistCard, HomePlaylistItem},
        data: () => ({
            playlists: [],
            bgImage: null,
            loading: true
        }),
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
        created(){
            this.initializeBgImage();
            database.collection('Playlist')
                .where("userId", '==', firebase.auth().currentUser.uid)
                .orderBy('name')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.playlists = [...this.playlists, { id: doc.id, ...doc.data() }];
                    });
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => { this.loading = false })
        },
        methods: {
            async initializeBgImage(){
                this.bgImage = await fetchRandomImage();
            },
            deletePlaylist(id){
                this.playlists = this.playlists.filter(playlist => playlist.id !== id);
            }
        },
        watch: {
            bgImage(newValue){
                updateBackground(newValue);
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