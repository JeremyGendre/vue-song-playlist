<template>
  <v-app>
    <!--<v-app-bar app color="transparent" class="fixed" elevation="10" dark></v-app-bar>-->
    <v-main class="d-flex h-full">
        <div class="d-flex h-full flex-col">
            <div id="background" class="w-full self-stretch h-full fixed"></div>
            <Header/>
            <AppContent/>
        </div>
    </v-main>
  </v-app>
</template>

<script>
import AppContent from './components/AppContent';
import Header from "./components/header/Header";
import './assets/css/App.css';
import './assets/css/Responsive.css';

// eslint-disable-next-line no-unused-vars
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config/firebase";
firebase.initializeApp(firebaseConfig);

export default {
  name: 'App',
  components: {
    Header,
    AppContent,
  },
};
</script>
