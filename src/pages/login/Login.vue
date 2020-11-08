<template>
    <v-card
            class="mx-auto px-8 py-4"
            max-width="344"
            outlined
            elevation="20"
    >
        <v-form
                ref="loginForm"
                v-model="validForm"
                lazy-validation
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

            <v-btn
                    :disabled="loading || !validForm"
                    :loading="loading"
                    color="primary"
                    class="mt-4 rounded"
                    @click="login"
            >
                Validate
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
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
            showPassword: false
        }),
        methods:{
            login(){
                if(this.$refs.loginForm.validate()){
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.$router.push('/playlist');
                    }, 1000);
                }
            }
        }
    };
</script>