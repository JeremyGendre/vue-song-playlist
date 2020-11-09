<template>
    <v-card
            class="mx-auto px-8 py-4 rounded"
            max-width="344"
            outlined
            elevation="20"
    >
        <v-form
                id="register-form"
                ref="registerForm"
                v-model="validForm"
                v-if="!complete"
                lazy-validation
                @submit.prevent="signup"
        >
            <div class="font-bold">Sign up !</div>
            <v-text-field
                    v-model="lastName"
                    :rules="nameRules"
                    label="Last name"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="firstName"
                    :rules="nameRules"
                    label="First name"
                    required
            ></v-text-field>
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
                    form="register-form"
            >
                Sign up
            </v-btn>
            <div class="d-flex justify-center mt-3 text-sm">
                <div class="mr-2">already registered ?</div>
                <router-link to="/login">log in</router-link>
            </div>
        </v-form>
        <ConfirmRegistration v-else/>
    </v-card>
</template>

<script>
    import {updateBackground} from "../../helpers/functions";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import ConfirmRegistration from "./ConfirmRegistration";

    const database = firebase.firestore();

    export default {
        name: 'Register',
        components: {ConfirmRegistration},
        beforeCreate() {
            if(this.$store.state.user !== null){
                this.$router.push('/');
            }
        },
        data : ()=>({
            loading: false,
            validForm: true,
            lastName: '',
            firstName: '',
            nameRules: [
                value => value.length > 2 || 'Lastnames and firstnames must have at least 2 characters'
            ],
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
            error: null,
            complete: false
        }),
        created(){
            if(this.$store.state.user !== null){
                this.$router.push('/');
                return;
            }
            updateBackground(null);
        },
        methods:{
            signup(){
                this.error = null;
                if(this.$refs.registerForm.validate()){
                    this.loading = true;
                    firebase.auth().createUserWithEmailAndPassword(
                        this.email,
                        this.password
                    ).then(() => {
                        this.createUser();
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            },
            createUser(){
                firebase
                    .auth()
                    .currentUser.updateProfile({
                        displayName:
                            this.firstName.charAt(0).toUpperCase() +
                            this.firstName.slice(1) +
                            " " +
                            this.lastName.toUpperCase(),
                    }).then(() => {
                        this.$store.commit('setUser', firebase.auth().currentUser);
                        this.createUserDocument();
                    }).catch((error) => {
                        this.error = error.message;
                        console.error(error);
                    });
            },
            createUserDocument(){
                const self = this;
                database
                    .collection("User")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        email: this.email,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        is_deleted: false,
                    }).then(function () {
                        self.complete = true;
                    }).catch(function (error) {
                        console.error("Error writing document: ", error);
                        self.error = error.message;
                    }).finally(() => {
                        self.loading = false;
                    });
            }
        }
    };
</script>