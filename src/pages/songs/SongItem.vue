<template>
    <div>
        {{ song.artist }} - {{ song.title }}
    </div>
</template>

<script>
    export default {
        name: 'SongItem',
        props: {
            song: Object
        }
    };
</script>