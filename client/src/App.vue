<template>
  <q-layout view="hHh lpR fFf">
    <Navbar></Navbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch("auth");
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  watched: {
    isLogin() {}
  }
};
</script>
