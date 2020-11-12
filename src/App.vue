<template>
  <v-app>
    <!--<v-app-bar app color="transparent" class="fixed" elevation="10" dark></v-app-bar>-->
    <v-main class="d-flex h-full">
        <div class="d-flex h-full flex-col">
            <div id="background" class="w-full self-stretch h-full fixed z-0"></div>
            <Header v-if="this.$store.state.user !== null"/>
            <Sidebar/>
            <AppContent/>
        </div>
    </v-main>
  </v-app>
</template>

<script>
import AppContent from './pages/AppContent';
import './assets/css/App.css';
import './assets/css/Responsive.css';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config/firebase";
import Header from "./components/header/Header";
import {updateBackground} from "./helpers/functions";
import Sidebar from "./components/sidebar/Sidebar";
firebase.initializeApp(firebaseConfig);

export default {
    name: 'App',
    components: {
        Sidebar,
        Header,
        AppContent,
    },
    created() {
        updateBackground(null);
        const self = this;
        firebase.auth().onAuthStateChanged(user => {
            if(!user){
                self.$store.commit('logout');
            }else{
                self.$store.commit('setUser', user);
            }
        })
    }
};
</script>
