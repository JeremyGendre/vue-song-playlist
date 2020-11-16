<template>
    <v-card
            class="mx-auto px-8 py-4 rounded"
            max-width="344"
            outlined
            elevation="20"
    >
        <v-form
                id="new-playlist-form"
                ref="newPlaylistForm"
                v-model="validForm"
                lazy-validation
                @submit.prevent="createPlaylist"
        >
            <div class="font-bold">New playlist !</div>
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>
            <ErrorAlert :error="error"/>
            <v-btn
                    :disabled="loading || !validForm"
                    :loading="loading"
                    color="primary"
                    class="mt-4 rounded my-auto"
                    type="submit"
                    form="new-playlist-form"
            >
                Create
            </v-btn>
            <v-btn
                    @click="closeCard"
                    :disabled="loading"
                    class="mt-4 rounded my-auto ml-2"
            >
                Cancel
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import ErrorAlert from "../../components/alerts/ErrorAlert";

    const database = firebase.firestore();

    export default {
        name: 'NewPlaylist',
        components: {ErrorAlert},
        props: {
            closeCard: Function,
            onCreation: Function
        },
        data : ()=>({
            loading: false,
            validForm: true,
            name: '',
            nameRules: [
                value => !!value || 'Name is required',
                value => value.length >= 1 || 'Min 1 characters',
            ],
            error: null,
            creationComplete: false
        }),
        methods: {
            createPlaylist(){
                if(this.$refs.newPlaylistForm.validate()){
                    this.loading = true;
                    const self = this;
                    const docData = {
                        name: this.name,
                        songs: [],
                        userId: firebase.auth().currentUser.uid
                    };
                    database.collection('Playlist')
                        .add(docData)
                        .then(docRef => {
                            self.closeCard();
                            self.onCreation({ id: docRef.id, ...docData});
                        })
                        .catch(error => {
                            self.error = error.message ? error.message : 'An error occurred during the playlist\'s creation';
                        })
                        .finally(() => {this.loading = false});
                }
            }
        }
    };
</script>