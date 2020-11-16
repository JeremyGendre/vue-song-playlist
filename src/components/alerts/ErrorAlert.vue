<template>
    <v-alert
            dense
            outlined
            type="error"
            class="rounded mt-2 break-all"
            v-if="error"
    >
        <v-row align="center">
            <v-col class="grow">
                {{ error !== '' ? error : 'An error occured, maybe try again after refreshing the page.' }}
            </v-col>
        </v-row>
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