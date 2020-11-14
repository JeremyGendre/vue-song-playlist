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
            handleCompleteForm(){
                //add data ...

                this.showForm = false;
            },
        }
    };
</script>