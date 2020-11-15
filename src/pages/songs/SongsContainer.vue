<template>
    <div>
        <CreateSong :on-new-song="handleNewSong"/>
        <Songlist
                :songs="songs"
                :loading="loadingData"
                :on-delete-songs="handleDeleteSongs"
        />
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import CreateSong from "./CreateSong";
    import Songlist from "./SongList";
    import {handleQuerySnapshot} from "../../helpers/functions";

    const database = firebase.firestore();

    export default {
        name: 'SongContainer',
        components: {Songlist, CreateSong},
        data: () => ({
            loadingData: true,
            songs: []
        }),
        created() {
            const self = this;
            database
                .collection('Song')
                .where('userId', '==', this.$store.state.user.uid)
                .orderBy('artist')
                .orderBy('title')
                .get()
                .then( result => {
                    self.songs = handleQuerySnapshot(result);
                })
                .catch(console.error)
                .finally(() => { this.loadingData = false })
        },
        methods: {
            handleNewSong(newSong){
                this.songs = [...this.songs, newSong];
            },
            handleDeleteSongs(songsToDelete) {
                this.songs = this.songs.filter(song => !songsToDelete.includes(song));
            }
        }
    };
</script>