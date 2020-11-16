<template>
    <NewPlaylist v-if="creating" :on-cancel="() => {this.creating = false}"/>
    <v-btn v-else @click="creating = true" class="rounded opacity-75 new-playlist-btn">
        New playlist
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script>
    import NewPlaylist from "../newPlaylist/NewPlaylist";
    export default {
        name: 'CreatePlaylistCard',
        components: {NewPlaylist},
        data: () => ({
            creating: false
        })
    };
</script>

<style scoped>
    .new-playlist-btn:hover{
        opacity: 1;
    }
</style>