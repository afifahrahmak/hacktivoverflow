<template>
  <div>
    <q-header bordered class="bg-white text-grey" style="border-top: 2.5px solid orange;">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title @click.prevent="redirectToHome">
          <img src="../assets/logo.png" style="width:20px;" />
          <a href class="logo">
            stuck
            <strong style="font-weight: 900; ">overflow</strong>
          </a>
        </q-toolbar-title>
        <q-space />
        <q-input
          borderless
          style="width: 300px; max-width: 50%; height: 20px; padding:0 2vh;"
          v-model="text"
          input-class="text-right"
        >
          <template v-slot:append>
            <q-icon v-if="text === '' " name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click.prevent="eraseSearch" />
          </template>
        </q-input>

        <q-btn
          no-caps
          unelevated
          name="post"
          v-if="isLogin"
          label="ask question"
          @click="toQuestionForm"
          class
        />

        <q-btn v-if="isLogin" @click.prevent="logout" flat round dense icon="logout" />
        <q-btn v-if="!isLogin" no-caps flat color="primary" size="13px" label="Log in" to="/login" />
        <q-btn
          v-if="!isLogin"
          no-caps
          unelevated
          color="primary"
          size="13px"
          label="Sign up"
          to="/register"
        />
      </q-toolbar>
      <q-dialog
        position="top"
        v-model="notification"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card class="bg-orange-14 text-white">
          <q-card-section>
            <div class="text-h6 text-center">{{ message.status }}</div>
          </q-card-section>

          <q-card-section>{{ message.content }}</q-card-section>
        </q-card>
      </q-dialog>
    </q-header>
  </div>
</template>

<style>
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      text: "",
      visible: false,
      message: {
        status: "",
        content: ""
      },
      notification: false
    };
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      // if (this.$route.path !== "/") {
      this.$store.dispatch("auth");
      this.$router.push("/welcome");
      // }
    },
    redirectToHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    eraseSearch() {
      this.text = "";
    },
    toQuestionForm() {
      this.$router.push("/questionForm");
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  watch: {
    text: function() {
      console.log("trigger ", this.text);
      this.$store.commit("SEARCHTRIGGER", this.text);
    }
    // islogin() {}
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic|Work+Sans&display=swap");
.logo {
  font-size: 16px;
  color: black;
  text-decoration: none;
  font-family: "Nanum Gothic", sans-serif;
}
</style>