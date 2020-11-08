<template>
    <div>
        <div>Mes playlists</div>
    </div>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";

    export default {
        name: 'Home',
        created(){
            updateBackground(null);
        }
    };
</script>