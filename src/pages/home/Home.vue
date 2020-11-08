<template>
    <div>
        <button @click="goToPlaylist">Mes playlists</button>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";

    export default {
        name: 'Home',
        created(){
            updateBackground(null);
        },
        methods: {
            goToPlaylist(){
                this.$router.push('/playlist')
            }
        }
    };
</script>