<template>
    <div>
        <button @click="goToPlaylist">Mes playlists</button>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";

    export default {
        name: 'Home',
        beforeCreate(){
            if(this.$store.state.user === null){
                this.$router.push('/login');
            }
        },
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