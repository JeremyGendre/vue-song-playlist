<template>
    <v-card class="mb-4 pa-4 rounded" elevation="10">
        <v-form
                id="new-song-form"
                ref="newSongForm"
                v-model="validForm"
                class="d-flex flex-col flex-wrap"
                lazy-validation
                @submit.prevent="createSong"
        >
            <div class="d-flex">
                <v-text-field
                        v-model="artist"
                        class="mx-1"
                        :rules="textRules"
                        label="Artist"
                        required
                ></v-text-field>
                <v-text-field
                        class="mx-1"
                        v-model="title"
                        :rules="textRules"
                        label="Title"
                        required
                ></v-text-field>
            </div>
            <div>
                <v-file-input
                        counter
                        accept="audio/*"
                        label="Your song"
                        required
                        v-model="file"
                        :rules="fileRules"
                ></v-file-input>
            </div>
            <v-alert
                    dense
                    outlined
                    type="error"
                    class="rounded mt-2"
                    v-if="error"
            >
                {{ error !== '' ? error : 'An error occured, maybe try again after refreshing the page.' }}
            </v-alert>
            <v-progress-linear
                    v-if="loading"
                    indeterminate
                    color="orange darken-2"
                    class="my-2"
            ></v-progress-linear>
            <div class="mt-2">
                <v-btn
                        :disabled="loading || !validForm"
                        :loading="loading"
                        color="primary"
                        class="mx-1 rounded my-auto"
                        type="submit"
                        form="new-song-form"
                >
                    Add
                </v-btn>
                <v-btn
                        :disabled="loading"
                        class="mx-1 rounded my-auto"
                        @click="onClose"
                >
                    Cancel
                </v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/storage';

    const storageRef = firebase.storage().ref();
    const database = firebase.firestore();

    export default {
        name: 'CreateSongForm',
        props: {
            onClose: Function,
            onComplete: Function
        },
        data: () => ({
            loading: false,
            validForm: true,
            title: '',
            artist: '',
            textRules: [
                value => !!value || 'This field is required',
                value => value.length >= 1 || 'Min 1 characters',
            ],
            file: undefined,
            fileRules: [
                value => !value || value.size < 100000000 || 'Avatar size should be less than 100 MB!',
            ],
            error: null
        }),
        methods: {
            createSong(){
                if(this.validateForm()){
                    this.loading = true;
                    const self = this;
                    const fileName = new Date() + '-' + this.file.name;
                    const metaData = {
                        contentType: this.file.type
                    };
                    //upload
                    storageRef
                        .child(fileName)
                        .put(this.file, metaData)
                        .then(snapshot => {
                            //get URL
                            snapshot.ref
                                .getDownloadURL()
                                .then(url => {
                                    const newSongObj = {
                                        title: self.title,
                                        artist: self.artist,
                                        userId: firebase.auth().currentUser.uid,
                                        path: url
                                    };
                                    //insert in collection Song the new object
                                    database
                                        .collection('Song')
                                        .add(newSongObj)
                                        .then((docRef) => {
                                            self.onComplete({ ...newSongObj, id: docRef.id });
                                        })
                                        .catch(self.handleError)
                                        .finally(() => { this.loading = false });
                                })
                                .catch(self.handleError);
                        })
                        .catch(self.handleError);
                }
            },
            validateForm(){
                this.error= null;
                if(this.$refs.newSongForm.validate()){
                    if(this.file){
                        return true;
                    }else{
                        this.error = 'You must select a file to upload !';
                    }
                }
                return false;
            },
            handleError(error){
                this.loading = false;
                console.error(error);
            }
        }
    };
</script>