<template>
    <div class="d-flex flex-wrap">
        <HomePlaylistItem v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"/>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import HomePlaylistItem from "./HomePlaylistItem";
    import fetchRandomImage from "../../data/backgroundImage";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {HomePlaylistItem},
        data: () => ({
            playlists: [],
            bgImage: null
        }),
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
        created(){
            this.initializeBgImage();
            database.collection('Playlist').where("userId", '==', firebase.auth().currentUser.uid)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.playlists = [...this.playlists, { id: doc.id, ...doc.data() }];
                    });
                })
                .catch(error => {
                    console.error(error);
                })
        },
        methods: {
            async initializeBgImage(){
                this.bgImage = await fetchRandomImage();
            }
        },
        watch: {
            bgImage(newValue){
                updateBackground(newValue);
            }
        }
    };
</script>