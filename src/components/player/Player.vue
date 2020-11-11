<template>
    <div>
        <v-card id="player-card" ref="playerCard" class="mx-auto" max-width="344" elevation="20">
            <v-img v-if="audioImage === null" src="/images/default_song.png" height="200px"></v-img>
            <v-img v-else :src="audioImage" height="200px"></v-img><!-- https://cdn.vuetifyjs.com/images/cards/sunshine.jpg -->

            <v-card-text class="card-text">

                <!-- TIMER -->
                <div class="mt-2 mb-1">
                    <v-slider
                            hide-details
                            v-model="audioTimer"
                            min="0" :max="audioDuration"
                            color="primary"
                            :label="readableDuration"
                    ></v-slider>
                </div>

                <!-- SONG INFORMATIONS -->
                <div class="flex w-full">
                    <div class="text-center my-auto">
                        <div class="font-bold text-xl">{{ song.artist }}</div>
                        <div class="text-lg mt-1">{{ song.title }}</div>
                    </div>
                </div>

                <!-- ACTIONS -->
                <div class="d-flex justify-center mt-4">
                    <v-btn class="mx-2 my-auto" fab dark x-small :color="(audioLoop ? 'primary' : '' )" @click="toggleRepeat">
                        <v-icon dark>
                            mdi-repeat
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2 my-auto" fab dark x-small :disabled="!isPrevPossible || randomPlaylist" @click="previous">
                        <v-icon dark>
                            mdi-skip-previous
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2 my-auto" fab dark color="primary" @click="toggle">
                        <v-icon dark>
                            {{ playing ? 'mdi-pause' : 'mdi-play' }}
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2 my-auto" fab dark x-small :disabled="!isNextPossible && !randomPlaylist" @click="next">
                        <v-icon dark>
                            mdi-skip-next
                        </v-icon>
                    </v-btn>
                    <v-btn class="mx-2 my-auto" fab dark x-small :disabled="audioLoop" :color="(randomPlaylist ? 'primary' : '' )" @click="toggleRandom">
                        <v-icon dark>
                            mdi-shuffle-variant
                        </v-icon>
                    </v-btn>
                </div>

                <!-- VOLUME -->
                <div class="text-center w-full flex">
                    <v-slider
                            hide-details
                            v-model="audioVolume"
                            color="secondary"
                            min="0" max="1" step="0.01"
                            class="volume-slider mx-auto"
                            prepend-icon="mdi-volume-high"
                    ></v-slider>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import '../../assets/css/Player.css';
    import {getStoredItem, storeItem} from "../../helpers/storage";
    import {updateBackground} from "../../helpers/functions";
    import fetchRandomImage from "../../data/backgroundImage";
    import firebase from 'firebase/app';
    import 'firebase/storage';

    const storage = firebase.storage();

    export default {
        name: 'Player',
        props: {
            song: Object,
            isNextPossible: Boolean,
            isPrevPossible: Boolean,
            randomPlaylist: Boolean
        },
        data : () => ({
            playing: false,
            audioSong : null,
            audioDuration: 0,
            audioTimer: 0,
            audioLoop: false,
            audioVolume : getStoredItem('volume') ?? 1,
            audioImage: null,
            loadingImage: true
        }),
        created(){
            this.fetchSong(this.song.path);
        },
        methods: {
            play(){
                this.playing = true;
            },
            pause(){
                this.playing = false;
            },
            toggle(){
                if(this.playing){
                    this.pause();
                }else{
                    this.play();
                }
            },
            next(){
                this.audioSong.pause();
                this.$emit('next');
            },
            previous(){
                this.audioSong.pause();
                this.$emit('previous');
            },
            getDuration(){
                const self = this;
                this.audioSong.addEventListener("loadedmetadata", function(e){
                    self.audioDuration = Math.ceil(e.currentTarget.duration);
                });
            },
            updateTimer(){
                const self = this;
                this.audioSong.addEventListener("timeupdate", function() {
                    self.audioTimer = Math.ceil(self.audioSong.currentTime);
                }, false);
            },
            handleEnd(){
                const self = this;
                this.audioSong.addEventListener("ended", function() {
                    self.next();
                }, false);
            },
            async getImage(){
                this.audioImage = await fetchRandomImage();
            },
            setUpSong(){
                //TODO : do this stuff before (when the song is given to this component, to not have to do all of this setup methods)
                this.getDuration();
                this.updateTimer();
                this.getImage();
                this.handleEnd();
                this.setUpVolume();
            },
            fetchSong(path){
                const audioPathRef = storage.refFromURL(path);
                const self = this;
                audioPathRef.getDownloadURL().then(function(url) {
                    self.audioSong = new Audio(url);
                    self.setUpSong();
                    if(self.playing){
                        self.audioSong.play();
                    }
                    self.audioTimer = 0;
                }).catch(console.error);
            },
            setUpVolume(){
                this.audioSong.volume = getStoredItem('volume') ?? 1;
            },
            toggleRepeat(){
                this.audioLoop = !this.audioLoop;
                this.$emit('toggleLoop', this.audioLoop);
            },
            toggleRandom(){
                this.$emit('toggleRandom');
            }
        },
        computed: {
            readableDuration(){
                const time = this.audioDuration - this.audioTimer;
                const minutes = Math.floor( time / 60);
                const seconds = time - (minutes * 60);
                return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
            }
        },
        watch:{
            song(newVal){
                this.audioSong.pause();
                this.fetchSong(newVal.path);
            },
            playing(isPlaying){
                if(isPlaying){
                    this.audioSong.play();
                }else{
                    this.audioSong.pause();
                }
            },
            audioTimer(newTime, oldTime){
                if(Math.abs(newTime - oldTime) > 1){
                    this.audioSong.currentTime = newTime;
                }
            },
            audioImage(newImageUrl){
                updateBackground(newImageUrl);
            },
            audioVolume(newVolume){
                storeItem('volume', newVolume);
                if(this.audioSong){
                    this.audioSong.volume = newVolume;
                }
            },
            audioLoop(newLoopValue){
                this.audioSong.loop = newLoopValue;
            }
        },
        updated() {
            const style = {
                height: this.$refs.playerCard.$el.offsetHeight,
                width: this.$refs.playerCard.$el.offsetWidth,
            };
            this.$emit('updateStyle', style);
        },
        beforeDestroy() {
            this.audioSong.pause();
        }
    }
</script>