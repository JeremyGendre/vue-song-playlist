<template>
    <v-card
            class="mx-auto px-8 py-4 rounded"
            max-width="344"
            outlined
            elevation="20"
    >
        <v-form
                id="login-form"
                ref="loginForm"
                v-model="validForm"
                lazy-validation
                @submit.prevent="login"
        >
            <div class="font-bold">Log in !</div>
            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    name="login-password"
                    label="Password"
                    required
                    @click:append="showPassword = !showPassword"
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
                    form="login-form"
            >
                Log in
            </v-btn>
            <div class="d-flex justify-center mt-3 text-sm">
                <div class="mr-2">no account ?</div>
                <router-link to="/register">sign up</router-link>
            </div>
        </v-form>
    </v-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import {updateBackground} from "../../helpers/functions";

    export default {
        name: 'Login',
        data : ()=>({
            loading: false,
            validForm: true,
            email: '',
            emailRules: [
                value => !!value || 'E-mail is required',
                value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                value => !!value || 'Password is required',
                value => value.length >= 6 || 'Min 6 characters',
            ],
            showPassword: false,
            error: null
        }),
        created(){
            if(this.$store.state.user !== null){
                this.$router.push('/');
                return;
            }
            updateBackground(null);
        },
        methods:{
            login(){
                this.error = null;
                if(this.$refs.loginForm.validate()){
                    this.loading = true;
                    firebase.auth().signInWithEmailAndPassword(
                        this.email,
                        this.password
                    ).then(() => {
                        this.$store.commit('setUser', firebase.auth().currentUser);
                        this.$router.push('/');
                    }).catch(error => { this.error = error.message }).finally(() => {
                        this.loading = false;
                    });
                }
            }
        }
    };
</script>