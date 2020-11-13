<template>
    <Loading v-if="loadingData" no-container/>
    <Songlist v-else-if="songs.length > 0" :songs="songs"/>
    <div v-else>No songs in this playlist</div>
</template>

<script>
    import Songlist from "../../components/playlist/SongList";
    import Loading from "../loading/Loading";
    export default {
        name: 'SongContainer',
        components: {Loading, Songlist},
        data: () => ({
            loadingData: true,
            songs: []
        })
    };
</script>