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
            <v-alert
                    dense
                    outlined
                    type="error"
                    class="rounded"
                    v-if="error"
            >
                {{ error !== '' ? error : 'An error occured, maybe try again after refreshing the page.' }}
            </v-alert>
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
        </v-form>
    </v-card>
</template>

<script>
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
            error: null
        }),
        methods: {
            createPlaylist(){
                console.log('create !');
                this.loading = true;
            }
        }
    };
</script>