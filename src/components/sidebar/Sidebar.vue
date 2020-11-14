<template>
    <v-navigation-drawer
            v-model="$store.state.sidebarActive"
            mobile-breakpoint="700"
            app
            class="app-sidebar"
    >
        <v-list-item>
            <v-list-item-avatar>
                <v-img :src="(`https://randomuser.me/api/portraits/men/22.jpg`)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="sidebar-profile-text">{{ userName }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="my-4"/>

        <v-list dense>
            <v-list-item
                    v-for="item in navigationItems"
                    :key="item.title"
                    class="mb-2"
                    link
                    :to="item.link"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="sidebar-link-text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Sidebar',
        data: () => ({
            navigationItems: [
                { icon: 'mdi-playlist-music', title: 'My playlists', link: '/' },
                { icon: 'mdi-file-music-outline', title: 'My songs', link: '/songs' },
                { icon: 'mdi-cog', title: 'Settings', link: '/settings' }
            ]
        }),
        computed :{
            userName(){
                return this.$store.state.user ? this.$store.state.user.displayName : '';
            },
        }
    };
</script>

<style scoped>
    .app-sidebar{
        z-index: 150;
    }
    .sidebar-profile-text{
        font-size:1.2em;
    }
    .sidebar-link-text{
        font-size: 1.05em !important;
    }
</style>