<template>
    <div>register</div>
</template>

<script>
    export default {
        name: 'Register',
        created() {
            if(this.$store.state.user !== null){
                this.$router.push('/');
            }
        }
    };
</script>