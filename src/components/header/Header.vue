<template>
    <div id="header" class="sticky top-0 w-full d-flex justify-space-between px-4">
        <div class="my-auto">
            <v-btn
                    icon
                    color="white"
                    @click="displaySidebar"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
        <div class="my-auto">
            <v-btn
                    small
                    :loading="logingOut"
                    :disabled="logingOut"
                    color="primary"
                    class="ma-2 white--text rounded-full"
                    @click="logout"
            >
                Logout
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </div>
        <!--<HeaderLink text="Home" icon="home" href="/"/>
        <HeaderLink text="Playlist" icon="playlist-music" href="/playlist"/>-->
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data: () => ({
            logingOut: false
        }),
        methods: {
            logout(){
                this.logingOut = true;
                setTimeout(() => {
                    this.$router.push('/logout');
                    this.logingOut = false;
                }, 1000);
            },
            displaySidebar(){
                this.$store.commit('toggleSidebar');
            }
        }
    }
</script>

<style scoped>
    #header{
        z-index:100;
        font-size:1.2em;
        background-color: rgba(0,0,0,0.8);
        box-shadow: 0 0 10px #141414;
    }

    .header-link:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        transition: all 0.2s ease-in-out;
        transform: scale(0);
    }

    .header-link:hover:after{
        transform: scale(1);
    }
</style>