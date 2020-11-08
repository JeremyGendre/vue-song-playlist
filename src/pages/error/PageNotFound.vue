<template>
    <div class="ma-auto">
        <div class="font-bold text-4xl">404</div>
        <div>Page not found</div>
        <div class="mt-4">
            <v-btn
                    depressed
                    color="primary"
                    class="rounded"
                    @click="backHome"
            >
                Back home
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageNotFound',
        methods:{
            backHome(){
                this.$router.push('/');
            }
        }
    };
</script>