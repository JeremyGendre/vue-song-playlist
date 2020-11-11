<template>
    <v-card
            elevation="6"
            :class="('ma-2 rounded ' + (deleting ? 'opacity-50' : '') )"
    >
        <v-card-title>
            {{ playlist.name }}
        </v-card-title>
        <v-card-subtitle class="text-left">{{ playlist.songs.length }} songs</v-card-subtitle>
        <v-card-actions>
            <router-link :to="pathToPlaylist" class="no-link">
                <v-btn
                        class="rounded"
                        color="blue lighten-3"
                        text
                        :disabled="deleting"
                >
                    listen
                    <v-icon right dark>mdi-play-circle</v-icon>
                </v-btn>
            </router-link>
            <v-btn
                    icon
                    color="red"
                    :disabled="deleting"
                    :loading="deleting"
                    @click="deletePlaylist"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    const database = firebase.firestore();

    export default {
        name: 'HomePlaylistItem',
        props: {
            playlist: Object,
            onDelete: Function
        },
        data: () => ({
            deleting: false
        }),
        computed: {
            pathToPlaylist(){
                return `/playlist/${this.playlist.id}`;
            },
        },
        methods: {
            deletePlaylist(){
                const self = this;
                this.deleting = true;
                setTimeout(() => {
                    database.collection('Playlist')
                        .doc(this.playlist.id)
                        .delete()
                        .then(() => {
                            self.onDelete(self.playlist.id);
                        })
                        .catch(console.error)
                        .finally(() => {self.deleting = false})
                }, 1000);
            }
        }
    };
</script>