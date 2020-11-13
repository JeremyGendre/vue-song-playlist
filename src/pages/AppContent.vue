<template>
    <Loading v-if="fetchingUser"/>
    <v-container v-else class="my-auto z-50">
        <div class="d-flex h-full">
            <div class="ma-auto text-center">
                <router-view></router-view>
            </div>
        </div>
    </v-container>
</template>

<script>
    import Loading from "./loading/Loading";
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import "firebase/auth";
    import {updateBackground} from "../helpers/functions";
    import {DefaultBackground} from "../data/backgroundImage";

    export default {
        name: "AppContent",
        components: {Loading},
        data: () => ({
            fetchingUser: true
        }),
        methods: {
            setUpConnectedUser(){
                const self = this;
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        self.$store.commit('setUser', user);
                        updateBackground(DefaultBackground);
                    } else {
                        if(self.$router.currentRoute.path !== '/register'){
                            self.$router.push('/logout');
                        }
                    }
                    self.fetchingUser = false;
                });
            }
        },
        created() {
            this.setUpConnectedUser();
        },
    };
</script>
