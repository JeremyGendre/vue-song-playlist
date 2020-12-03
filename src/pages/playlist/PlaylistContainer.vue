<template>
    <Loading v-if="loadingData" no-container/>
    <Playlist v-else-if="songs.length > 0" :songs="songs"/>
    <div v-else>
        <div v-if="type !== 'favorites'">No songs in this playlist</div>
        <div v-else>No favorite songs</div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import Playlist from "./Playlist";
    import Loading from "../loading/Loading";
    import {handleQuerySnapshot} from "../../helpers/functions";

    const database = firebase.firestore();

    export default {
        name: 'PlaylistContainer',
        components: {Loading, Playlist},
        props:{
            type: String
        },
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
            if(this.type === 'favorites'){
                database.collection('Song')
                    .where('isFavorite', '==', true)
                    .where('userId', '==', self.$store.state.user.uid)
                    .get()
                    .then(querySnapshot => {
                        self.songs = handleQuerySnapshot(querySnapshot);
                    })
                    .catch(console.error)
                    .finally(() => {this.loadingData = false});
            }else{
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
            }
        },
        updated(){
            if(this.$store.state.user === null){
                this.$router.push('/403');
            }
        }
    };
</script>
