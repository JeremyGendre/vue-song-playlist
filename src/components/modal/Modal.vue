<template>
    <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
    >
        <template v-slot:activator="{ on, attrs }">
            <slot name="trigger"
                  v-bind="attrs"
                  v-on="on"
            ></slot>
        </template>
        <v-card>
            <v-card-title class="headline" v-if="title">{{ title }}</v-card-title>
            <v-card-text>
                <slot name="content">
                    {{ text ? text : '' }}
                </slot>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="onConfirm"
                >
                    {{ confirmBtnText ? confirmBtnText : 'Confirm' }}
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        @click="onCancel"
                >
                    {{ cancelBtnText ? cancelBtnText : 'Cancel' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            opened: Boolean,
            title: String,
            text: String,
            confirmBtnText: String,
            cancelBtnText: String,
            onConfirm: Function,
            onCancel: Function,
        },
        data: () => ({
            dialog: false
        })
    };
</script>