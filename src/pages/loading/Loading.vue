<template>
    <div v-if="hideContainer" class="loader ma-auto"></div>
    <div v-else class="fixed top-0 left-0 d-flex ma-auto w-screen h-screen">
        <div class="loader ma-auto"></div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            noContainer: Boolean,
            size: Number,
            color: String
        },
        computed: {
            hideContainer() {
                return this.noContainer ?? false;
            },
            style() {
                return {
                    padding: `${this.size}px`,
                    color: this.color
                };
            }
        }
    };
</script>

<style scoped>
    .loader{
        width: 0;
        padding : 2.5em;
        border-width: 4px;
        border-color: transparent white;
        border-style: solid;
        border-radius: 50%;
        animation: spin linear infinite 1s;
    }

    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>