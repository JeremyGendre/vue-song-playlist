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
                    v-if="!creationComplete"
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>
            <v-alert
                    dense
                    outlined
                    type="error"
                    class="rounded"
                    v-if="error"
            >
                {{ error !== '' ? error : 'An error occured, maybe try again after refreshing the page.' }}
            </v-alert>
            <v-alert
                    v-if="creationComplete"
                    dense
                    class="mt-4"
                    text
                    type="success"
            >
                Playlist successfully created, redirecting ...
                <v-progress-linear
                        indeterminate
                        color="orange darken-2"
                        class="mt-3"
                ></v-progress-linear>
            </v-alert>
            <v-btn
                    :disabled="loading || !validForm || creationComplete"
                    :loading="loading"
                    color="primary"
                    class="mt-4 rounded my-auto"
                    type="submit"
                    form="new-playlist-form"
            >
                Create
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    const database = firebase.firestore();

    export default {
        name: 'NewPlaylist',
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
                        .then(() => {
                            self.name = '';
                            self.creationComplete = true;
                            setTimeout(() => {
                                self.$router.push('/');
                            }, 2000);
                        })
                        .catch(console.error)
                        .finally(() => {this.loading = false});
                }
            }
        }
    };
</script>