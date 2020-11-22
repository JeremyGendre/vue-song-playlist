<template>
    <div id="playlist-container" class="d-flex relative">
        <div class="h-full">
            <Player
                    @updateStyle="updateContainerStyle"
                    @next="nextSong"
                    @previous="prevSong"
                    @toggleRandom="toggleRandom"
                    @toggleLoop="toggleLoop"
                    :song="songsArray[actualSongIndex]"
                    :isPrevPossible="isPrevPossible"
                    :isNextPossible="isNextPossible"
                    :randomPlaylist="randomPlaylist"
            />
        </div>
        <div class="h-full relative">
            <Songlist
                    @changeSong="handleSongChange"
                    :containerStyle="containerStyle"
                    :songs="songsArray"
                    :currentIndex="actualSongIndex"
                    :listenedSongs="listenedSongIndexes"
                    :on-drag="onListDrag"
            />
        </div>
        <MySnackbar :options="snackbar"/>
    </div>
</template>

<script>
    import Player from "../../components/player/Player";
    import Songlist from "../../components/playlist/SongList";
    import {getRandomInt} from "../../helpers/functions";
    import MySnackbar from "../../components/snackbar/MySnackbar";

    const defaultSnackbar = {
        show: false,
        text: '',
        btnText: 'Ok',
        btnAction: () => {},
        timeout: 2000
    };

    export default {
        name: 'Playlist',
        components: {MySnackbar, Songlist, Player},
        props:{
            songsList: Array
        },
        data: () => ({
            listenedSongIndexes: [],
            actualSongIndex: 0,
            containerStyle: null,
            randomPlaylist: false,
            snackbar: defaultSnackbar,
            songsArray : []
        }),
        created(){
            this.songsArray = this.songsList;
        },
        computed: {
            songs: {
                get(){ return this.songsArray },
                set(value){
                    this.songsArray = value;
                }
            },
            isPrevPossible(){
                return this.actualSongIndex > 0;
            },
            isNextPossible(){
                return this.actualSongIndex < this.songs.length - 1;
            }
        },
        watch: {
            songsList(songs){
                this.songsArray = songs;
            },
            actualSongIndex(newIndex){
                if(!this.listenedSongIndexes.includes(newIndex)){
                    this.listenedSongIndexes.push(newIndex);
                }
            }
        },
        methods: {
            onListDrag(value){
                this.songsArray = value;
            },
            nextSong(){
                if(this.randomPlaylist && this.listenedSongIndexes.length < this.songsArray.length){
                    const self = this;
                    const nonListenedSongIndexes = [];
                    this.songsArray.forEach((song, index) => {
                        if(!self.listenedSongIndexes.includes(index)){ nonListenedSongIndexes.push(index); }
                    });
                    this.actualSongIndex = nonListenedSongIndexes[getRandomInt(0, nonListenedSongIndexes.length)];
                } else if(this.actualSongIndex < this.songsArray.length - 1){
                    this.actualSongIndex++;
                }else{
                    this.snackbar = {
                        ...defaultSnackbar,
                        btnText: 'Replay',
                        timeout: -1,
                        show: true,
                        text: 'The playlist is finished.',
                        btnAction: () => {
                            this.listenedSongIndexes = [];
                            this.actualSongIndex = 0;
                            this.snackbar.show = false;
                        }
                    };
                }
            },
            prevSong(){
                if(this.actualSongIndex > 0){
                    this.actualSongIndex--;
                }
            },
            updateContainerStyle(value){
                this.containerStyle = value;
            },
            handleSongChange(index){
                if(this.songsArray[index] !== undefined){
                    this.actualSongIndex = index;
                }
            },
            toggleRandom(){
                this.randomPlaylist = !this.randomPlaylist;
                this.snackbar = {
                    ...defaultSnackbar,
                    show: true,
                    text: "Random track " + (this.randomPlaylist ? 'turned on' : 'turned off'),
                    btnAction: () => { this.snackbar.show = false }
                };
            },
            toggleLoop(isLooped){
                this.snackbar = {
                    ...defaultSnackbar,
                    show: true,
                    text: (isLooped ? 'Current track is being looped' : 'Track loop turned off'),
                    btnAction: () => { this.snackbar.show = false }
                };
            }
        },
    };
</script>