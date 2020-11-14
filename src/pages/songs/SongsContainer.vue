<template>
    <Loading v-if="loadingData" no-container/>
    <div v-else>
        <CreateSong/>
        <Songlist v-if="songs.length > 0" :songs="songs"/>
        <div v-else>No songs found</div>
    </div>
</template>

<script>
    import Songlist from "./SongList";
    import Loading from "../loading/Loading";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import CreateSong from "./CreateSong";

    const database = firebase.firestore();

    export default {
        name: 'SongContainer',
        components: {CreateSong, Loading, Songlist},
        data: () => ({
            loadingData: true,
            songs: []
        }),
        created() {
            const self = this;
            database
                .collection('Song')
                .where('userId', '==', this.$store.state.user.uid)
                .get()
                .then( result => {
                    const songs = [];
                    result.forEach(doc => {
                        songs.push({ id: doc.id, ...doc.data() });
                    });
                    self.songs = songs;
                })
                .catch(console.error)
                .finally(() => { this.loadingData = false })
        }
    };
</script>

<style scoped>
    .new-song-btn:hover{
        opacity: 1;
    }
</style>