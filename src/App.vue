<template>
  <div id="app-main">
    <Navbar :currentView="currentView" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      currentView: null,
    };
  },
  mounted() {
    this.currentView = this.$router.currentRoute.path.toString();
  },
  updated() {
    this.currentView = this.$router.currentRoute.path.toString();
  },
};
</script>

<style scoped></style>
