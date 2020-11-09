<template>
    <div>
        <v-alert
                dense
                text
                type="success"
        >
            Account successfully created
        </v-alert>
        <v-btn
                :disabled="loading"
                :loading="loading"
                color="primary"
                class="mt-4 rounded my-auto"
                @click="start"
        >
            Let's begin !
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'ConfirmRegistration',
        data: () => ({
            loading: false
        }),
        methods: {
            start(){
                this.loading = true;
                setTimeout(() => {
                    this.$router.push('/');
                }, 1000)
            }
        }
    };
</script>