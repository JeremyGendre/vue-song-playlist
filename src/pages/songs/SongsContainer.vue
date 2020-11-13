<template>
    <Loading v-if="loadingData" no-container/>
    <Songlist v-else-if="songs.length > 0" :songs="songs"/>
    <div v-else>No songs in this playlist</div>
</template>

<script>
    import Songlist from "../../components/playlist/SongList";
    import Loading from "../loading/Loading";
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    const database = firebase.firestore();

    export default {
        name: 'SongContainer',
        components: {Loading, Songlist},
        data: () => ({
            loadingData: true,
            songs: []
        }),
        created() {
            database
                .collection('Song')
                .where('userId', '==', this.$store.state.user.uid)
                .get()
                .then( result => {
                    result.forEach(doc => {
                        console.log(doc.data());
                    })
                })
                .catch(console.error)
                .finally(() => { this.loadingData = false })
        }
    };
</script>