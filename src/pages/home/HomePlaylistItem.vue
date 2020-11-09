<template>
    <div>
        <div>ID : {{ playlist.id }}</div>
        <div>User : {{ playlist.userId }}</div>
        <div>Name : {{ playlist.name }}</div>
    </div>
</template>

<script>
    export default {
        name: 'HomePlaylistItem',
        props: {
            playlist: Object
        }
    };
</script>