<template>
    <v-data-table
            :headers="tableHeader"
            :items="songs"
            :loading="loading || loadingPlaylists"
            :items-per-page="10"
            class="elevation-1 rounded"
            mobile-breakpoint="500"
    >
        <template v-slot:item="row">
            <tr class="text-left">
                <td>{{row.item.artist}}</td>
                <td>{{row.item.title}}</td>
                <td>
                    <v-btn
                            icon
                            color="white"
                            @click="onActionClick(row.item)"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import {handleQuerySnapshot} from "../../helpers/functions";

    const database = firebase.firestore();

    export default {
        name: 'SongList',
        props: {
            songs: Array,
            loading: Boolean
        },
        data: () => ({
            tableHeader: [
                { text: 'Artist', value: 'artist' },
                { text: 'Title', value: 'title' },
                {
                    text: '',
                    sortable: false,
                    value: 'actions',
                },
            ],
            loadingPlaylists: true,
            playlists : []
        }),
        created(){
            const self = this;
            database
                .collection('Playlist')
                .where('userId', '==', firebase.auth().currentUser.uid)
                .get()
                .then(querySnapshot => {
                    self.playlists = handleQuerySnapshot(querySnapshot);
                })
                .catch(console.error)
                .finally(() => { this.loadingPlaylists = false; });
        },
        methods: {
            onActionClick(song) {
                console.log(song);
            }
        }
    };
</script>