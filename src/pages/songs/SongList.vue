<template>
    <div>
        <div v-for="song in songs" :key="song.id">{{ song.artist }} - {{ song.title }}</div>
    </div>
</template>

<script>
    export default {
        name: 'SongList',
        props: {
            songs: Array
        }
    };
</script>