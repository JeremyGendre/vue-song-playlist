<template>
    <div class="ma-auto">
        <div class="font-bold text-4xl">403</div>
        <div>You are not authorized to go to this page</div>
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
        name: 'PageNotAuthorized',
        methods:{
            backHome(){
                this.$router.push('/');
            }
        }
    }
</script>