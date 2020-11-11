<template>
    <div id="header" class="sticky top-0 w-full d-flex justify-space-between px-4">
        <div class="my-auto">
            <v-btn
                    icon
                    color="white"
                    @click="goHome"
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
    import '../../assets/css/Header.css';
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
            goHome(){
                this.$router.push('/');
            }
        }
    }
</script>