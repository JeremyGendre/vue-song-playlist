<template>
    <router-link to="/playlist/new" class="no-link ma-auto">
        <v-btn class="rounded opacity-75 new-playlist-btn">
            New playlist
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </router-link>
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