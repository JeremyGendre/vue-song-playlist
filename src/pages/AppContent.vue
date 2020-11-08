<template>
  <v-container class="my-auto">
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
  export default {
    name: "AppContent",
    components: {Login},
  };
</script>
