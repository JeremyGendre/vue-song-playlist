<template>
    <div>
        <v-btn
                class="rounded opacity-75 new-song-btn mb-2"
                @click="showSongForm"
        >
            New song
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <CreateSongForm v-if="showForm" :on-close="handleCloseForm" :on-complete="handleCompleteForm"/>
    </div>
</template>

<script>
    import CreateSongForm from "./CreateSongForm";
    export default {
        name: 'CreateSong',
        components: {CreateSongForm},
        props:{
            onNewSong: Function
        },
        data: () => ({
            showForm: false
        }),
        methods: {
            showSongForm(){
                if(!this.showForm){
                    this.showForm = true;
                }
            },
            handleCloseForm(){
                this.showForm = false;
            },
            handleCompleteForm(newSong){
                this.onNewSong(newSong);
                this.showForm = false;
            },
        }
    };
</script>

<style scoped>
    .new-song-btn:hover{
        opacity: 1;
    }
</style>