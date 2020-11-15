<template>
    <v-alert
            dense
            outlined
            type="error"
            class="rounded mt-2 break-all"
            v-if="error"
    >
        {{ error !== '' ? error : 'An error occured, maybe try again after refreshing the page.' }}
    </v-alert>
</template>

<script>
    export default {
        name: 'ErrorAlert',
        props: {
            error: {
                type: String,
                required: false
            },
        }
    };
</script>