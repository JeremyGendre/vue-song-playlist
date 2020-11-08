<template>
    <Loading/>
</template>

<script>
    import Loading from "../loading/Loading";
    export default {
        name: 'Register',
        components: {Loading},
        created() {
            this.$store.commit('logout');
            this.$router.push('/login');
        }
    };
</script>