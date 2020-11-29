import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import store from "./plugins/vuex";

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('serviceWorker.js')
      .then(() => {
        console.log('Registration OK');
      })
      .catch(error => {
        console.error('Erreur: ', error);
      });
}

Vue.use(PerfectScrollbar);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
