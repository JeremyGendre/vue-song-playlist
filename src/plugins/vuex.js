import Vue from "vue";
import Vuex from "vuex";
import {getStoredItem, storeItem} from "../helpers/storage";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: getStoredItem('user') ? JSON.parse(getStoredItem('user')) : null
    },
    mutations: {
        setUser (state, newUser) {
            state.user = newUser;
            storeItem('user', JSON.stringify(newUser));
        }
    }
});

export default store;
