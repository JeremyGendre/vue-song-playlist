<template>
    <div>
        <div v-if="this.$store.state.user !== null">Mes playlists</div>
        <Login v-else/>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";
    import Login from "../../pages/login/Login";

    export default {
        name: 'Home',
        components: {Login},
        created(){
            updateBackground(null);
        }
    };
</script>