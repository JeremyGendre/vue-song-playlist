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
            <v-btn class="rounded" text>
                listen
                <v-icon right dark>mdi-play-circle</v-icon>
            </v-btn>
            <v-btn
                    icon
                    color="deep-orange"
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
        }
    };
</script>