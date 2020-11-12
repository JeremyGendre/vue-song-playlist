import Vue from "vue";
import Vuex from "vuex";
import {removeStoredItem, storeItem} from "../helpers/storage";
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        sidebarActive: false
    },
    mutations: {
        setUser (state, newUser) {
            state.user = newUser;
            storeItem('user', JSON.stringify(newUser));
        },
        logout (state) {
            state.user = null;
            removeStoredItem('user');
            firebase.auth().signOut();
        },
        toggleSidebar (state) {
            state.sidebarActive = !state.sidebarActive;
        }
    }
});

export default store;
