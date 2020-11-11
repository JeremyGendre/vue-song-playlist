<template>
    <v-btn class="rounded ma-auto opacity-75 new-playlist-btn">
        New playlist
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: 'CreatePlaylistCard'
    };
</script>

<style scoped>
    .new-playlist-btn:hover{
        opacity: 1;
    }
</style>