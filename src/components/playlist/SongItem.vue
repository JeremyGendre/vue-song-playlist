<template>
    <v-list-item two-line>
        <v-list-item-content>
            <v-list-item-title v-text="song.title"/>
            <v-list-item-subtitle v-text="song.artist"/>
        </v-list-item-content>
        <v-list-item-action>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            v-bind="attrs"
                            v-on="on"
                            v-if="!active"
                            icon
                            @click="toggleSetNext"
                            small
                    >
                        <v-icon v-if="isNext" color="grey lighten-1">mdi-skip-next-circle</v-icon>
                        <v-icon v-else color="grey lighten-1">mdi-skip-next-outline</v-icon>
                    </v-btn>
                </template>
                <span>{{ isNext ? 'Remove next' : 'Set to next' }}</span>
            </v-tooltip>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    export default {
        name: 'SongItem',
        props: {
            index: Number,
            song: Object,
            active: Boolean,
            isNext: Boolean
        },
        methods: {
            toggleSetNext(e){
                e.preventDefault();
                e.stopPropagation();
                this.$emit('toggleSetNext', this.index);
            }
        }
    };
</script>