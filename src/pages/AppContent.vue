<template>
    <Loading v-if="fetchingUser"/>
    <v-container v-else class="my-auto">
      <div class="d-flex h-full">
        <div class="ma-auto text-center">
          <Login v-if="this.$store.state.user === null"/>
          <div v-else>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </v-container>
</template>

<script>
  import Login from "./login/Login";
  import Loading from "./loading/Loading";
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import "firebase/auth";

  export default {
    name: "AppContent",
    components: {Loading, Login},
    data: () => ({
      fetchingUser: true
    }),
    created() {
      const self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.$store.commit('setUser', user);
        } else {
          self.$store.commit('logout');
        }
        self.fetchingUser = false;
      });
    }
  };
</script>
