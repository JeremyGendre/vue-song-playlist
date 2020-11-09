<template>
    <div>
        <HomePlaylistItem v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"/>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import HomePlaylistItem from "./HomePlaylistItem";

    const database = firebase.firestore();

    export default {
        name: 'Home',
        components: {HomePlaylistItem},
        data: () => ({
            playlists: []
        }),
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
        created(){
            updateBackground(null);
            database.collection('Playlist').where("userId", '==', firebase.auth().currentUser.uid)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data());
                        this.playlists = [...this.playlists, { id: doc.id, ...doc.data() }];
                    });
                })
                .catch(error => {
                    console.error(error);
                })
        },
        methods: {
            goToPlaylist(){
                this.$router.push('/playlist')
            }
        }
    };
</script>