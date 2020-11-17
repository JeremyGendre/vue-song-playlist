<template>
    <Loading v-if="loadingData" no-container/>
    <Playlist v-else-if="songs.length > 0" :songs-list="songs"/>
    <div v-else>No songs in this playlist</div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import Playlist from "./Playlist";
    import Loading from "../loading/Loading";

    const database = firebase.firestore();

    export default {
        name: 'PlaylistContainer',
        components: {Loading, Playlist},
        data: () => ({
            songs: [],
            loadingData: true
        }),
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
        created(){
            const self = this;
            database.collection('Playlist')
                .doc(this.$route.params.id)
                .get()
                .then(doc => {
                    if(doc.data().userId === self.$store.state.user.uid){
                        self.songs = doc.data().songs;
                    }
                })
                .catch(console.error)
                .finally(() => {this.loadingData = false});
        },
        updated(){
            if(this.$store.state.user === null){
                this.$router.push('/403');
            }
        }
    };
</script>