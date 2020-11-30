import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import store from "./plugins/vuex";
import KnobControl from 'vue-knob-control';

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('serviceWorker.js')
      .catch(error => {
        console.error('An error occurred during service worker\'s registration : ', error);
      });
}

Vue.use(PerfectScrollbar);
Vue.use(KnobControl);

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
