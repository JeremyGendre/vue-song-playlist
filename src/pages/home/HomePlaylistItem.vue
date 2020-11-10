<template>
    <v-card
            elevation="6"
            class="ma-2 rounded"
    >
        <v-card-title>
            {{ playlist.name }}
        </v-card-title>
        <v-card-subtitle class="text-left">X songs</v-card-subtitle>
        <v-card-actions>
            <router-link :to="pathToPlaylist" class="no-link">
                <v-btn class="rounded" color="blue lighten-3" text>
                    listen
                    <v-icon right dark>mdi-play-circle</v-icon>
                </v-btn>
            </router-link>
            <v-btn
                    icon
                    color="red"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'HomePlaylistItem',
        props: {
            playlist: Object
        },
        computed: {
            pathToPlaylist(){
                return `/playlist/${this.playlist.id}`;
            }
        }
    };
</script>