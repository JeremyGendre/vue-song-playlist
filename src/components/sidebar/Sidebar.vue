<template>
    <v-navigation-drawer
            v-model="sidebarActive"
            absolute
            temporary
    >
        <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/22.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list dense>
            <v-list-item
                    v-for="item in navigationItems"
                    :key="item.title"
                    link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Sidebar',
        data: () => ({
            navigationItems: []
        }),
        computed :{
            userName(){
                return this.$store.state.user ? this.$store.state.user.displayName : '';
            },
            sidebarActive(){
                return this.$store.state.sidebarActive;
            }
        }
    };
</script>